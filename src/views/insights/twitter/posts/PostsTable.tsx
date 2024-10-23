/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { useEffect } from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Table, TableBody, TableCell, TableContainer, TableRow, Typography, Box, Theme, TablePagination } from '@material-ui/core';

// project imports
import { ArrangementOrder, HeadCell } from 'types';
import EnhancedTableHead from 'ui-component/extended/EnhancedTableHead';
import gql from 'store/insights/gql';
import { useLazyQuery } from '@apollo/client';
import { format } from 'date-fns';

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
  }
}));

// table header
const headCells: HeadCell[] = [
  {
    id: 'Tweet',
    label: 'Tweet'
  },
  {
    id: 'Likes',
    label: 'Likes'
  },
  {
    id: 'Retweets',
    label: 'Retweets'
  },
  // {
  //   id: 'Detail Expands',
  //   label: 'Detail Expands'
  // },
  {
    id: 'Link Clicks',
    label: 'Link Clicks'
  },
  {
    id: 'Profile Clicks',
    label: 'Profile Clicks'
  },
  {
    id: 'Impressions',
    label: 'Impressions'
  },
  {
    id: 'Total Engagement',
    label: 'Total Engagement'
  }
];
interface ITableRow {
  id: string;
  caption: string;
  link: string;
  url: string;
  retweetCount: string;
  replyCount: string;
  likeCount: string;
  linkClickCount: string;
  profileClickCount: string;
  impressionCount: string;
  engagementCount: string;
  postDate: string;
}

export default function PostsTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState<ArrangementOrder>('asc');
  const [orderBy, setOrderBy] = React.useState(headCells[0].id);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const [getTwitterTweetsLazy, { data: twitterTweetsData }] = useLazyQuery(gql.query.twitterTweets, {
    fetchPolicy: 'network-only'
  });
  const twitterTweets = twitterTweetsData?.twitterTweets;
  const rows: ITableRow[] = twitterTweets?.data || [];

  useEffect(() => {
    getTwitterTweetsLazy({
      variables: {
        input: {
          order: 'postDate',
          limit: 100
        }
      }
    });
  }, []);

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
            {rows.map((row: ITableRow) => (
              <TableRow hover key={row.id}>
                <TableCell>
                  <Box className={classes.blackBox}>
                    <Box sx={{ ml: 2 }}>
                      <Typography gutterBottom sx={{ fontWeight: 'bold' }}>
                        {format(new Date(row.postDate), 'do LLL yyy')}
                      </Typography>
                      <Typography className={classes.description}>{row.caption}</Typography>
                    </Box>
                    <img
                      style={{ marginLeft: 5, objectFit: 'cover' }}
                      width={60}
                      height={60}
                      src={`https://removed`}
                      alt={row.caption}
                    />
                  </Box>
                </TableCell>
                <TableCell>{row.likeCount}</TableCell>
                <TableCell>{row.retweetCount}</TableCell>
                <TableCell>{row.linkClickCount}</TableCell>
                <TableCell>{row.profileClickCount}</TableCell>
                <TableCell>{row.impressionCount}</TableCell>
                <TableCell>{row.engagementCount}</TableCell>
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
