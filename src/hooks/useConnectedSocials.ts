/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { useCallback, useEffect, useState } from 'react';
import { IFbPageDetails, IIgPageDetails, ILiPageDetails, ITwPageDetails, ISocialMenuScheduler } from 'types';

// grapqhl
import { useLazyQuery } from '@apollo/client';
import gql from 'store/account/socials/gql';

// assets
import FbIcon from 'assets/images/icons/fb.png';
import IgIcon from 'assets/images/icons/ig.png';
import TwIcon from 'assets/images/icons/tw.png';
import LiIcon from 'assets/images/icons/li.png';

const useConnectedSocials = (): {
  menuItems: ISocialMenuScheduler[];
  checkSocials: boolean;
  isLoading: boolean;
  getMenuItems: () => void;
} => {
  // states
  const [checkSocials, setCheckSocials] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<ISocialMenuScheduler[]>([
    {
      id: '',
      label: '',
      social: 'instagram',
      socialId: '',
      socialPic: '',
      icon: IgIcon,
      order: 1,
      disabled: true
    },
    {
      id: '',
      label: '',
      social: 'facebook',
      socialId: '',
      socialPic: '',
      icon: FbIcon,
      order: 2,
      disabled: true
    },
    {
      id: '',
      label: '',
      social: 'twitter',
      socialId: '',
      socialPic: '',
      icon: TwIcon,
      order: 3,
      disabled: true
    },
    {
      id: '',
      label: '',
      social: 'linkedin',
      socialId: '',
      socialPic: '',
      icon: LiIcon,
      order: 4,
      disabled: true
    }
  ]);

  // query
  const {
    query: { instagramPageDetails, facebookPageDetails, twitterPageDetails, linkedinPageDetails }
  } = gql;

  const [getIgData, { data: igPageData, loading: igLoading }] = useLazyQuery<{
    instagramPageReport: IIgPageDetails;
  }>(instagramPageDetails, {
    fetchPolicy: 'network-only'
  });
  const igPageDetails = igPageData?.instagramPageReport;

  const [getFbData, { data: fbPageData, loading: fbLoading }] = useLazyQuery<{
    facebookPageReport: IFbPageDetails;
  }>(facebookPageDetails, {
    fetchPolicy: 'network-only'
  });
  const fbPageDetails = fbPageData?.facebookPageReport;

  const [getTwData, { data: twPageData, loading: twLoading }] = useLazyQuery<{
    twitterConnection: ITwPageDetails;
  }>(twitterPageDetails, {
    fetchPolicy: 'network-only',
    variables: {
      type: 'scheduler'
    }
  });
  const twPageDetails = twPageData?.twitterConnection;

  const [getLiData, { data: liPageData, loading: liLoading }] = useLazyQuery<{
    linkedinPageReport: ILiPageDetails;
  }>(linkedinPageDetails, {
    fetchPolicy: 'network-only'
  });
  const liPageDetails = liPageData?.linkedinPageReport;

  // ig page details
  useEffect(() => {
    if (igPageDetails) {
      const items = [...menuItems];
      const findIndex = items.findIndex((item: ISocialMenuScheduler) => item.social === 'instagram');
      const igObj: ISocialMenuScheduler = {
        ...items[findIndex],
        id: igPageDetails.id,
        label: igPageDetails.name,
        socialId: igPageDetails.id,
        socialPic: igPageDetails.profile,
        disabled: false
      };

      items[findIndex] = igObj;
      setCheckSocials(true);
      setMenuItems(items);
    }
  }, [igPageDetails]);

  // fb page details
  useEffect(() => {
    if (fbPageDetails) {
      const items = [...menuItems];
      const findIndex = items.findIndex((item: ISocialMenuScheduler) => item.social === 'facebook');
      const fbObj: ISocialMenuScheduler = {
        ...items[findIndex],
        id: fbPageDetails.id,
        label: fbPageDetails.name,
        socialId: fbPageDetails.id,
        socialPic: fbPageDetails.profile,
        disabled: false
      };

      items[findIndex] = fbObj;
      setCheckSocials(true);
      setMenuItems(items);
    }
  }, [fbPageDetails]);

  // twitter page details
  useEffect(() => {
    if (twPageDetails) {
      const items = [...menuItems];
      const findIndex = items.findIndex((item: ISocialMenuScheduler) => item.social === 'twitter');
      const twObj: ISocialMenuScheduler = {
        ...items[findIndex],
        id: twPageDetails.id,
        label: twPageDetails.username,
        socialId: twPageDetails.id,
        socialPic: twPageDetails.profilePic,
        disabled: false
      };

      items[findIndex] = twObj;
      setCheckSocials(true);
      setMenuItems(items);
    }
  }, [twPageDetails]);

  // linkedin page details
  useEffect(() => {
    if (liPageDetails) {
      const items = [...menuItems];
      const findIndex = items.findIndex((item: ISocialMenuScheduler) => item.social === 'linkedin');
      const liObj: ISocialMenuScheduler = {
        ...items[findIndex],
        id: liPageDetails.id,
        label: liPageDetails.name,
        socialId: liPageDetails.id,
        socialPic: liPageDetails.profile,
        disabled: false
      };

      items[findIndex] = liObj;
      setCheckSocials(true);
      setMenuItems(items);
    }
  }, [liPageDetails]);

  const getMenuItems = useCallback(async () => {
    await getIgData();
    await getFbData();
    await getTwData();
    await getLiData();
  }, []);

  return {
    menuItems,
    checkSocials,
    isLoading: igLoading || fbLoading || twLoading || liLoading,
    getMenuItems
  };
};

export default useConnectedSocials;
