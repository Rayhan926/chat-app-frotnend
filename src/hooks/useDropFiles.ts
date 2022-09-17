import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const useDropFiles = () => {
  const onDrop = useCallback((acceptedFiles: any[]) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);

  const dropzone = useDropzone({ onDrop });
  return { ...dropzone };
};

export default useDropFiles;
