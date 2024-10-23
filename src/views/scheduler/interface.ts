/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { FormikValues } from 'formik';
import { GetSchedPostsResponse } from 'store/scheduler/models';
import { DateRange, ISocialType, ISocialMenuScheduler } from 'types';
import { EventFbFormData, EventIgFormData, EventLiFormData, EventTwFormData } from './types';

export interface IAddEventFormIg {
  range: DateRange | null;
  social: ISocialMenuScheduler | undefined;
  handleCreate: (d: FormikValues) => void;
  onCancel: () => void;
  preFill?: EventIgFormData | null;
}

export interface IUpdateEventFormIg {
  range: DateRange | null;
  social: ISocialMenuScheduler | undefined;
  postId: string;
  onUpdate: ({ id, postDetailsForm }: ISchedulerStateUpdate) => void;
  onDelete: (id: string) => void;
  onCancel: () => void;
}

export interface IAddEventFormFb {
  range: DateRange | null;
  social: ISocialMenuScheduler | undefined;
  handleCreate: (d: FormikValues) => void;
  onCancel: () => void;
  preFill?: EventFbFormData | null;
}

export interface IUpdateEventFormFb {
  range: DateRange | null;
  social: ISocialMenuScheduler | undefined;
  postId: string;
  onUpdate: ({ id, postDetailsForm }: ISchedulerStateUpdate) => void;
  onDelete: (id: string) => void;
  onCancel: () => void;
}

export interface IAddEventFormTw {
  range: DateRange | null;
  social: ISocialMenuScheduler | undefined;
  handleCreate: (d: FormikValues) => void;
  onCancel: () => void;
  preFill?: EventTwFormData | null;
}

export interface IUpdateEventFormTw {
  range: DateRange | null;
  social: ISocialMenuScheduler | undefined;
  postId: string;
  onUpdate: ({ id, postDetailsForm }: ISchedulerStateUpdate) => void;
  onDelete: (id: string) => void;
  onCancel: () => void;
}

export interface IAddEventFormLi {
  range: DateRange | null;
  social: ISocialMenuScheduler | undefined;
  handleCreate: (d: FormikValues) => void;
  onCancel: () => void;
  preFill?: EventLiFormData | null;
}

export interface IUpdateEventFormLi {
  range: DateRange | null;
  social: ISocialMenuScheduler | undefined;
  postId: string;
  onUpdate: ({ id, postDetailsForm }: ISchedulerStateUpdate) => void;
  onDelete: (id: string) => void;
  onCancel: () => void;
}

export interface IToastImageEditor {
  path: string;
  postId?: string;
  social?: ISocialType;
  handleClose: () => void;
}

export interface IChooseVideoCover {
  postId?: string;
  onClose: () => void;
  social?: ISocialType;
}

// export interface ISocialMenuScheduler {
//   id: number | string;
//   label: string;
//   social: ISocialType;
//   socialId?: string;
//   socialPic?: string;
//   disabled?: boolean;
//   order: number;
//   icon: string;
// }

export interface ISucessDialog {
  active: ISocialType | null;
  postDetails: GetSchedPostsResponse | null;
  menuItems: ISocialMenuScheduler[];
  onClose: () => void;
  handleAddClick: (social: ISocialType) => void;
}

export interface ISchedulerStateUpdate {
  id: string;
  postDetailsForm: EventIgFormData | EventFbFormData | EventTwFormData | EventLiFormData;
}

export interface ICheckConnect {
  facebook: boolean;
  twitter: boolean;
  instagram: boolean;
  linkedin: boolean;
}
