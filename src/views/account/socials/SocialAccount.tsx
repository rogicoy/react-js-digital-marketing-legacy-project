/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { useState, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router';

import gql from 'store/account/socials/gql';
import config from 'config';
import SocialAccountCard, { SocialAccountCardProps } from 'ui-component/cards/SocialAccountCard';
import ConnectDialog from './ConnectDialog';
import ConnectMindbodyInput from './ConnectMindbodyInput';
import { ISocialEnum } from 'types';

const SocialAccount: React.FC<SocialAccountCardProps> = (props) => {
  const { name, type, imgSrc, children } = props;
  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  const [connectDialogVisible, setConnectDialogVisible] = useState(false);
  const [connectMindbodyVisible, setConnectMindbodyVisible] = useState(false);

  let listQuery: any;
  let pagesQuery: any;

  switch (type) {
    case 'facebookPage':
      listQuery = gql.query.facebookPage;
      pagesQuery = gql.query.pages;
      break;
    case 'facebookAds':
      listQuery = gql.query.facebookAds;
      pagesQuery = gql.query.adAccounts;
      break;
    case 'linkedin':
      listQuery = gql.query.linkedinAccount;
      pagesQuery = gql.query.adAccounts;
      break;
    case 'twitterScheduler':
    case 'twitterAnalytics':
      listQuery = gql.query.twitterConnection;
      pagesQuery = gql.query.twitterConnection;
      break;
    case 'instagram':
      listQuery = gql.query.instagramConnection;
      pagesQuery = gql.query.instagramPages;
      break;
    case 'googleAds':
      listQuery = gql.query.googleConnection;
      pagesQuery = gql.query.googleConnection;
      break;
    case 'mindbody':
      listQuery = gql.query.mindbodyConnection;
      pagesQuery = gql.query.mindbodyConnection;
      break;
    default:
      break;
  }

  const [getListLazy, { data: listData, loading: listLoading, error: listError }] = useLazyQuery(listQuery, {
    fetchPolicy: 'network-only'
  });
  const listObject =
    listData?.facebookPage ||
    listData?.facebookAds ||
    listData?.linkedinAccount ||
    listData?.instagramConnection ||
    listData?.twitterConnection ||
    listData?.googleConnection ||
    listData?.mindbodyConnection;

  const activePageId = listObject?.activeId || listObject?.page?.id;

  const [getPagesLazy, { data: pagesData, loading: pagesLoading }] = useLazyQuery(pagesQuery, { fetchPolicy: 'network-only' });
  const pagesArray = pagesData?.pages?.data || pagesData?.adAccounts?.data || pagesData?.instagramPages?.data || [];

  const fetchList = () => {
    switch (type) {
      case 'twitterScheduler':
        getListLazy({
          variables: { type: 'scheduler' }
        });
        break;
      case 'twitterAnalytics':
        getListLazy({
          variables: { type: 'analytics' }
        });
        break;
      default:
        getListLazy();
        break;
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    showDialogFromQueryParams();
  }, [listData, search]);

  useEffect(() => {
    if (connectDialogVisible || connectMindbodyVisible) {
      navigate(pathname);
    }
  }, [connectDialogVisible, connectMindbodyVisible]);

  const handleEnableCompleted = () => {
    setConnectDialogVisible(false);
    fetchList();
  };

  const handleDisconnectCompleted = () => {
    setConnectDialogVisible(false);
    fetchList();
  };

  const handleLoginMindbodyCompleted = () => {
    getListLazy();
    setConnectMindbodyVisible(false);
  };

  const [enablePage] = useMutation(gql.mutation.enablePage, {
    onCompleted: handleEnableCompleted
  });

  const [enableAdAccount] = useMutation(gql.mutation.enableAdAccount, {
    onCompleted: handleEnableCompleted
  });

  const [instagramEnablePage] = useMutation(gql.mutation.instagramEnablePage, {
    onCompleted: handleEnableCompleted
  });

  const [disconnectSocialAccount, { loading: disconnectLoading }] = useMutation<any, { provider: ISocialEnum }>(
    gql.mutation.disconnectSocialAccount,
    {
      fetchPolicy: 'network-only',
      onCompleted: handleDisconnectCompleted
    }
  );
  const [mindbodyLogin, { loading: mindbodyLoginLoading }] = useMutation<any>(gql.mutation.mindbodyLogin, {
    fetchPolicy: 'network-only',
    onCompleted: handleLoginMindbodyCompleted
  });

  let connectedProps: any = {};

  if (listObject) {
    connectedProps = {
      variant: 'connected',
      activeName: listObject?.activeName,
      imgSrc
    };
    switch (type) {
      case 'facebookPage':
        connectedProps.description =
          listObject?.count > 1
            ? `Connected to ${listObject?.fbName}'s profile, which has ${listObject?.count} pages.`
            : `Connected to ${listObject?.fbName}'s profile.`;
        break;
      case 'facebookAds':
        connectedProps.description =
          listObject?.count > 1
            ? `Connected to ${listObject?.fbName}'s profile, which has ${listObject?.count} ad accounts.`
            : `Connected to ${listObject?.fbName}'s profile.`;
        break;
      case 'linkedin':
        connectedProps.activeName = `${listObject?.firstName} ${listObject?.lastName}`;
        connectedProps.description =
          listObject?.count > 1
            ? `Connected to ${listObject?.firstName} ${listObject?.lastName}'s Linkedin account, which has ${listObject?.count} profile.`
            : `Connected to ${listObject?.firstName} ${listObject?.lastName}'s Linkedin account.`;
        break;
      case 'twitterScheduler':
      case 'twitterAnalytics':
        connectedProps.activeName = `@${listObject?.username}`;
        connectedProps.description =
          listObject?.count > 1
            ? `Connected to ${listObject?.name}'s profile, which has ${listObject?.count} twitter account.`
            : `Connected to ${listObject?.name}'s profile.`;
        break;
      case 'instagram':
        connectedProps.activeName = listObject?.page?.name;
        connectedProps.description =
          listObject?.pagesCount > 1
            ? `Connected to ${listObject?.instagram?.name}'s profile, which has ${listObject?.pagesCount} instagram accounts.`
            : `Connected to ${listObject?.instagram?.name}'s profile.`;
        break;
      case 'googleAds':
        connectedProps.activeName = listObject?.name;
        connectedProps.description =
          listObject?.count > 1
            ? `Connected to ${listObject?.name}'s profile, which has ${listObject?.count} Google Ads account.`
            : `Connected to ${listObject?.name}'s profile.`;
        break;
      case 'mindbody':
        connectedProps.activeName = listObject?.name;
        connectedProps.description =
          listObject?.count > 1
            ? `Connected to ${listObject?.name}'s account, which has ${listObject?.count} lists.`
            : `Connected to ${listObject?.name}'s account.`;
        break;
      default:
        break;
    }
  }

  const handleShowDialog = () => {
    setConnectDialogVisible(true);
    switch (type) {
      case 'facebookPage':
      case 'facebookAds':
      case 'linkedin':
      case 'instagram':
        getPagesLazy({
          variables: {
            socialConnectionId: listObject?.id
          }
        });
        break;
      case 'twitterScheduler':
      case 'twitterAnalytics':
        break;
      default:
        break;
    }
  };

  const handleCloseDialog = (object?: any) => {
    if (object) {
      switch (type) {
        case 'facebookPage':
          enablePage({
            variables: {
              input: {
                socialConnectionId: listObject?.id,
                pageId: object?.value,
                pageName: object?.label,
                token: object?.meta?.access_token
              }
            }
          });
          break;
        case 'facebookAds':
          enableAdAccount({
            variables: {
              input: {
                socialConnectionId: listObject?.id,
                adAccountId: object?.value,
                adAccountName: object?.label
              }
            }
          });
          break;
        case 'instagram':
          instagramEnablePage({
            variables: {
              input: {
                socialConnectionId: listObject?.id,
                pageId: object?.value,
                pageName: object?.label,
                token: object?.meta?.access_token
              }
            }
          });
          break;
        default:
          break;
      }
    }
    setConnectDialogVisible(false);
  };

  const handleConnect = () => {
    if (listObject) {
      handleShowDialog();
      return;
    }
    const serviceToken = window.localStorage.getItem('serviceToken');
    switch (type) {
      case 'facebookAds':
        window.open(`${config.apiUrl}/auth/${serviceToken}/facebookads`);
        break;
      case 'facebookPage':
        window.open(`${config.apiUrl}/auth/${serviceToken}/facebookpage`);
        break;
      case 'linkedin':
        window.open(`${config.apiUrl}/auth/${serviceToken}/linkedin`);
        break;
      case 'instagram':
        window.open(`${config.apiUrl}/auth/${serviceToken}/instagram`);
        break;
      case 'twitterScheduler':
        window.open(`${config.apiUrl}/auth/${serviceToken}/twitterscheduler`);
        break;
      case 'twitterAnalytics':
        window.open(`${config.apiUrl}/auth/${serviceToken}/twitter`);
        break;
      case 'googleAds':
        window.open(`${config.apiUrl}/auth/${serviceToken}/google`);
        break;
      case 'mindbody':
        setConnectMindbodyVisible(true);
        break;
      default:
        break;
    }
  };

  const handleDisconnect = () => {
    let provider;
    switch (type) {
      case 'facebookAds':
        provider = ISocialEnum.FACEBOOKADS;
        break;
      case 'facebookPage':
        provider = ISocialEnum.FACEBOOKPAGE;
        break;
      case 'linkedin':
        provider = ISocialEnum.LINKEDIN;
        break;
      case 'instagram':
        provider = ISocialEnum.INSTAGRAM;
        break;
      case 'twitterScheduler':
        provider = ISocialEnum.TWITTERSCHEDULER;
        break;
      case 'twitterAnalytics':
        provider = ISocialEnum.TWITTER;
        break;
      case 'googleAds':
        provider = ISocialEnum.GOOGLE;
        break;
      case 'mindbody':
        provider = ISocialEnum.MINDBODY;
        break;
      default:
        break;
    }
    if (provider) {
      disconnectSocialAccount({
        variables: {
          provider
        }
      });
    }
  };

  const showDialogFromQueryParams = () => {
    if (listObject && search.includes(`modal=${type}`.toLowerCase())) {
      handleShowDialog();
    }
  };

  const handleConnectMindbody = (values: { siteId: number; username: string; password: string }) => {
    mindbodyLogin({
      variables: values
    });
  };

  const handleCloseMindbody = () => {
    setConnectMindbodyVisible(false);
  };

  const element = (
    <>
      <SocialAccountCard {...props} {...connectedProps} loading={listLoading} error={listError} onConnect={handleConnect} />
      <ConnectDialog
        keepMounted
        isLoading={pagesLoading}
        title={name}
        open={connectDialogVisible}
        data={{ ...listObject, pages: pagesArray, value: activePageId, disconnectLoading, type }}
        onClose={handleCloseDialog}
        onDisconnect={handleDisconnect}
      />
      <ConnectMindbodyInput
        keepMounted
        isLoading={mindbodyLoginLoading}
        open={connectMindbodyVisible}
        onClose={handleCloseMindbody}
        onConnect={handleConnectMindbody}
      />
    </>
  );

  if (typeof children === 'function') {
    const connected = connectedProps.variant === 'connected';
    return children({ connected, element });
  }

  return element;
};

export default SocialAccount;
