import { toastAtom } from '@atoms';
import { ToastType } from '@types';
import { useAtom } from 'jotai';

const useToast = () => {
  const [toasts, _setToast] = useAtom(toastAtom);

  const setToast = (newToast: ToastType) => {
    let toastId: string;
    _setToast((prev) => {
      toastId = `toast_${prev.length}`;
      return [...prev, { ...newToast, toastId }];
    });

    setTimeout(() => {
      document.getElementById(toastId)?.classList.add('animate_slide_down');
      setTimeout(() => {
        _setToast((prev) => prev.filter((toast) => toast.toastId !== toastId));
      }, 200);
    }, 4000);
  };

  return {
    toasts,
    setToast,
  };
};

export default useToast;
