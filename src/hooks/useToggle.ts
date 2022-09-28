import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const toggleAtom = atom(false);
const useToggle = () => {
  const [toggle, setToggle] = useAtom(toggleAtom);

  const toggleState = useCallback(() => {
    setToggle((prev) => !prev);
  }, [setToggle]);

  return { toggleState, toggle };
};

export default useToggle;
