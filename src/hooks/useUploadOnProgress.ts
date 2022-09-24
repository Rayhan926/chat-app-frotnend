/* eslint-disable no-confusing-arrow */
import { uploadOnProgeressAtom } from '@atoms';
import { UploadOnProgress } from '@types';
import { useAtom } from 'jotai';
import { useMemo } from 'react';

const useUploadOnProgress = (id?: string) => {
  const [onProgresses, setOnProgresses] = useAtom(uploadOnProgeressAtom);

  const addProgress = (newProgress: UploadOnProgress) => {
    setOnProgresses((prev) => {
      const findProgress = prev.find((_p) => _p.id === newProgress.id);
      if (findProgress) {
        if (
          newProgress.progress === null &&
          typeof findProgress.progress === 'number'
        ) {
          return prev.filter((p) => p.id !== newProgress.id);
        }

        return prev.map((p) =>
          p.id === newProgress.id ? { ...p, ...newProgress } : p,
        );
      }
      return [...prev, newProgress];
    });
  };
  const progressInfo = useMemo(
    () =>
      onProgresses.find((p) => p.id === id) || {
        progress: null,
        id: null,
      },
    [onProgresses, id],
  );
  return {
    addProgress,
    progressInfo,
    onProgresses,
  };
};

export default useUploadOnProgress;
