import { socketAtom } from '@atoms';
import { useAtom } from 'jotai';

const useSocket = () => {
  const [socket, setSocket] = useAtom(socketAtom);

  return {
    socket,
    setSocket,
  };
};

export default useSocket;
