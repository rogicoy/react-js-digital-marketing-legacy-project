/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { IconPhoto, IconDashboard, IconCalendar, IconDeviceAnalytics } from '@tabler/icons';

const makeMainMenu = () => ({
  id: 'main-menu',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'My Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'gallery',
      title: 'Content Manager',
      type: 'item',
      url: '/gallery',
      icon: IconPhoto,
      breadcrumbs: false
    },
    {
      id: 'scheduler',
      title: 'Content Scheduler',
      type: 'item',
      url: '/scheduler',
      icon: IconCalendar,
      breadcrumbs: false
    },

    {
      id: 'insights',
      title: 'Organic Insights',
      type: 'item',
      url: '/insights',
      icon: IconDeviceAnalytics,
      breadcrumbs: false
    }
  ]
});

export default makeMainMenu;
