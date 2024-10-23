/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Table, TableBody, TableCell, TableContainer, TableRow, Box, Grid, Theme, TablePagination } from '@material-ui/core';

// project imports
import { ArrangementOrder, HeadCell } from 'types';
import EnhancedTableHead from 'ui-component/extended/EnhancedTableHead';

// style constant
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
    id: 'Hashtag',
    label: 'Hashtag'
  },
  {
    id: 'Post Count',
    label: 'Post Count'
  },
  {
    id: 'Recent Posts',
    label: 'Recent Posts'
  },
  {
    id: 'Average Impressions',
    label: 'Average Impressions'
  },
  {
    id: 'Avearage Reach',
    label: 'Avearage Reach'
  },
  {
    id: 'Average Likes',
    label: 'Average Likes'
  },
  {
    id: 'Average Comments',
    label: 'Average Comments'
  },
  {
    id: 'Average Saves',
    label: 'Average Saves'
  }
];

// table data
const rows = [
  {
    id: 1,
    hashtag: '#myhashtag1',
    postCount: 6,
    recentPosts: [1, 2, 3, 4],
    averageImpressions: 43,
    averageReach: 143,
    averageLikes: 343,
    averageComments: 243,
    averageSaves: 132
  },
  {
    id: 2,
    hashtag: '#myhashtag2',
    postCount: 6,
    recentPosts: [1, 2, 3],
    averageImpressions: 43,
    averageReach: 143,
    averageLikes: 343,
    averageComments: 243,
    averageSaves: 132
  },
  {
    id: 3,
    hashtag: '#myhashtag3',
    postCount: 6,
    recentPosts: [1, 2],
    averageImpressions: 43,
    averageReach: 143,
    averageLikes: 343,
    averageComments: 243,
    averageSaves: 132
  },
  {
    id: 4,
    hashtag: '#myhashtag4',
    postCount: 6,
    recentPosts: [1, 2, 3, 4],
    averageImpressions: 43,
    averageReach: 143,
    averageLikes: 343,
    averageComments: 243,
    averageSaves: 132
  }
];

export default function HashTagsTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState<ArrangementOrder>('asc');
  const [orderBy, setOrderBy] = React.useState(headCells[0].id);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
            rowCount={rows.length}
          />
          <TableBody>
            {rows.map((row) => (
              <TableRow hover key={row.id}>
                <TableCell>
                  <Box className={classes.blackBox} sx={{ fontWeight: 'bold' }}>
                    {row.hashtag}
                  </Box>
                </TableCell>
                <TableCell>{row.postCount}</TableCell>
                <TableCell>
                  <Grid container spacing={1} sx={{ width: 300 }}>
                    {row.recentPosts.map((item, index) => (
                      <Grid item key={index}>
                        <img width={60} height={60} src={`https://removed`} alt={row.hashtag} />
                      </Grid>
                    ))}
                  </Grid>
                </TableCell>
                <TableCell>{row.averageImpressions}</TableCell>
                <TableCell>{row.averageReach}</TableCell>
                <TableCell>{row.averageLikes}</TableCell>
                <TableCell>{row.averageComments}</TableCell>
                <TableCell>{row.averageSaves}</TableCell>
              </TableRow>
            ))}
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
}
