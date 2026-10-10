import { CraftCard } from "@/components/crafts/CraftCard";
import type { Craft } from "@/types";

export interface CraftShowcaseProps {
  crafts: readonly Craft[];
  onInquire: (craft: Craft, trigger: HTMLElement) => void;
}

export function CraftShowcase({ crafts, onInquire }: CraftShowcaseProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2 className="font-serif text-2xl font-semibold text-ink">
          공예품 전시·주문
        </h2>
        <p className="leading-relaxed text-ink">
          온결 공방은 도자기, 나전칠기, 보자기, 목공예처럼 손으로 오래 만드는
          우리 공예를 천천히 소개하는 가상의 공방이에요. 아래 작품은 모두 실습을
          위해 꾸며 낸 예시입니다.
        </p>
      </div>

      <section
        aria-labelledby="craft-guide-title"
        className="rounded-xl border border-dashed border-line bg-surface p-5"
      >
        <div className="flex flex-wrap items-center gap-2">
          <h3
            id="craft-guide-title"
            className="font-serif text-lg font-semibold text-ink"
          >
            제작·배송 안내
          </h3>
          <span className="rounded-full bg-umber px-2.5 py-0.5 text-xs font-medium text-surface">
            실습용 가상 안내
          </span>
        </div>
        <dl className="mt-3 grid gap-3 text-sm leading-relaxed sm:grid-cols-3">
          <div>
            <dt className="font-medium text-ink">제작 기간</dt>
            <dd className="text-muted">
              주문 문의 후 2~3주쯤 걸린다고 가정해요. 실제 제작은 이뤄지지 않아요.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-ink">포장</dt>
            <dd className="text-muted">
              조각보와 완충재로 감싸 오동나무 상자에 담는다는 가상의 설정이에요.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-ink">배송</dt>
            <dd className="text-muted">
              택배로 보낸다고 가정한 안내예요. 실제 배송이나 결제는 없습니다.
            </dd>
          </div>
        </dl>
      </section>

      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {crafts.map((craft) => (
          <li key={craft.id}>
            <CraftCard craft={craft} onInquire={onInquire} />
          </li>
        ))}
      </ul>
    </div>
  );
}
