/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { IconHelp } from '@tabler/icons';

const makeSupportMenu = () => ({
  id: 'support-menu',
  type: 'group',
  children: [
    {
      id: 'support-menu-items',
      title: 'Support',
      type: 'collapse',
      icon: IconHelp,
      children: [
        {
          id: 'support-faq',
          title: 'Help Center',
          type: 'item',
          url: 'removed',
          breadcrumbs: false,
          external: true,
          target: '_blank'
        },
        {
          id: 'support-tutorials',
          title: 'Video Tutorials',
          type: 'item',
          url: '/support/tutorials',
          breadcrumbs: false
        },
        {
          id: 'support-contact',
          title: 'Contact Support',
          type: 'item',
          url: '/support/contact',
          breadcrumbs: false
        }
      ]
    }
  ]
});

export default makeSupportMenu;
