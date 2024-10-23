/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { IconAd2, IconAd, IconReport, IconList, IconBolt } from '@tabler/icons';

const makeAdsMenu = () => ({
  id: 'ads-menu',
  type: 'group',
  children: [
    {
      id: 'ads-menu-items',
      title: 'Ads Wizard',
      type: 'collapse',
      icon: IconBolt,
      children: [
        {
          id: 'ads-create',
          title: 'Create New Ad',
          type: 'item',
          icon: IconAd2,
          url: '/ads/create',
          breadcrumbs: false
        },
        {
          id: 'ads-campaigns',
          title: 'Campaigns',
          type: 'item',
          icon: IconAd,
          url: '/ads/campaigns',
          breadcrumbs: false
        },

        {
          id: 'ads-leads',
          title: 'Leads',
          type: 'item',
          url: '/ads/leads',
          icon: IconList,
          breadcrumbs: false
        },

        {
          id: 'ads-reports',
          title: 'Reports',
          type: 'item',
          icon: IconReport,
          url: '/ads/reports',
          breadcrumbs: false
        }
      ]
    }
  ]
});

export default makeAdsMenu;
