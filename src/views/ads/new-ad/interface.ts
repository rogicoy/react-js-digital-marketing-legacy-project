/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { ISocialType } from 'types';

export interface IAdItem {
  id: number;
  socials: ISocialType[];
  title: string;
  subtitle: string;
  description: string;
  link: string;
  // handleClick?: () => void;
}
