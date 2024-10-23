/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Table, TableBody, TableContainer, Theme } from '@material-ui/core';
import { ArrangementOrder, HeadCell } from 'types';
import EnhancedTableHead from 'ui-component/extended/EnhancedTableHead';
import { CampaignReport } from 'store/ads/reports/models';
import { CampaignsTableProps } from '../types';
import CampaignRow from './CampaignRow';

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: 350,
    '& tr > th:first-child, tr > td:first-child': {
      paddingLeft: 0
    },
    '& td': {
      minWidth: 110,
      color: theme.palette.grey[500]
    }
  }
}));

const headCells: HeadCell[] = [
  {
    id: 'Campaign Name',
    label: 'Campaign Name'
  },
  {
    id: 'Start Date',
    label: 'Start Date'
  },
  {
    id: 'End Date',
    label: 'End Date'
  },
  {
    id: 'Total Spent',
    label: 'Total Spent'
  },
  {
    id: 'Impressions',
    label: 'Impressions'
  },
  {
    id: 'Clicks',
    label: 'Clicks'
  },
  {
    id: 'Reach',
    label: 'Reach'
  },
  {
    id: 'Frequency',
    label: 'Frequency'
  },
  {
    id: 'CPR',
    label: 'CPR'
  },
  {
    id: 'Status',
    label: 'Status'
  }
];

const CampaignsTable = (props: CampaignsTableProps) => {
  const { reports } = props;
  const classes = useStyles();
  const [order, setOrder] = React.useState<ArrangementOrder>('asc');
  const [orderBy, setOrderBy] = React.useState(headCells[0].id);

  const handleRequestSort = (event: React.SyntheticEvent, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <>
      <TableContainer>
        <Table className={classes.table}>
          <EnhancedTableHead
            headCells={headCells}
            numSelected={0}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={reports.length}
          />
          <TableBody>
            {reports.map((report: CampaignReport) => (
              <CampaignRow report={report} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CampaignsTable;
