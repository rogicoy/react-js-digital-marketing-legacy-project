/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

export const isDstObserved = () => {
  const today = new Date();
  const stdTimezoneOffset = () => {
    const jan = new Date(today.getFullYear(), 0, 1);
    const jul = new Date(today.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  };
  return today.getTimezoneOffset() < stdTimezoneOffset();
};

const tools = {
  isDstObserved
};

export default tools;
