"use client";

import type { ChangeEvent } from "react";

export interface FormFieldOption {
  value: string;
  label: string;
}

export interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  hint?: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
  type?: "text" | "tel" | "number" | "date";
  inputMode?: "text" | "tel" | "numeric";
  options?: readonly FormFieldOption[];
  autoComplete?: string;
  placeholder?: string;
  maxLength?: number;
  min?: string | number;
  max?: string | number;
}

const controlClass =
  "mt-1.5 block w-full min-h-12 rounded-lg border bg-surface px-3.5 py-2.5 text-base text-ink placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-celadon-deep focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-60";

export function FormField({
  id,
  label,
  value,
  onChange,
  required = false,
  hint,
  error,
  multiline = false,
  rows = 4,
  type = "text",
  inputMode,
  options,
  autoComplete = "off",
  placeholder,
  maxLength,
  min,
  max,
}: FormFieldProps) {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy =
    [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") ||
    undefined;
  const borderClass = error ? "border-danger" : "border-control-line";

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => onChange(e.target.value);

  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}{" "}
        {required ? (
          <span className="text-xs font-normal text-muted">(필수)</span>
        ) : (
          <span className="text-xs font-normal text-muted">(선택)</span>
        )}
      </label>
      {hint ? (
        <p id={hintId} className="mt-0.5 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {options ? (
        <select
          id={id}
          value={value}
          onChange={handleChange}
          aria-required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`${controlClass} ${borderClass}`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={handleChange}
          rows={rows}
          maxLength={maxLength}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`${controlClass} ${borderClass} resize-y`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={handleChange}
          inputMode={inputMode}
          maxLength={maxLength}
          min={min}
          max={max}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`${controlClass} ${borderClass}`}
        />
      )}
      {error ? (
        <p id={errorId} className="mt-1.5 text-sm font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
