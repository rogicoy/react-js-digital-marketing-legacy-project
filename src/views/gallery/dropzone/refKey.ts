/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

const create = (size: number) => {
  let result = '';
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  for (let ctr = 0; ctr < size; ctr += 1) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const refKey = {
  create
};

export default refKey;
