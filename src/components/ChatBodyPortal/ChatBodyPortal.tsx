import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const ChatBodyPortal = ({ children }:{children: ReactNode}) => {
  const [containerElm, setContainerElm] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setContainerElm((document.getElementById('chat_body_wrapper') as any));
  }, []);

  if (!containerElm) return null;
  return createPortal(children, containerElm);
};

export default ChatBodyPortal;
