import Image from "next/image";
import { formatPrice } from "@/lib/format";
import type { Craft } from "@/types";

export interface CraftCardProps {
  craft: Craft;
  onInquire: (craft: Craft, trigger: HTMLElement) => void;
}

export function CraftCard({ craft, onInquire }: CraftCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface">
      <Image
        src={craft.imageSrc}
        alt={craft.imageAlt}
        width={800}
        height={600}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="h-auto w-full"
      />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <span className="inline-block rounded-full border border-line bg-paper px-2.5 py-0.5 text-xs font-medium text-celadon-deep">
            {craft.category}
          </span>
          <h3 className="mt-2 font-serif text-xl font-semibold text-ink">
            {craft.name}
          </h3>
        </div>
        <p className="flex-1 text-sm leading-relaxed text-muted">
          {craft.description}
        </p>
        <p className="text-lg font-semibold text-ink">
          {formatPrice(craft.price)}
        </p>
        <button
          type="button"
          onClick={(e) => onInquire(craft, e.currentTarget)}
          className="min-h-11 w-full rounded-lg bg-celadon-deep px-4 text-base font-medium text-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-celadon-deep focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          주문 문의하기
        </button>
      </div>
    </article>
  );
}
