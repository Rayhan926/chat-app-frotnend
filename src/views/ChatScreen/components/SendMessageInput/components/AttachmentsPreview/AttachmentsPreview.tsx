/* eslint-disable @next/next/no-img-element */
import useDropFiles from '@hooks/useDropFiles';
import Image from 'next/image';
import { Scrollbars } from 'react-custom-scrollbars';
import { IoCloseSharp } from 'react-icons/io5';

const AttachmentsPreview = () => {
  const { files, removeFile } = useDropFiles();

  if (!files?.length) return null;
  return (
    <Scrollbars autoHeight autoHide>
      <div className="flex gap-1.5 pb-1.5">
        {files.map((file, i) => (
          <div
            key={i}
            className="bg-dark-100 rounded-md shrink-0 p-1 overflow-hidden relative"
          >
            <button
              onClick={() => removeFile(i)}
              className="w-4 h-4 rounded-full overflow-hidden flex justify-center items-center bg-primary cursor-pointer duration-150 hover:scale-110 text-white absolute right-1 top-1 z-[3]"
            >
              <IoCloseSharp size={12} />
            </button>
            <div className="w-[55px] bg-white aspect-square overflow-hidden flex items-center justify-center rounded [&>span]:!block">
              <Image
                width={file.width}
                height={file.height}
                src={file.preview}
                alt={file.name}
                className="w-full"
              />
            </div>
          </div>
        ))}
      </div>
    </Scrollbars>
  );
};

export default AttachmentsPreview;
