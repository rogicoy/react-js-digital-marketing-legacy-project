/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { useMemo, useState } from 'react';
import { format } from 'date-fns';
import { IIgStoryPerformance } from 'views/insights/interface';
import { ArrangementOrder, HeadCell } from 'types';

// grapqhl
import { useQuery } from '@apollo/client';
import gql from 'store/insights/gql';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Table, TableBody, TableCell, TableContainer, TableRow, Typography, Box, Theme, TablePagination } from '@material-ui/core';

// components
import EnhancedTableHead from 'ui-component/extended/EnhancedTableHead';
import PerformanceTableCard from 'ui-component/cards/Skeleton/PerformanceTableCard';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: 350,
    '& tr > th:first-child, tr > td:first-child': {
      paddingLeft: 0
    },
    '& td': {
      minWidth: 110,
      verticalAlign: 'top',
      color: theme.palette.grey[500]
    }
  },
  blackBox: {
    display: 'flex',
    alignItems: 'flex-start',
    color: theme.palette.text.primary
  },
  noImgBox: {
    background: '#e1e1e1',
    textAlign: 'center',
    padding: '10px 5px',
    fontSize: '9px',
    textTransform: 'uppercase',
    lineHeight: '1.5'
  }
}));

// table header
const headCells: HeadCell[] = [
  {
    id: 'Story',
    label: 'Story'
  },
  {
    id: 'Impressions',
    label: 'Impressions'
  },
  {
    id: 'Reach',
    label: 'Reach'
  },
  {
    id: 'Replies',
    label: 'Replies'
  },
  {
    id: 'Back',
    label: 'Back'
  },
  {
    id: 'Forward',
    label: 'Forward'
  },
  {
    id: 'Exited Views',
    label: 'Exited Views'
  },
  {
    id: 'Completion Rate',
    label: 'Completion Rate'
  },
  {
    id: 'Ave. views per users',
    label: 'Ave. views per users'
  }
];

// ==============================|| TABLE - BASIC ||============================== //

const StoriesTable = () => {
  const classes = useStyles();

  // query
  const {
    query: { instagramStoryPerformance }
  } = gql;

  const { data: postData, loading } = useQuery<{
    instagramStoryPerformance: {
      data: IIgStoryPerformance[];
    };
  }>(instagramStoryPerformance, {
    fetchPolicy: 'network-only'
  });
  const postDataDetails = postData?.instagramStoryPerformance;

  // states
  const [order, setOrder] = useState<ArrangementOrder>('asc');
  const [orderBy, setOrderBy] = useState(headCells[0].id);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const memoPostPerformance = useMemo(() => {
    let postPerformance: IIgStoryPerformance[] = [];

    if (postDataDetails?.data && postDataDetails !== null) {
      const p = page + 1;
      const a = (p - 1) * rowsPerPage;
      const b = p * rowsPerPage;
      postPerformance = postDataDetails.data.slice(a < 0 ? 0 : a, b <= 0 ? rowsPerPage : b);
    }

    return postPerformance;
  }, [postDataDetails, page, rowsPerPage, orderBy]);

  if (loading) return <PerformanceTableCard columns={8} />;

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
            rowCount={memoPostPerformance.length}
          />
          <TableBody>
            {memoPostPerformance.map((item: IIgStoryPerformance) => (
              <TableRow hover key={item.id}>
                <TableCell>
                  <Box className={classes.blackBox}>
                    <Box>
                      {item.url ? (
                        <img
                          style={{ marginLeft: 5, objectFit: 'cover' }}
                          width={70}
                          height={120}
                          src={item.url}
                          alt={item.url}
                          onError={(ev) => console.log(ev)}
                        />
                      ) : (
                        <Box style={{ marginLeft: 5, objectFit: 'cover' }} width={70} height={120} className={classes.noImgBox}>
                          No image available
                        </Box>
                      )}
                    </Box>
                    <Box flexGrow={1} sx={{ ml: 2, whiteSpace: 'nowrap' }}>
                      <Typography gutterBottom sx={{ fontWeight: 'bold' }}>
                        {format(new Date(item.createdAt), 'do LLLL YYY')}
                      </Typography>
                      <Typography> {format(new Date(item.createdAt), 'hh.mm aaaa')}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{item.impression}</TableCell>
                <TableCell>{item.reach}</TableCell>
                <TableCell>{item.replies}</TableCell>
                <TableCell>{item.back}</TableCell>
                <TableCell>{item.forward}</TableCell>
                <TableCell>{item.exits}</TableCell>
                <TableCell>50</TableCell>
                <TableCell>50</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={postDataDetails?.data && postDataDetails !== null ? postDataDetails.data.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default StoriesTable;
