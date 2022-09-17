import Image from 'next/image';

const Error = ({ text }: { text?: string }) => {
  return (
    <div className="h-full flex items-center flex-col justify-center text-center">
      <div className="max-w-[85%]">
        <Image
          width={1228}
          height={899}
          src="/images/roubleshooting-bro.svg"
          alt="Error"
        />
      </div>
      {text && <h3 className="text-dark-900/50 -translate-y-1">{text}</h3>}
    </div>
  );
};

export default Error;
