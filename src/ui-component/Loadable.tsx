/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { Suspense, LazyExoticComponent, ComponentType } from 'react';

// project imports
import Loader, { LoaderProps } from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component: LazyExoticComponent<() => JSX.Element> | ComponentType<React.ReactNode>) => (props: LoaderProps) => (
  <Suspense fallback={<Loader />}>
    <Component {...props} />
  </Suspense>
);

export default Loadable;
