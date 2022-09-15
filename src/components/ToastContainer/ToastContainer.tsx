import ChatBodyPortal from '@components/ChatBodyPortal';
import Toast from '@components/Toast';
import useToast from '@hooks/useToast';

const ToastContainer = () => {
  const { toasts } = useToast();
  return (
    <ChatBodyPortal>
      <div className="space-y-1.5 absolute left-1/2 -translate-x-1/2 top-5 text-sm z-10 text-center w-full max-w-[80%]">
        {toasts.map((toast, i) => (
          <Toast {...toast} key={i} />
        ))}
      </div>
    </ChatBodyPortal>
  );
};

export default ToastContainer;
