/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React from 'react';
import lowerCase from 'lodash/lowerCase';
import startCase from 'lodash/startCase';
import { format, formatDistanceToNowStrict } from 'date-fns';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Table, TableBody, TableCell, TableContainer, TableRow, Theme, TablePagination, Checkbox, Typography } from '@material-ui/core';

// project imports
import { ArrangementOrder, HeadCell } from 'types';
import EnhancedTableHead from 'ui-component/extended/EnhancedTableHead';
import Chip from 'ui-component/extended/Chip';
import { ILeadsTableRow } from './interface';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: 350,
    '& td': {
      color: theme.palette.grey[700]
    }
  },
  blackBox: {
    display: 'flex',
    alignItems: 'flex-start',
    color: theme.palette.text.primary
  }
}));

// table header
const headCells: HeadCell[] = [
  {
    id: 'name',
    label: 'Name',
    align: 'left'
  },
  {
    id: 'email',
    label: 'Email',
    align: 'left'
  },
  {
    id: 'phone',
    label: 'Phone',
    align: 'left'
  },
  {
    id: 'source',
    label: 'Source',
    align: 'left'
  },
  {
    id: 'date',
    label: 'Date',
    align: 'left'
  },
  {
    id: 'status',
    label: 'Status',
    align: 'left'
  }
];
interface ILeadsTable {
  rows: ILeadsTableRow[];
}

const LeadsTable: React.FC<ILeadsTable> = (props) => {
  const { rows } = props;
  const classes = useStyles();
  const [order, setOrder] = React.useState<ArrangementOrder>('asc');
  const [orderBy, setOrderBy] = React.useState(headCells[0].id);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [selected, setSelected] = React.useState<number[]>([]);

  const handleRequestSort = (event: React.SyntheticEvent, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
    setRowsPerPage(parseInt(event?.target.value!, 10));
    setPage(0);
  };

  const handleClick = (event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const isSelected = (id: number) => selected.includes(id);

  return (
    <>
      <TableContainer>
        <Table className={classes.table}>
          <EnhancedTableHead
            selectable
            headCells={headCells}
            numSelected={0}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {rows.map((row, index) => {
              const isItemSelected = isSelected(row.id);
              let statusChipColor = '';

              if (row.status === 'SMOKING') {
                statusChipColor = 'error';
              } else if (row.status === 'HOT') {
                statusChipColor = 'error';
              } else if (row.status === 'WARM') {
                statusChipColor = 'warning';
              } else if (row.status === 'COOL') {
                statusChipColor = 'blue';
              }

              return (
                <TableRow hover key={row.id || index}>
                  <TableCell padding="checkbox" sx={{ pl: 3 }} onClick={(event) => handleClick(event, row.id)}>
                    <Checkbox color="primary" checked={isItemSelected} />
                  </TableCell>
                  <TableCell>{row.fullName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.source}</TableCell>
                  <TableCell align="left">
                    <Typography>{format(new Date(row.createdAt), 'do MMM yyyy')}</Typography>
                    <Typography variant="caption">{formatDistanceToNowStrict(new Date(row.createdAt))} ago</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={row.status === 'SMOKING' ? '🔥 Smoking' : startCase(lowerCase(row.status))} chipcolor={statusChipColor} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default LeadsTable;
