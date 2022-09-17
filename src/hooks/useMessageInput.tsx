import { messageInputAtom } from '@atoms';
import { useAtom } from 'jotai';

const useMessageInput = () => {
  const [messageInput, setMessageInput] = useAtom(messageInputAtom);

  const setFieldValue = (fieldName: string, value: any) => {
    setMessageInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return { ...messageInput, setFieldValue };
};

export default useMessageInput;
