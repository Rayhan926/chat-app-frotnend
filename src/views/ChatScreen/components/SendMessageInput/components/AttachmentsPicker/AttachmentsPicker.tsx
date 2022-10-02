import useDropFiles from '@hooks/useDropFiles';
import { ImAttachment } from 'react-icons/im';

const AttachmentsPicker = () => {
  const { getInputProps, getRootProps } = useDropFiles();
  return (
    <>
      <button type="button" className={'__emoji_btn'} {...getRootProps()}>
        <ImAttachment size={18} />
      </button>

      <input {...getInputProps()} id="attachmentsInput" className="sr-only" />
    </>
  );
};

export default AttachmentsPicker;
