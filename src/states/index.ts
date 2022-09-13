import { ToastAtomType, ToastType } from '@types';
import { atom, useAtom } from 'jotai';

const sendFriendRequesDrawerAtom = atom(false);
export const useOpenFriendRequestDrawer = () =>
  useAtom(sendFriendRequesDrawerAtom);

const toastAtom = atom<ToastAtomType[]>([]);

export const useToast = () => {
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
