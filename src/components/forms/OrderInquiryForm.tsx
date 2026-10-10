"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { PracticeNotice } from "@/components/PracticeNotice";
import { FormField } from "@/components/forms/FormField";
import { SubmitPanel } from "@/components/forms/SubmitPanel";
import { formatPrice } from "@/lib/format";
import { submitOrderInquiry } from "@/lib/mock-api";
import {
  QUANTITY_MAX,
  QUANTITY_MIN,
  validateOrderInquiry,
} from "@/lib/validation";
import type { Craft, FieldErrors, OrderInquiry, SubmitState } from "@/types";

export interface OrderInquiryFormProps {
  crafts: readonly Craft[];
  initialCraftId: string;
  onDone: () => void;
}

const FIELD_ORDER: readonly (keyof OrderInquiry)[] = [
  "name",
  "contact",
  "craftId",
  "quantity",
  "request",
];

const primaryButton =
  "min-h-12 w-full rounded-lg bg-celadon-deep px-5 text-base font-medium text-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-celadon-deep focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-60";
const secondaryButton =
  "min-h-12 w-full rounded-lg border border-line bg-surface px-5 text-base font-medium text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-celadon-deep focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-60";

export function OrderInquiryForm({
  crafts,
  initialCraftId,
  onDone,
}: OrderInquiryFormProps) {
  const uid = useId();
  const fieldId = (key: keyof OrderInquiry) => `${uid}-${key}`;

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [craftId, setCraftId] = useState(initialCraftId);
  const [quantity, setQuantity] = useState("1");
  const [request, setRequest] = useState("");
  const [errors, setErrors] = useState<FieldErrors<OrderInquiry>>({});
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  const requestRef = useRef(0);

  useEffect(
    () => () => {
      requestRef.current += 1;
    },
    [],
  );

  const options = crafts.map((craft) => ({
    value: craft.id,
    label: `${craft.name} (${formatPrice(craft.price)})`,
  }));

  const submit = async () => {
    const quantityText = quantity.trim();
    const input: OrderInquiry = {
      name,
      contact,
      craftId,
      quantity: quantityText === "" ? Number.NaN : Number(quantityText),
      request,
    };

    const found = validateOrderInquiry(input, crafts);
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((key) => found[key]);
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    requestRef.current += 1;
    const requestId = requestRef.current;
    setState({ status: "loading" });

    const result = await submitOrderInquiry(input);
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
    if (state.status === "loading") return;
    void submit();
  };

  if (state.status === "success") {
    return <SubmitPanel state={state} onClose={onDone} />;
  }

  const loading = state.status === "loading";

  return (
    <div className="space-y-5">
      <PracticeNotice showErrorHint />

      <form onSubmit={handleSubmit} noValidate aria-busy={loading}>
        <fieldset disabled={loading} className="min-w-0 space-y-4 border-0 p-0">
          <legend className="sr-only">주문 문의</legend>
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
            id={fieldId("craftId")}
            label="상품"
            required
            value={craftId}
            onChange={setCraftId}
            error={errors.craftId}
            options={options}
          />
          <FormField
            id={fieldId("quantity")}
            label="수량"
            required
            hint={`${QUANTITY_MIN}개부터 ${QUANTITY_MAX}개까지 입력할 수 있어요.`}
            value={quantity}
            onChange={setQuantity}
            error={errors.quantity}
            inputMode="numeric"
          />
          <FormField
            id={fieldId("request")}
            label="요청사항"
            hint="300자 이내로 적어 주세요."
            value={request}
            onChange={setRequest}
            error={errors.request}
            multiline
            rows={4}
            maxLength={300}
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
            {loading ? "접수 중…" : "주문 문의 접수하기"}
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
