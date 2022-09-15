import classNames from 'classnames';
import Cookies from 'universal-cookie';

export const cx = classNames;

export const cookies = new Cookies();

export const getErrorMsg = (err: any) => {
  let msg = '';
  try {
    msg = err.response.data.message;
  } catch (error) {
    msg = 'Something went wrong';
  }

  return msg;
};
