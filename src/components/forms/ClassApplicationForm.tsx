"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { PracticeNotice } from "@/components/PracticeNotice";
import { FormField } from "@/components/forms/FormField";
import { SubmitPanel } from "@/components/forms/SubmitPanel";
import { submitClassApplication } from "@/lib/mock-api";
import { REQUEST_MAX_LENGTH, toISODate, validateClassApplication } from "@/lib/validation";
import type {
  ClassApplication,
  CraftClass,
  FieldErrors,
  SubmitState,
} from "@/types";

export interface ClassApplicationFormProps {
  classes: readonly CraftClass[];
  initialClassId: string;
  onDone: () => void;
}

const FIELD_ORDER: readonly (keyof ClassApplication)[] = [
  "name",
  "contact",
  "classId",
  "desiredDate",
  "participants",
  "request",
];

const primaryButton =
  "min-h-12 w-full rounded-lg bg-celadon-deep px-5 text-base font-medium text-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-celadon-deep focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-60";
const secondaryButton =
  "min-h-12 w-full rounded-lg border border-line bg-surface px-5 text-base font-medium text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-celadon-deep focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-60";

export function ClassApplicationForm({
  classes,
  initialClassId,
  onDone,
}: ClassApplicationFormProps) {
  const uid = useId();
  const fieldId = (key: keyof ClassApplication) => `${uid}-${key}`;

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [classId, setClassId] = useState(initialClassId);
  const [desiredDate, setDesiredDate] = useState("");
  const [participants, setParticipants] = useState("1");
  const [request, setRequest] = useState("");
  const [errors, setErrors] = useState<FieldErrors<ClassApplication>>({});
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  const [minDate] = useState(() => toISODate(new Date()));
  const requestRef = useRef(0);

  useEffect(
    () => () => {
      requestRef.current += 1;
    },
    [],
  );

  const selected = classes.find((cls) => cls.id === classId);
  const loading = state.status === "loading";

  const submit = async () => {
    const participantsText = participants.trim();
    const input: ClassApplication = {
      name,
      contact,
      classId,
      desiredDate,
      participants: participantsText === "" ? Number.NaN : Number(participantsText),
      request,
    };

    const found = validateClassApplication(input, classes);
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((key) => found[key]);
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    requestRef.current += 1;
    const requestId = requestRef.current;
    setState({ status: "loading" });

    const result = await submitClassApplication(input);
    if (requestId !== requestRef.current) return;

    setState(
      result.success
        ? {
            status: "success",
            receiptNumber: result.receiptNumber,
            message: result.message,
          }
        : { status: "error", message: result.message },
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    void submit();
  };

  if (state.status === "success") {
    return <SubmitPanel state={state} onClose={onDone} />;
  }

  return (
    <div className="space-y-5">
      <PracticeNotice showErrorHint />

      <form onSubmit={handleSubmit} noValidate aria-busy={loading}>
        <fieldset disabled={loading} className="min-w-0 space-y-4 border-0 p-0">
          <legend className="sr-only">클래스 신청</legend>
          <FormField
            id={fieldId("name")}
            label="이름(별칭)"
            required
            value={name}
            onChange={setName}
            error={errors.name}
            maxLength={20}
            placeholder="예: 체험용 별칭"
          />
          <FormField
            id={fieldId("contact")}
            label="연락처"
            required
            value={contact}
            onChange={setContact}
            error={errors.contact}
            type="tel"
            inputMode="tel"
            placeholder="010-1234-5678"
          />
          <FormField
            id={fieldId("classId")}
            label="클래스"
            required
            value={classId}
            onChange={setClassId}
            error={errors.classId}
            options={classes.map((cls) => ({ value: cls.id, label: cls.name }))}
          />
          <FormField
            id={fieldId("desiredDate")}
            label="희망 날짜"
            required
            value={desiredDate}
            onChange={setDesiredDate}
            error={errors.desiredDate}
            type="date"
            min={minDate}
          />
          <FormField
            id={fieldId("participants")}
            label="인원"
            required
            hint={
              selected
                ? `최대 ${selected.maxParticipants}명까지 신청할 수 있어요.`
                : undefined
            }
            value={participants}
            onChange={setParticipants}
            error={errors.participants}
            inputMode="numeric"
          />
          <FormField
            id={fieldId("request")}
            label="요청사항"
            value={request}
            onChange={setRequest}
            error={errors.request}
            multiline
            rows={3}
            maxLength={REQUEST_MAX_LENGTH}
          />
        </fieldset>

        <div className="mt-5">
          <SubmitPanel state={state} onClose={onDone} />
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row-reverse">
          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className={primaryButton}
          >
            {loading ? "접수 중…" : "클래스 신청하기"}
          </button>
          <button
            type="button"
            onClick={onDone}
            disabled={loading}
            className={secondaryButton}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
