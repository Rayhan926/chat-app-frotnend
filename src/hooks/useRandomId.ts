import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useRandomId = () => {
  const [randomId, setRandomId] = useState<string>(uuidv4());

  const refresh = () => setRandomId(uuidv4());

  return { randomId, refresh };
};

export default useRandomId;
