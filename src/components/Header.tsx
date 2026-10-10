export function Header() {
  return (
    <header className="border-b border-line bg-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-0.5 px-4 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:px-6">
        <p className="font-serif text-lg font-bold text-ink">온결 공방</p>
        <p className="text-sm text-muted">결을 따라 천천히 빚는 공예</p>
      </div>
    </header>
  );
}

export default Header;
