/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { useContext } from 'react';

// auth provider
import GraphqlContext from 'contexts/GraphqlContext';

// ==============================|| AUTH HOOKS ||============================== //

const useAuth = () => useContext(GraphqlContext);

export default useAuth;
