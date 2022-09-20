/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { filesAtom } from '@atoms';
import { FileWithAdditionalFields } from '@types';
import { getHeightAndWidthFromDataUrl } from '@utils';
import { useAtom } from 'jotai';
import { useDropzone } from 'react-dropzone';
import { v4 as uuid } from 'uuid';

const useDropFiles = () => {
  const [files, setFiles] = useAtom(filesAtom);

  const withAdditionalFields: FileWithAdditionalFields[] = [];

  const onDrop = async (acceptedFiles: File[]) => {
    const withFileDimensions = async () => {
      for (let i = 0; i < acceptedFiles.length; i += 1) {
        const file: any = acceptedFiles[i];
        const d: any = await getHeightAndWidthFromDataUrl(file);

        file.width = d.width;
        file.height = d.height;
        file.preview = URL.createObjectURL(file);
        file._id = uuid();

        withAdditionalFields[i] = file;
      }
    };

    await withFileDimensions();

    setFiles((prev) => [...prev, ...withAdditionalFields]);
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const dropzone = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
  });
  return { ...dropzone, files, setFiles, removeFile };
};

export default useDropFiles;
