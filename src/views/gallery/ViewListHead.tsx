/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import { ViewListHeadProps } from './types';
import { visuallyHidden } from '@material-ui/utils';

const useStyles = makeStyles((theme: Theme) => ({
  sortSpan: { ...visuallyHidden }
}));

const ViewListHead = (props: ViewListHeadProps) => {
  const classes = useStyles();
  const { order, orderBy, numSelected, rowCount, headCells, onSelectAllClick, onRequestSort } = props;
  const createSortHandler = (property: string) => (event: React.SyntheticEvent<Element, Event>) => {
    if (onRequestSort) {
      onRequestSort(event, property);
    }
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" sx={{ pl: 3 }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select medias'
            }}
          />
        </TableCell>
        {headCells &&
          headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.align}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id && (
                  <span className={classes.sortSpan}>{order === 'desc' ? 'Sorted Descending' : 'Sorted Ascending'}</span>
                )}
              </TableSortLabel>
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
};

export default ViewListHead;
