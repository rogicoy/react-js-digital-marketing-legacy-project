/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// project imports
import Security from './Security';

const Container = (props: any) => {
  const { root, doCallBillingApi, doUpdateData } = props;

  return (
    <>
      <Security />
    </>
  );
};

export default Container;
