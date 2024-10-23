/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/**
 * Adaptor for axios
 */

import AxiosMockAdapter from 'axios-mock-adapter';
import axios from './axios';

const services = new AxiosMockAdapter(axios, { delayResponse: 0 });
export default services;
