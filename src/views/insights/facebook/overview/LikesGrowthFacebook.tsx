/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useMemo } from 'react';
import { format } from 'date-fns';
import { IFacebookPage } from 'views/insights/interface';

// graphql
import gql from 'store/insights/gql';
import { useQuery } from '@apollo/client';

// components
import FollowerGrowth from 'views/common/components/FollowerGrowth';

const LikeGrowthFacebook: FC = () => {
  // gql
  const {
    query: { facebookPageReport }
  } = gql;
  const { data: fbData } = useQuery<{
    facebookPageReport: IFacebookPage;
  }>(facebookPageReport, {
    fetchPolicy: 'network-only'
  });
  const fbReportData = fbData?.facebookPageReport;

  const memoGrowth = useMemo(() => {
    let data: number[] = [];
    let labels: string[] = [];

    fbReportData?.report.forEach((e: { count: number; date: any }) => {
      const [yyyy, mm, dd] = e.date.split('-');
      const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
      const formattedDate = format(date, 'dd LLL yy');

      data = [...data, e.count];
      labels = [...labels, formattedDate];
    });

    return {
      data,
      labels
    };
  }, [fbReportData]);

  return <FollowerGrowth totalFollowers={fbReportData?.likeCount} data={memoGrowth.data} labels={memoGrowth.labels} title="Page likes" />;
};

export default LikeGrowthFacebook;
