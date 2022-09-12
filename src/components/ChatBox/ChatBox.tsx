import Link from 'next/link';

const ChatBox = () => (
  <Link href={'/chat/1'}>
    <a className="flex items-center __px py-2.5 gap-4 cursor-pointer hover:bg-dark-100/40">
      {/** Avatar --Start-- */}
      <div className="w-12 h-12 rounded-full bg-dark-100 shrink-0"></div>
      {/** Avatar --End-- */}

      {/** Name and last message --Start-- */}
      <div className="space-y-0.5">
        <h3 className="font-semibold text-base text-dark-900 line-clamp-1">
          Rayhan Ahmed
        </h3>
        <p className="text-sm text-dark-700 line-clamp-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
          culpa!
        </p>
      </div>
      {/** Name and last message --End-- */}

      {/** Unseen message count and time --Start-- */}
      <div className="ml-auto flex flex-col items-end shrink-0 space-y-1">
        <p className="text-dark-700 text-xs">8:20 AM</p>
        <div className="w-5 h-5 rounded-full bg-primary flex justify-center items-center text-white text-xs font-light">
          2
        </div>
      </div>
      {/** Unseen message count and time --End-- */}
    </a>
  </Link>
);

export default ChatBox;
