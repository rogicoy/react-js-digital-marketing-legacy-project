/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FunctionComponent, ReactElement, ReactNode } from 'react';
import { To } from 'react-router-dom';
import { PaletteMode, SvgIconTypeMap, SnackbarOrigin, ChipProps, TableCellProps } from '@material-ui/core';
import { Property } from 'csstype';

import { CartStateProps } from './cart';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { TablerIcon } from '@tabler/icons';
import { UserProfile } from '_mockApis/user-profile/types';

// project imports

export type ArrangementOrder = 'asc' | 'desc' | undefined;

export type DateRange = { start: number | Date; end: number | Date };

export type GetComparator = (o: ArrangementOrder, o1: string) => (a: KeyedObject, b: KeyedObject) => number;

export type Direction = 'up' | 'down' | 'right' | 'left';

export type DialogMaxWidthType = false | 'sm' | 'xs' | 'md' | 'lg' | 'xl' | undefined;

export type AudienceFilter = 'CITY' | 'COUNTRY' | 'GENDER' | 'AGE';

export interface TabsProps {
  children?: React.ReactElement | string;
  value: string | number;
  index: number;
}

export interface GenericCardProps {
  title?: string;
  primary?: string | number | undefined;
  secondary?: string;
  content?: string;
  image?: string;
  dateTime?: string;
  iconPrimary?: OverrideIcon;
  color?: string;
  size?: string;
}

export type OverrideIcon =
  | (OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
      muiName: string;
    })
  | React.ComponentClass<any>
  | FunctionComponent<any>
  | TablerIcon;

export interface EnhancedTableHeadProps extends TableCellProps {
  sortable?: boolean;
  selectable?: boolean;
  headCells?: HeadCell[];
  onSelectAllClick?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  order?: ArrangementOrder;
  orderBy?: string;
  numSelected: number;
  rowCount: number;
  onRequestSort?: (e: React.SyntheticEvent, p: string) => void;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
}

export type HeadCell = {
  id: string;
  label: string;
  numeric?: boolean;
  disablePadding?: string | boolean | undefined;
  align?: 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined;
};

export type LinkTarget = '_blank' | '_self' | '_parent' | '_top';

export type NavItemTypeObject = { children?: NavItemType[]; items?: NavItemType[]; type?: string };

export type NavItemType = {
  id?: string;
  icon?: GenericCardProps['iconPrimary'];
  target?: boolean;
  external?: string;
  url?: string | undefined;
  type?: string;
  title?: React.ReactNode | string;
  color?: 'primary' | 'secondary' | 'default' | undefined;
  caption?: React.ReactNode | string;
  breadcrumbs?: boolean;
  disabled?: boolean;
  chip?: ChipProps;
};

export type AuthSliderProps = {
  title: string;
  description: string;
};

export interface CustomizationStateProps {
  isOpen: NavItemType[];
  type?: string;
  id?: string;
  navType: PaletteMode;
  presetColor: string;
  locale: string;
  rtlLayout: boolean;
  opened: boolean;
  fontFamily: Property.FontFamily;
  borderRadius?: number;
  outlinedFilled: boolean;
}
export interface SnackbarStateProps {
  action: boolean;
  open: boolean;
  message: string;
  anchorOrigin: SnackbarOrigin;
  variant: string;
  alertSeverity: 'error' | 'warning' | 'success';
  transition: string;
  close: boolean;
  actionButton: boolean;
}

export interface INotificationItem {
  noticeId: string;
  categoryChip: string;
  cta: string;
  description: string;
  icon: string;
  timestamp: string;
  title: string;
  noticeType: 'SUCCESS' | 'ERROR';
}

export interface NotificationStateProps {
  type?: string;
  newItem: INotificationItem | null;
  removeId: string;
  list: INotificationItem[];
}

export interface ColorPaletteProps {
  color: string;
  label: string;
  value: string;
}

export interface DefaultRootStateProps {
  customization: CustomizationStateProps;
  snackbar: SnackbarStateProps;
  cart: CartStateProps;
  notification: NotificationStateProps;
}

export interface ColorProps {
  readonly [key: string]: string;
}

export type GuardProps = {
  children: ReactElement | null;
};

export interface StringColorProps {
  id?: string;
  label?: string;
  color?: string;
  primary?: string;
  secondary?: string;
}

export interface JWTData {
  userId: string;
}

export type KeyedObject = {
  [key: string]: string | number | KeyedObject | any;
};

export interface initialLoginContextProps {
  isLoggedIn: boolean;
  isInitialized: boolean;
  user?: UserProfile | null | undefined;
}

export interface FormInputProps {
  bug: KeyedObject;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | undefined;
  label: string;
  name: string;
  required?: boolean;
  InputProps?: {
    label: string;
    startAdornment?: React.ReactNode;
  };
}

export interface IRoute {
  path: string;
  element?: ReactElement;
  children?: IRoute[];
}

export interface IOptionItem {
  label: string;
  value: string | number;
  meta?: KeyedObject;
}

export type HandleFunction = (i: string, s: string) => Promise<void>;

export type Event = {
  id: string;
  allDay: boolean;
  color: string;
  textColor?: string;
  description: string;
  start: Date;
  end: Date;
  title: string;
};

export type ISocialType = 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'google';

export type ISocialAccountType =
  | 'facebookPage'
  | 'facebookAds'
  | 'linkedin'
  | 'twitterScheduler'
  | 'twitterAnalytics'
  | 'instagram'
  | 'googleAds'
  | 'mindbody';

export enum ISocialEnum {
  FACEBOOKPAGE = 'FACEBOOKPAGE',
  FACEBOOKADS = 'FACEBOOKADS',
  INSTAGRAM = 'INSTAGRAM',
  TWITTER = 'TWITTER',
  TWITTERSCHEDULER = 'TWITTERSCHEDULER',
  LINKEDIN = 'LINKEDIN',
  GOOGLE = 'GOOGLE',
  MINDBODY = 'MINDBODY'
}
export interface IPaginator {
  search?: string;
  after?: string;
  first?: number;
  offset?: number;
}

export interface IPageInfo {
  hasNextPage?: boolean;
  endCursor?: string;
}

export interface ISelectableCard {
  name: string;
  id: string;
  title: string;
  value: string;
  defaultIcon: string;
  activeIcon: string;
  imgAlt: string;
  description: string;
  minHeight?: string;
  isRecommended?: boolean;
}

/** ---- Common Functions types ---- */

export type StringBoolFunc = (s: string) => boolean;
export type StringNumFunc = (s: string) => number;
export type NumbColorFunc = (n: number) => StringColorProps | undefined;
export type ChangeEventFunc = (e: React.ChangeEvent<HTMLInputElement>) => void;

export type CampaignStatus = 'ACTIVE' | 'IN_REVIEW' | 'PAUSED' | 'PENDING' | 'COMPLETED' | 'ARCHIVED';

export interface ISocialTab {
  to: To;
  label: string;
}

export interface ISocialActive {
  social: ISocialType;
  socialTabs: ISocialTab[];
}

export interface IContentInteractions {
  icon: ReactNode;
  value: number;
  subTitle: string;
}

export interface IInteractions {
  className?: string;
  interactions: IContentInteractions[];
}

export interface IPerformingPosts {
  mainTitle: string;
  link?: string;
}

export interface IFbPage {
  id: string;
  activeName: string;
  activeId: string;
  count: number | string;
  fbId: string;
  fbName: string;
  fbPic: string;
}

export interface IFbPageDetails {
  id: string;
  name: string;
  profile: string;
}

export interface IIgPageDetails {
  id: string;
  name: string;
  profile: string;
}

export interface ITwPageDetails {
  id: string;
  name: string;
  username: string;
  profilePic: string;
}

export type DatePreset =
  | 'TODAY'
  | 'YESTERDAY'
  | 'LAST7DAY'
  | 'LAST14DAY'
  | 'LAST30DAY'
  | 'THISWEEK'
  | 'LASTWEEK'
  | 'THISMONTH'
  | 'LASTMONTH';

export interface ILiPageDetails {
  id: string;
  name: string;
  profile: string;
}

export interface ISocialMenuScheduler {
  id: number | string;
  label: string;
  social: ISocialType;
  socialId?: string;
  socialPic?: string;
  disabled?: boolean;
  order: number;
  icon: string;
}
