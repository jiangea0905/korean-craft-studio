interface PracticeNoticeProps {
  className?: string;
  showErrorHint?: boolean;
}

export function PracticeNotice({ className = "", showErrorHint = false }: PracticeNoticeProps) {
  return (
    <div
      role="note"
      className={`rounded-lg border border-line bg-surface px-4 py-3 text-sm leading-relaxed text-ink ${className}`}
    >
      <p>
        이 사이트는 실습용 프로토타입입니다. 입력한 정보는 저장되거나 전송되지 않으므로 실제 개인정보를 입력하지 마세요.
      </p>
      {showErrorHint ? (
        <p className="mt-1 text-muted">
          오류 화면을 확인하려면 연락처에 010-0000-0000을 입력해 보세요.
        </p>
      ) : null}
    </div>
  );
}

export default PracticeNotice;
