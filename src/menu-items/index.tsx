/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { NavItemType } from 'types';
import makeMainMenu from './mainMenu';
import makeAdsMenu from './adsMenu';
import makeSupportMenu from './supportMenu';

const createMenuItems = (): { items: NavItemType[] } => ({
  items: [makeMainMenu(), makeAdsMenu(), makeSupportMenu()]
});

export default createMenuItems;
