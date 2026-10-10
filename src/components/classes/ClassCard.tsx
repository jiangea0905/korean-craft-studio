"use client";

import Image from "next/image";
import { formatDuration, formatPrice } from "@/lib/format";
import type { CraftClass } from "@/types";

export interface ClassCardProps {
  cls: CraftClass;
  onApply: (cls: CraftClass, trigger: HTMLElement) => void;
}

export function ClassCard({ cls, onApply }: ClassCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface">
      <Image
        src={cls.imageSrc}
        alt={cls.imageAlt}
        width={800}
        height={600}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="h-auto w-full"
      />
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-serif text-xl font-semibold text-ink">{cls.name}</h3>
        <p className="mt-2 text-base text-ink">{cls.description}</p>
        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
          <dt className="text-muted">가격(1인)</dt>
          <dd className="font-medium text-ink">{formatPrice(cls.price)}</dd>
          <dt className="text-muted">소요시간</dt>
          <dd className="font-medium text-ink">
            {formatDuration(cls.durationMinutes)}
          </dd>
          <dt className="text-muted">최대 인원</dt>
          <dd className="font-medium text-ink">{cls.maxParticipants}명</dd>
        </dl>
        <button
          type="button"
          onClick={(e) => onApply(cls, e.currentTarget)}
          className="mt-5 min-h-11 w-full rounded-lg bg-celadon-deep px-5 text-base font-medium text-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-celadon-deep focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          신청하기
        </button>
      </div>
    </article>
  );
}
