import Image from 'next/image';

const NoData = ({ text }: { text?: string }) => {
  return (
    <div className="h-full flex items-center flex-col justify-center text-center">
      <div className="max-w-[75%]">
        <Image
          width={1228}
          height={899}
          src="/images/no-data.svg"
          alt="No Data"
        />
      </div>
      {text && <h3 className="text-dark-900/50 -translate-y-3">{text}</h3>}
    </div>
  );
};

export default NoData;
