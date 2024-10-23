/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { useEffect, useRef, useState, FormEvent } from 'react';
import { Button, Grid, Fade } from '@material-ui/core';
import { IMultiStepFormProps } from './interface';
import { LoadingButton } from '@material-ui/lab';

const MultiStepForm = ({ id, onSubmit, children, currentStep: _currentStep, parent, loading }: IMultiStepFormProps) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isLastStep, setIsLastStep] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const initialForms = children
    ?.filter((child: any) => child !== false)
    .map((child: any, index: number) => ({ step: index, component: child?.props?.children }));
  const [forms, setForms] = useState<Array<any>>(initialForms);
  const formEl = useRef<HTMLFormElement>(null);
  const totalNumberOfForms = forms.length - 1;

  useEffect(() => {
    const updatedForms = children
      ?.filter((child: any) => child !== false)
      .map((child: any, index: number) => ({ step: index, component: child?.props?.children }));
    setForms(updatedForms);

    if (totalNumberOfForms > activeStep) {
      setIsLastStep(false);
    } else {
      setIsLastStep(true);
    }
  }, [children]);

  const handleBackClick = (e: any) => {
    e.preventDefault();
    parent.current.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    const currentStep = activeStep - 1;
    _currentStep(currentStep);
    setActiveStep(currentStep);

    if (totalNumberOfForms > currentStep) {
      setIsLastStep(false);
    }
  };

  const handleNextClick = (e: any) => {
    e.preventDefault();
    parent.current.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    const currentStep = activeStep + 1;
    _currentStep(currentStep);
    setActiveStep(currentStep);

    if (totalNumberOfForms === currentStep) {
      setIsLastStep(true);
    }
  };

  return (
    <form noValidate ref={formEl} id={id} onSubmit={onSubmit} style={{ width: '100%' }}>
      <Grid container sx={{ position: 'relative' }}>
        {forms.map((form) => (
          <Fade in={activeStep === form.step} mountOnEnter unmountOnExit>
            <Grid
              container
              sx={{
                position: activeStep === form.step ? 'relative' : 'absolute',
                left: activeStep === form.step ? 'initial' : '50%',
                transform: activeStep === form.step ? 'initial' : 'translateX(-50%)'
              }}
            >
              {form.component}
            </Grid>
          </Fade>
        ))}
      </Grid>

      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginTop: '80px', paddingTop: '20px', borderTop: '1px solid #C4C4C4' }}
      >
        {activeStep > 0 && (
          <Button variant="text" onClick={handleBackClick}>
            Back
          </Button>
        )}
        {!isLastStep ? (
          <Button variant="contained" onClick={handleNextClick} sx={{ marginLeft: 'auto', width: '150px' }} disabled={isButtonDisabled}>
            Next
          </Button>
        ) : (
          <LoadingButton variant="contained" type="submit" disabled={isButtonDisabled} loading={loading}>
            Submit
          </LoadingButton>
        )}
      </Grid>
    </form>
  );
};

export default MultiStepForm;
