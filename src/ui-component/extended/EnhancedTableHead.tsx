/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { TableHead, TableRow, TableCell, TableSortLabel, Theme, Checkbox } from '@material-ui/core';
import { visuallyHidden } from '@material-ui/utils';

// project imports
import { EnhancedTableHeadProps } from 'types';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  sortSpan: { ...visuallyHidden }
}));

const EnhancedTableHead: React.FC<EnhancedTableHeadProps> = (props) => {
  const classes = useStyles();
  const {
    sortable = true,
    selectable,
    headCells = [],
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort = () => {},
    onSelectAllClick = () => {}
  } = props;

  const createSortHandler = (property: string) => (event: React.SyntheticEvent) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {selectable && (
          <TableCell padding="checkbox" sx={{ pl: 3 }}>
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts'
              }}
            />
          </TableCell>
        )}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : headCell.align || 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : undefined}
          >
            {sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.sortSpan}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
