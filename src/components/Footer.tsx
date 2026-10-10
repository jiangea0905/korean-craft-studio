export function Footer() {
  return (
    <footer className="mt-12 border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <p className="font-serif text-base font-bold text-ink">온결 공방</p>
        <p className="mt-1 text-sm text-muted">
          아래 정보는 모두 실습용 가상 정보이며 실제와 관련이 없습니다.
        </p>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-[6rem_1fr]">
          <dt className="font-medium text-ink">주소</dt>
          <dd className="text-muted">가상시 가상구 공예로 0 (실습용 가상 정보)</dd>
          <dt className="font-medium text-ink">운영시간</dt>
          <dd className="text-muted">평일 00:00 - 00:00 (실습용 가상 정보)</dd>
          <dt className="font-medium text-ink">문의처</dt>
          <dd className="text-muted">
            000-0000-0000 · example@example.invalid (실습용 가상 정보)
          </dd>
        </dl>
        <p className="mt-6 text-xs text-muted">
          본 사이트는 실습용 프로토타입으로, 실제 주문·결제·예약이 이루어지지 않습니다.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
