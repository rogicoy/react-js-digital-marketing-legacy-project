/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// project imports
import Notifications from './Notifications';

const Container = (props: any) => {
  const { root, doCallBillingApi, doUpdateData } = props;

  return (
    <>
      <Notifications />
    </>
  );
};

export default Container;
