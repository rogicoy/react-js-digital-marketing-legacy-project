/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React from 'react';
import { useQuery } from '@apollo/client';
import { format } from 'date-fns';
import gql from 'store/insights/gql';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Table, TableBody, TableCell, TableContainer, TableRow, Typography, Box, Theme, TablePagination } from '@material-ui/core';
import { IDateRange } from 'ui-component/date-range-picker';

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
    id: 'Post',
    label: 'Post'
  },
  {
    id: 'Impressions',
    label: 'Impressions'
  },
  {
    id: 'Shares',
    label: 'Shares'
  },
  {
    id: 'Comments',
    label: 'Comments'
  },
  {
    id: 'Reactions',
    label: 'Reactions'
  },
  {
    id: 'Clicks',
    label: 'Clicks'
  },
  {
    id: 'CTR',
    label: 'CTR'
  },
  {
    id: 'Engagement Rate',
    label: 'Engagement Rate'
  }
];

// table data
const rows = [
  {
    id: 1,
    postDescription:
      'Here is a post with a really long caption and maybe there are some hashtags. In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.',
    postDate: '7th Sep 2021',
    engagement: 243,
    impressions: 544,
    shares: 423,
    reactions: 43,
    comments: 35,
    clicks: 53,
    ctr: 45
  },
  {
    id: 2,
    postDescription:
      'Here is a post with a really long caption and maybe there are some hashtags. In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.',
    postDate: '7th Sep 2021',
    engagement: 243,
    impressions: 544,
    shares: 423,
    reactions: 43,
    comments: 35,
    clicks: 53,
    ctr: 22
  },
  {
    id: 3,
    postDescription:
      'Here is a post with a really long caption and maybe there are some hashtags. In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.',
    postDate: '7th Sep 2021',
    engagement: 243,
    impressions: 544,
    shares: 423,
    reactions: 43,
    comments: 35,
    clicks: 53,
    ctr: 11
  }
];

// ==============================|| TABLE - BASIC ||============================== //
interface IPostsTable {
  dateRange?: IDateRange;
}

const PostsTable = ({ dateRange }: IPostsTable) => {
  console.log(dateRange);
  const classes = useStyles();
  const [order, setOrder] = React.useState<ArrangementOrder>('asc');
  const [orderBy, setOrderBy] = React.useState(headCells[0].id);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const {
    query: { getLinkedInUpdates }
  } = gql;
  const { data: linkedInUpdatesData, loading: linkedInUpdatesLoading } = useQuery(getLinkedInUpdates, {
    fetchPolicy: 'network-only',
    variables: {
      dateStart: dateRange?.from ? format(dateRange?.from, 'yyyy-MM-dd') : null,
      dateEnd: dateRange?.to ? format(dateRange?.to, 'yyyy-MM-dd') : null
    }
  });

  console.log(linkedInUpdatesData?.linkedinOrganicInsights);

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
            {linkedInUpdatesData?.linkedinOrganicInsights?.length > 0 &&
              linkedInUpdatesData?.linkedinOrganicInsights?.map((row: any) => (
                <TableRow hover key={row.id}>
                  <TableCell>
                    <Box className={classes.blackBox}>
                      <img
                        style={{ marginLeft: 5, objectFit: 'cover' }}
                        width={60}
                        height={60}
                        src={row.thumbnail}
                        alt={row.caption || ''}
                      />
                      <Box sx={{ ml: 2 }}>
                        <Typography gutterBottom sx={{ fontWeight: 'bold' }}>
                          {row.postDate}
                        </Typography>
                        <Typography className={classes.description}>{row.caption || ''}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{row.impressionCount || 0}</TableCell>
                  <TableCell>{row.shareCount || 0}</TableCell>
                  <TableCell>{row.commentCount || 0}</TableCell>
                  <TableCell>{row.reactionCount || 0}</TableCell>
                  <TableCell>{row.clickCount || 0}</TableCell>
                  <TableCell>{row.ctrCount || 0}</TableCell>
                  <TableCell>{row.engagementRateCount || 0}</TableCell>
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
};

export default PostsTable;
