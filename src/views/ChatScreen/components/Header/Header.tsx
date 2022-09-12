import { useRouter } from 'next/router';
import { FiChevronLeft } from 'react-icons/fi';

const Header = () => {
  const router = useRouter();
  return (
    <div className="flex items-center __px shrink-0 py-3 gap-2 border-b border-dark-100">
      {/** Go back --Start-- */}
      <button
        onClick={() => router.back()}
        className="w-9 h-9 rounded-full overflow-hidden flex justify-center items-center -ml-3 hover:bg-dark-100 text-primary"
      >
        <FiChevronLeft size={20} />
      </button>
      {/** Go back --End-- */}

      {/** User Info --Start-- */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-dark-100"></div>
        <div className="">
          <h3 className="text-sm font-semibold text-dark-900">Saymon</h3>
          <p className="text-[11px] text-green-600">Online</p>
        </div>
      </div>
      {/** User Info --End-- */}
    </div>
  );
};

export default Header;
