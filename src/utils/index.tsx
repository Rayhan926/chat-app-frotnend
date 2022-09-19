import classNames from 'classnames';
import Cookies from 'universal-cookie';

export const cx = classNames;

export const cookies = new Cookies();

export const getErrorMsg = (err: any) => {
  let msg = '';
  try {
    msg = err.response.data.message;
  } catch (error) {
    msg = err?.message || 'Something went wrong';
  }

  return msg;
};

export const scrollChatScreenToBottom = () => {
  const messagesWrapper = document.getElementById('messages_wrapper');
  if (!messagesWrapper) return;

  setTimeout(() => {
    messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
  }, 5);
};

export const getFullPath = (path: string) => {
  return process.env.NEXT_PUBLIC_BASE_URL + path;
};
