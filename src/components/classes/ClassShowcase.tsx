"use client";

import { ClassCard } from "@/components/classes/ClassCard";
import type { CraftClass } from "@/types";

export interface ClassShowcaseProps {
  classes: readonly CraftClass[];
  onApply: (cls: CraftClass, trigger: HTMLElement) => void;
}

export function ClassShowcase({ classes, onApply }: ClassShowcaseProps) {
  return (
    <section aria-labelledby="class-showcase-title" className="space-y-6">
      <div>
        <h2
          id="class-showcase-title"
          className="font-serif text-2xl font-semibold text-ink"
        >
          공방 클래스
        </h2>
        <p className="mt-2 text-base text-muted">
          온결 공방의 클래스는 흙, 천, 나무를 직접 만지며 하나의 작품을 완성해
          보는 소규모 체험 수업이에요. 처음이어도 강사가 곁에서 차근차근 알려
          드려요.
        </p>
      </div>

      <aside
        aria-labelledby="class-guide-title"
        className="rounded-xl border border-line bg-surface p-4"
      >
        <div className="flex flex-wrap items-center gap-2">
          <h3
            id="class-guide-title"
            className="text-base font-semibold text-ink"
          >
            준비물·취소 안내
          </h3>
          <span className="rounded-full border border-line px-2.5 py-0.5 text-xs font-medium text-muted">
            실습용 가상 안내
          </span>
        </div>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink">
          <li>준비물: 앞치마와 편한 복장을 입고 오세요. 재료와 도구는 공방에서 준비해요.</li>
          <li>손톱이 길거나 반지를 낀 경우 작업 전에 미리 정리해 주세요.</li>
          <li>취소·변경: 수업 3일 전까지 무료, 이후에는 재료비가 청구돼요.</li>
          <li>당일 연락 없이 불참하면 일정 변경이 어려워요.</li>
        </ul>
        <p className="mt-3 text-xs text-muted">
          위 내용은 연습용으로 만든 가상의 안내이며 실제 규정이 아닙니다.
        </p>
      </aside>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((cls) => (
          <ClassCard key={cls.id} cls={cls} onApply={onApply} />
        ))}
      </div>
    </section>
  );
}
