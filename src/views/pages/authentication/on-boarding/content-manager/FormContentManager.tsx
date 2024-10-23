/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useState } from 'react';
import { gridSpacing } from 'views/common/constant';
import useAuth from 'hooks/useAuth';

// material ui
import { Box, Button, Divider, Grid, Stack } from '@material-ui/core';

// components
import Gallery from 'views/gallery';
import LoaderCircle from 'ui-component/LoaderCircle';

const FormContentManager: FC = () => {
  const { updateUserOnboard } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleNext = async () => {
    setIsLoading(true);
    await updateUserOnboard({ step: 'DONE' });
  };

  const handleGoBack = async () => {
    await updateUserOnboard({ step: 'CONNECT' });
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Gallery />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={2} sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button variant="text" onClick={() => handleGoBack()}>
            Back
          </Button>

          <Button type="submit" variant="contained" onClick={() => handleNext()}>
            Let’s go!
          </Button>
        </Stack>
      </Grid>

      {isLoading && (
        <Box>
          <LoaderCircle />
        </Box>
      )}
    </Grid>
  );
};

export default FormContentManager;
