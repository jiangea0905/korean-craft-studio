"use client";

import type { SubmitState } from "@/types";

export interface SubmitPanelProps {
  state: SubmitState;
  onRetry?: () => void;
  onClose: () => void;
}

const buttonClass =
  "min-h-12 rounded-lg px-5 text-base font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-celadon-deep focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

export function SubmitPanel({ state, onRetry, onClose }: SubmitPanelProps) {
  if (state.status === "idle") return null;

  if (state.status === "loading") {
    return (
      <p aria-live="polite" className="text-sm text-muted">
        접수 중…
      </p>
    );
  }

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-lg border border-success bg-surface p-4 text-ink"
      >
        <p className="text-sm text-muted">접수번호</p>
        <p className="mt-0.5 text-lg font-semibold text-success">
          {state.receiptNumber}
        </p>
        <p className="mt-2 text-base">{state.message}</p>
        <button
          type="button"
          onClick={onClose}
          className={`${buttonClass} mt-4 w-full bg-celadon-deep text-surface`}
        >
          닫기
        </button>
      </div>
    );
  }

  return (
    <div
      role="alert"
      className="rounded-lg border border-danger bg-surface p-4 text-ink"
    >
      <p className="text-base font-medium text-danger">{state.message}</p>
      <p className="mt-1 text-sm text-muted">
        입력하신 내용은 그대로 남아 있어요. 다시 시도해 주세요.
      </p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className={`${buttonClass} mt-3 border border-line bg-surface text-ink`}
        >
          다시 시도
        </button>
      ) : null}
    </div>
  );
}
