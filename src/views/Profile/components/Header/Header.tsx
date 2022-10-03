import { useRouter } from 'next/router';
import { FiChevronLeft } from 'react-icons/fi';

const Header = () => {
  const router = useRouter();

  return (
    <div className="flex items-center __px shrink-0 py-3 sm:py-4 gap-2 border-b border-dark-100">
      {/** Go back --Start-- */}
      <button
        onClick={() => router.back()}
        className="w-9 h-9 shrink-0 rounded-full overflow-hidden flex justify-center items-center -ml-3 hover:bg-dark-100 text-primary"
      >
        <FiChevronLeft size={20} />
      </button>
      {/** Go back --End-- */}

      <p className="text-base font-semibold text-dark-900">Me</p>
    </div>
  );
};

export default Header;
