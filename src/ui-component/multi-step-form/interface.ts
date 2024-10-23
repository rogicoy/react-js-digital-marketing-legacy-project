/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

export interface IMultiStepFormProps {
  id: string;
  onSubmit: any;
  children: React.ReactNode[];
  currentStep: any;
  parent?: any;
  loading?: boolean;
}

export interface IMultiStepFormItemProps {
  children: React.ReactNode;
}
