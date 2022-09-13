import { ToastAtomType } from '@types';

const Toast = ({ message, toastId }: ToastAtomType) => {
  return (
    <div
      id={toastId}
      className="bg-primary px-5 py-2 rounded-md text-white shadow-md animate_slide_up w-fit mx-auto"
    >
      {message}
    </div>
  );
};

export default Toast;
