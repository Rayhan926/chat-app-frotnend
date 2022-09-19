import useDropFiles from '@hooks/useDropFiles';
import { ImAttachment } from 'react-icons/im';

const AttachmentsPicker = () => {
  const { getInputProps, getRootProps } = useDropFiles();
  return (
    <div>
      <button type="button" className={'pr-3 __emoji_btn'} {...getRootProps()}>
        <ImAttachment size={18} />
      </button>

      <input {...getInputProps()} id="attachmentsInput" className="sr-only" />
    </div>
  );
};

export default AttachmentsPicker;
