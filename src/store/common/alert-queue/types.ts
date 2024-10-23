/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

export const ENQUEUE_SUCCESS_ALERT = 'alertQueue/ENQUEUE_SUCCESS_ALERT';
export const ENQUEUE_ERROR_ALERT = 'alertQueue/ENQUEUE_ERROR_ALERT';
export const ENQUEUE_WARNING_ALERT = 'alertQueue/ENQUEUE_WARNING_ALERT';
export const ENQUEUE_INFO_ALERT = 'alertQueue/ENQUEUE_INFO_ALERT';
export const DEQUEUE_ALERT = 'alertQueue/DEQUEUE_ALERT';
export const OPEN_ALERT = 'alertQueue/OPEN_ALERT';

export type AlertQueueItemType = 'success' | 'error' | 'warning' | 'info';
