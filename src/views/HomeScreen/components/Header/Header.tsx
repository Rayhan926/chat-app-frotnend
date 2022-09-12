import UserAvatar from '@components/UserAvatar';

export default function Header() {
  return (
    <header className="__px flex justify-between items-center pt-6 pb-4 border-b border-dark-100 shrink-0">
      <h1 className="font-bold text-[26px] text-dark-900">Inbox</h1>

      <UserAvatar />
    </header>
  );
}
