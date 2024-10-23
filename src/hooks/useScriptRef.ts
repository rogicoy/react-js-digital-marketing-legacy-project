/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { useEffect, useRef } from 'react';

// ==============================|| ELEMENT REFERENCE HOOKS  ||============================== //

const useScriptRef = () => {
  const scripted = useRef(true);

  useEffect(
    () => () => {
      scripted.current = false;
    },
    []
  );

  return scripted;
};

export default useScriptRef;
