/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { filesAtom } from '@atoms';
import { FileWithAdditionalFields } from '@types';
import { useAtom } from 'jotai';
import { useDropzone } from 'react-dropzone';

const getHeightAndWidthFromDataUrl = async (file: any) =>
  new Promise((resolve) => {
    const dataURL = URL.createObjectURL(file);
    const img = new Image();
    img.src = dataURL;
    img.onload = () => {
      resolve({
        height: img.height,
        width: img.width,
      });
    };
  });

const useDropFiles = () => {
  const [files, setFiles] = useAtom(filesAtom);

  const withAdditionalFields: FileWithAdditionalFields[] = [];

  const onDrop = async (acceptedFiles: File[]) => {
    const dddd = async () => {
      for (let i = 0; i < acceptedFiles.length; i += 1) {
        const file: any = acceptedFiles[i];
        const d: any = await getHeightAndWidthFromDataUrl(file);

        file.width = d.width;
        file.height = d.height;
        file.preview = URL.createObjectURL(file);

        withAdditionalFields[i] = file;
      }
    };

    await dddd();

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
