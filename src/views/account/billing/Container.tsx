/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React from 'react';

// project imports
import Billing from './Billing';

const Container = (props: any) => {
  const { root, doCallBillingApi, doUpdateData } = props;

  return (
    <>
      <Billing />
    </>
  );
};

export default Container;
