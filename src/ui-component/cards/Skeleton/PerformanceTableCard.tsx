/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';

// material-ui
import { Box, Skeleton, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@material-ui/core';

const PerformanceTableCard: FC<{ rows?: number; columns?: number }> = ({ rows = 2, columns = 5 }) => (
  <TableContainer>
    <Table>
      <TableBody>
        {[...Array(rows)].map((row: number, ir: number) => (
          <TableRow key={`row-${ir}`}>
            <TableCell>
              <Box display="flex" alignItems="center">
                <Box>
                  <Skeleton variant="rectangular" width={60} height={60} animation="wave" />
                </Box>
                <Box flexGrow={1} sx={{ ml: 2 }}>
                  <Typography>
                    <Skeleton variant="text" animation="wave" />
                  </Typography>
                  <Typography>
                    <Skeleton variant="text" animation="wave" />
                  </Typography>
                </Box>
              </Box>
            </TableCell>

            {[...Array(columns)].map((col: number, ic: number) => (
              <TableCell key={`col-${ic}`}>
                <Skeleton variant="text" animation="wave" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default PerformanceTableCard;
