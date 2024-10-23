/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';

// material ui
import { Box, Card, CardContent, Typography } from '@material-ui/core';

const TotalCard: FC<{ title: string; value: number; py?: string; className?: string }> = ({ title, value, py = '0', className }) => (
  <Card sx={{ py }} className={className}>
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h2" sx={{ fontWeight: 'normal' }}>
          {title}
        </Typography>
        <Typography variant="h2" sx={{ color: '#808080' }}>
          {value}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default TotalCard;
