/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { useMemo, useState } from 'react';
import { format } from 'date-fns';
import { IPostPerformance } from './interface';

// grapqhl
import { useQuery } from '@apollo/client';
import gql from 'store/insights/gql';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Table, TableBody, TableCell, TableContainer, TableRow, Typography, Box, Theme, TablePagination } from '@material-ui/core';

// project imports
import { ArrangementOrder, HeadCell } from 'types';
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
      color: theme.palette.grey[500]
    }
  },
  description: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
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
    id: 'message',
    label: 'Post Caption'
  },
  {
    id: 'reach',
    label: 'Reach'
  },
  {
    id: 'engagement',
    label: 'Engagement'
  },
  {
    id: 'reactions',
    label: 'Total Reactions'
  },
  {
    id: 'clicks',
    label: 'Link Clicks'
  }
];

// ==============================|| TABLE - BASIC ||============================== //

const PostsTable = () => {
  // styles
  const classes = useStyles();

  // query
  const {
    query: { facebookPostPerformance }
  } = gql;

  const { data: postData, loading } = useQuery<{
    facebookPostPerformance: {
      data: Array<IPostPerformance>;
    };
  }>(facebookPostPerformance, {
    fetchPolicy: 'network-only'
  });
  const postDataDetails = postData?.facebookPostPerformance;

  // states
  const [order, setOrder] = useState<ArrangementOrder>('asc');
  const [orderBy, setOrderBy] = useState(headCells[0].id);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

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
    let postPerformance: Array<IPostPerformance> = [];

    if (postDataDetails?.data && postDataDetails !== null) {
      const p = page + 1;
      const a = (p - 1) * rowsPerPage;
      const b = p * rowsPerPage;
      postPerformance = postDataDetails.data.slice(a < 0 ? 0 : a, b <= 0 ? rowsPerPage : b);
    }

    return postPerformance;
  }, [postDataDetails, page, rowsPerPage, orderBy]);

  if (loading) return <PerformanceTableCard columns={4} />;

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
            {memoPostPerformance.map((item: IPostPerformance) => (
              <TableRow hover key={item.id}>
                <TableCell>
                  <Box className={classes.blackBox}>
                    <Box>
                      {item.fullPicture ? (
                        <img
                          style={{ marginLeft: 5, objectFit: 'cover' }}
                          width={60}
                          height={60}
                          src={item.fullPicture}
                          alt={item.fullPicture}
                        />
                      ) : (
                        <Box style={{ marginLeft: 5 }} width={60} height={60} className={classes.noImgBox}>
                          No image available
                        </Box>
                      )}
                    </Box>
                    <Box flexGrow={1} sx={{ ml: 2 }}>
                      <Typography gutterBottom sx={{ fontWeight: 'bold' }}>
                        {format(new Date(item.createdTime), 'do LLLL YYY')}
                      </Typography>
                      <Typography className={classes.description}>{item.message || '-'}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{item.reach}</TableCell>
                <TableCell>{item.engagement}</TableCell>
                <TableCell>{item.reactions}</TableCell>
                <TableCell>{item.clicks}</TableCell>
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

export default PostsTable;
