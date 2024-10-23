/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { ISocialActive } from 'types';

// theme constant
export const gridSpacing = 3;
export const drawerWidth = 260;
export const appDrawerWidth = 320;

export const twitterCharacterLimit = 280;

export const socialColors = {
  facebook: '#1565C0',
  instagram: '#E1306C',
  twitter: '#1DA1F2',
  linkedin: '#2867B2',
  google: '#4285F4'
};

export const socialLightColors = {
  facebook: 'rgba(66, 103, 178, 0.2)',
  instagram: 'rgba(225, 48, 108, 0.2)',
  twitter: 'rgba(29, 161, 242, 0.2)',
  linkedin: 'rgba(40, 103, 178, 0.2)',
  google: 'rgba(66, 133, 244, 0.2)'
};

export const industries: string[] = [
  'Alcohol and Beverage',
  'Auto',
  'Computer and gaming',
  'Consumer Goods',
  'E-Commerce',
  'Education',
  'Fashion and Beauty',
  'Financial Services',
  'FMCG',
  'Food',
  'Government',
  'Health and Fitness',
  'Hospitality',
  'Insurance',
  'Media and Entertainment',
  'Pharmaceutical',
  'Real Estate',
  'Retail',
  'Services',
  'Technology',
  'Telco and Communications',
  'Travel and Tourism'
];

export const referrals: string[] = ['Referral', 'Email', 'Google', 'Facebook', 'Instagram', 'LinkedIn', 'Direct Outreach'];

export const editorWhiteTheme: any = {
  // common
  'common.bisize.width': '251px',
  'common.bisize.height': '21px',
  'common.backgroundColor': '#fff',
  'common.border': '1px solid #c1c1c1',

  // header
  'header.backgroundImage': 'none',
  'header.backgroundColor': 'transparent',
  'header.border': '0px',
  'header.display': 'none',

  // load button
  'loadButton.backgroundColor': '#fff',
  'loadButton.border': '1px solid #ddd',
  'loadButton.color': '#222',
  'loadButton.fontFamily': "'Noto Sans', sans-serif",
  'loadButton.fontSize': '12px',

  // main icons
  'menu.normalIcon.color': '#8a8a8a',
  'menu.activeIcon.color': '#555555',
  'menu.disabledIcon.color': '#434343',
  'menu.hoverIcon.color': '#e9e9e9',
  'menu.iconSize.width': '24px',
  'menu.iconSize.height': '24px',

  // submenu icons
  'submenu.normalIcon.color': '#8a8a8a',
  'submenu.activeIcon.color': '#555555',
  'submenu.iconSize.width': '32px',
  'submenu.iconSize.height': '32px',

  // submenu primary color
  'submenu.backgroundColor': '#ffffff',
  'submenu.partition.color': '#e5e5e5',

  // submenu labels
  'submenu.normalLabel.color': '#858585',
  'submenu.normalLabel.fontWeight': 'normal',
  'submenu.activeLabel.color': '#000',
  'submenu.activeLabel.fontWeight': 'normal',

  // checkbox style
  'checkbox.border': '1px solid #ccc',
  'checkbox.backgroundColor': '#fff',

  // rango style
  'range.pointer.color': '#333',
  'range.bar.color': '#ccc',
  'range.subbar.color': '#606060',
  'range.disabledPointer.color': '#d3d3d3',
  'range.disabledBar.color': 'rgba(85,85,85,0.06)',
  'range.disabledSubbar.color': 'rgba(51,51,51,0.2)',
  'range.value.color': '#000',
  'range.value.fontWeight': 'normal',
  'range.value.fontSize': '11px',
  'range.value.border': '0',
  'range.value.backgroundColor': '#f5f5f5',
  'range.title.color': '#000',
  'range.title.fontWeight': 'lighter',

  // colorpicker style
  'colorpicker.button.border': '0px',
  'colorpicker.title.color': '#000'
};
export const socialActive: ISocialActive[] = [
  {
    social: 'instagram',
    socialTabs: [
      {
        to: '/insights/instagram/overview',
        label: 'Overview'
      },
      {
        to: '/insights/instagram/posts',
        label: 'Post Performance'
      },
      {
        to: '/insights/instagram/stories',
        label: 'Story Performance'
      }
      // {
      //   to: '/insights/instagram/hashtags',
      //   label: 'Hashtag Performance'
      // }
    ]
  },
  {
    social: 'facebook',
    socialTabs: [
      {
        to: '/insights/facebook/overview',
        label: 'Overview'
      },
      {
        to: '/insights/facebook/posts',
        label: 'Post Performance'
      }
    ]
  },
  {
    social: 'twitter',
    socialTabs: [
      {
        to: '/insights/twitter/overview',
        label: 'Overview'
      },
      {
        to: '/insights/twitter/posts',
        label: 'Twitter Performance'
      }
    ]
  },
  {
    social: 'linkedin',
    socialTabs: [
      {
        to: '/insights/linkedin/overview',
        label: 'Overview'
      },
      {
        to: '/insights/linkedin/posts',
        label: 'Post Performance'
      }
    ]
  }
];

export const countryList = [
  { code: 'AD', value: 'Andorra' },
  { code: 'AE', value: 'United Arab Emirates' },
  { code: 'AF', value: 'Afghanistan' },
  { code: 'AG', value: 'Antigua and Barbuda' },
  { code: 'AI', value: 'Anguilla' },
  { code: 'AL', value: 'Albania' },
  { code: 'AM', value: 'Armenia' },
  { code: 'AO', value: 'Angola' },
  { code: 'AQ', value: 'Antarctica' },
  { code: 'AR', value: 'Argentina' },
  { code: 'AS', value: 'American Samoa' },
  { code: 'AT', value: 'Austria' },
  { code: 'AU', value: 'Australia' },
  { code: 'AW', value: 'Aruba' },
  { code: 'AX', value: 'Åland Islands' },
  { code: 'AZ', value: 'Azerbaijan' },
  { code: 'BA', value: 'Bosnia and Herzegovina' },
  { code: 'BB', value: 'Barbados' },
  { code: 'BD', value: 'Bangladesh' },
  { code: 'BE', value: 'Belgium' },
  { code: 'BF', value: 'Burkina Faso' },
  { code: 'BG', value: 'Bulgaria' },
  { code: 'BH', value: 'Bahrain' },
  { code: 'BI', value: 'Burundi' },
  { code: 'BJ', value: 'Benin' },
  { code: 'BL', value: 'Saint Barthélemy' },
  { code: 'BM', value: 'Bermuda' },
  { code: 'BN', value: 'Brunei Darussalam' },
  { code: 'BO', value: 'Bolivia, Plurinational State of' },
  { code: 'BQ', value: 'Bonaire, Sint Eustatius and Saba' },
  { code: 'BR', value: 'Brazil' },
  { code: 'BS', value: 'Bahamas' },
  { code: 'BT', value: 'Bhutan' },
  { code: 'BV', value: 'Bouvet Island' },
  { code: 'BW', value: 'Botswana' },
  { code: 'BY', value: 'Belarus' },
  { code: 'BZ', value: 'Belize' },
  { code: 'CA', value: 'Canada' },
  { code: 'CC', value: 'Cocos (Keeling) Islands' },
  { code: 'CD', value: 'Congo, Democratic Republic of the' },
  { code: 'CF', value: 'Central African Republic' },
  { code: 'CG', value: 'Congo' },
  { code: 'CH', value: 'Switzerland' },
  { code: 'CI', value: "Côte d'Ivoire" },
  { code: 'CK', value: 'Cook Islands' },
  { code: 'CL', value: 'Chile' },
  { code: 'CM', value: 'Cameroon' },
  { code: 'CN', value: 'China' },
  { code: 'CO', value: 'Colombia' },
  { code: 'CR', value: 'Costa Rica' },
  { code: 'CU', value: 'Cuba' },
  { code: 'CV', value: 'Cabo Verde' },
  { code: 'CW', value: 'Curaçao' },
  { code: 'CX', value: 'Christmas Island' },
  { code: 'CY', value: 'Cyprus' },
  { code: 'CZ', value: 'Czechia' },
  { code: 'DE', value: 'Germany' },
  { code: 'DJ', value: 'Djibouti' },
  { code: 'DK', value: 'Denmark' },
  { code: 'DM', value: 'Dominica' },
  { code: 'DO', value: 'Dominican Republic' },
  { code: 'DZ', value: 'Algeria' },
  { code: 'EC', value: 'Ecuador' },
  { code: 'EE', value: 'Estonia' },
  { code: 'EG', value: 'Egypt' },
  { code: 'EH', value: 'Western Sahara' },
  { code: 'ER', value: 'Eritrea' },
  { code: 'ES', value: 'Spain' },
  { code: 'ET', value: 'Ethiopia' },
  { code: 'FI', value: 'Finland' },
  { code: 'FJ', value: 'Fiji' },
  { code: 'FK', value: 'Falkland Islands (Malvinas)' },
  { code: 'FM', value: 'Micronesia, Federated States of' },
  { code: 'FO', value: 'Faroe Islands' },
  { code: 'FR', value: 'France' },
  { code: 'GA', value: 'Gabon' },
  { code: 'GB', value: 'United Kingdom of Great Britain and Northern Ireland' },
  { code: 'GD', value: 'Grenada' },
  { code: 'GE', value: 'Georgia' },
  { code: 'GF', value: 'French Guiana' },
  { code: 'GG', value: 'Guernsey' },
  { code: 'GH', value: 'Ghana' },
  { code: 'GI', value: 'Gibraltar' },
  { code: 'GL', value: 'Greenland' },
  { code: 'GM', value: 'Gambia' },
  { code: 'GN', value: 'Guinea' },
  { code: 'GP', value: 'Guadeloupe' },
  { code: 'GQ', value: 'Equatorial Guinea' },
  { code: 'GR', value: 'Greece' },
  { code: 'GS', value: 'South Georgia and the South Sandwich Islands' },
  { code: 'GT', value: 'Guatemala' },
  { code: 'GU', value: 'Guam' },
  { code: 'GW', value: 'Guinea-Bissau' },
  { code: 'GY', value: 'Guyana' },
  { code: 'HK', value: 'Hong Kong' },
  { code: 'HM', value: 'Heard Island and McDonald Islands' },
  { code: 'HN', value: 'Honduras' },
  { code: 'HR', value: 'Croatia' },
  { code: 'HT', value: 'Haiti' },
  { code: 'HU', value: 'Hungary' },
  { code: 'ID', value: 'Indonesia' },
  { code: 'IE', value: 'Ireland' },
  { code: 'IL', value: 'Israel' },
  { code: 'IM', value: 'Isle of Man' },
  { code: 'IN', value: 'India' },
  { code: 'IO', value: 'British Indian Ocean Territory' },
  { code: 'IQ', value: 'Iraq' },
  { code: 'IR', value: 'Iran, Islamic Republic of' },
  { code: 'IS', value: 'Iceland' },
  { code: 'IT', value: 'Italy' },
  { code: 'JE', value: 'Jersey' },
  { code: 'JM', value: 'Jamaica' },
  { code: 'JO', value: 'Jordan' },
  { code: 'JP', value: 'Japan' },
  { code: 'KE', value: 'Kenya' },
  { code: 'KG', value: 'Kyrgyzstan' },
  { code: 'KH', value: 'Cambodia' },
  { code: 'KI', value: 'Kiribati' },
  { code: 'KM', value: 'Comoros' },
  { code: 'KN', value: 'Saint Kitts and Nevis' },
  { code: 'KP', value: "Korea, Democratic People's Republic of" },
  { code: 'KR', value: 'Korea, Republic of' },
  { code: 'KW', value: 'Kuwait' },
  { code: 'KY', value: 'Cayman Islands' },
  { code: 'KZ', value: 'Kazakhstan' },
  { code: 'LA', value: "Lao People's Democratic Republic" },
  { code: 'LB', value: 'Lebanon' },
  { code: 'LC', value: 'Saint Lucia' },
  { code: 'LI', value: 'Liechtenstein' },
  { code: 'LK', value: 'Sri Lanka' },
  { code: 'LR', value: 'Liberia' },
  { code: 'LS', value: 'Lesotho' },
  { code: 'LT', value: 'Lithuania' },
  { code: 'LU', value: 'Luxembourg' },
  { code: 'LV', value: 'Latvia' },
  { code: 'LY', value: 'Libya' },
  { code: 'MA', value: 'Morocco' },
  { code: 'MC', value: 'Monaco' },
  { code: 'MD', value: 'Moldova, Republic of' },
  { code: 'ME', value: 'Montenegro' },
  { code: 'MF', value: 'Saint Martin, (French part)' },
  { code: 'MG', value: 'Madagascar' },
  { code: 'MH', value: 'Marshall Islands' },
  { code: 'MK', value: 'North Macedonia' },
  { code: 'ML', value: 'Mali' },
  { code: 'MM', value: 'Myanmar' },
  { code: 'MN', value: 'Mongolia' },
  { code: 'MO', value: 'Macao' },
  { code: 'MP', value: 'Northern Mariana Islands' },
  { code: 'MQ', value: 'Martinique' },
  { code: 'MR', value: 'Mauritania' },
  { code: 'MS', value: 'Montserrat' },
  { code: 'MT', value: 'Malta' },
  { code: 'MU', value: 'Mauritius' },
  { code: 'MV', value: 'Maldives' },
  { code: 'MW', value: 'Malawi' },
  { code: 'MX', value: 'Mexico' },
  { code: 'MY', value: 'Malaysia' },
  { code: 'MZ', value: 'Mozambique' },
  { code: 'NA', value: 'Namibia' },
  { code: 'NC', value: 'New Caledonia' },
  { code: 'NE', value: 'Niger' },
  { code: 'NF', value: 'Norfolk Island' },
  { code: 'NG', value: 'Nigeria' },
  { code: 'NI', value: 'Nicaragua' },
  { code: 'NL', value: 'Netherlands' },
  { code: 'NO', value: 'Norway' },
  { code: 'NP', value: 'Nepal' },
  { code: 'NR', value: 'Nauru' },
  { code: 'NU', value: 'Niue' },
  { code: 'NZ', value: 'New Zealand' },
  { code: 'OM', value: 'Oman' },
  { code: 'PA', value: 'Panama' },
  { code: 'PE', value: 'Peru' },
  { code: 'PF', value: 'French Polynesia' },
  { code: 'PG', value: 'Papua New Guinea' },
  { code: 'PH', value: 'Philippines' },
  { code: 'PK', value: 'Pakistan' },
  { code: 'PL', value: 'Poland' },
  { code: 'PM', value: 'Saint Pierre and Miquelon' },
  { code: 'PN', value: 'Pitcairn' },
  { code: 'PR', value: 'Puerto Rico' },
  { code: 'PS', value: 'Palestine, State of' },
  { code: 'PT', value: 'Portugal' },
  { code: 'PW', value: 'Palau' },
  { code: 'PY', value: 'Paraguay' },
  { code: 'QA', value: 'Qatar' },
  { code: 'RE', value: 'Réunion' },
  { code: 'RO', value: 'Romania' },
  { code: 'RS', value: 'Serbia' },
  { code: 'RU', value: 'Russian Federation' },
  { code: 'RW', value: 'Rwanda' },
  { code: 'SA', value: 'Saudi Arabia' },
  { code: 'SB', value: 'Solomon Islands' },
  { code: 'SC', value: 'Seychelles' },
  { code: 'SD', value: 'Sudan' },
  { code: 'SE', value: 'Sweden' },
  { code: 'SG', value: 'Singapore' },
  { code: 'SH', value: 'Saint Helena, Ascension and Tristan da Cunha' },
  { code: 'SI', value: 'Slovenia' },
  { code: 'SJ', value: 'Svalbard and Jan Mayen' },
  { code: 'SK', value: 'Slovakia' },
  { code: 'SL', value: 'Sierra Leone' },
  { code: 'SM', value: 'San Marino' },
  { code: 'SN', value: 'Senegal' },
  { code: 'SO', value: 'Somalia' },
  { code: 'SR', value: 'Suriname' },
  { code: 'SS', value: 'South Sudan' },
  { code: 'ST', value: 'Sao Tome and Principe' },
  { code: 'SV', value: 'El Salvador' },
  { code: 'SX', value: 'Sint Maarten, (Dutch part)' },
  { code: 'SY', value: 'Syrian Arab Republic' },
  { code: 'SZ', value: 'Eswatini' },
  { code: 'TC', value: 'Turks and Caicos Islands' },
  { code: 'TD', value: 'Chad' },
  { code: 'TF', value: 'French Southern Territories' },
  { code: 'TG', value: 'Togo' },
  { code: 'TH', value: 'Thailand' },
  { code: 'TJ', value: 'Tajikistan' },
  { code: 'TK', value: 'Tokelau' },
  { code: 'TL', value: 'Timor-Leste' },
  { code: 'TM', value: 'Turkmenistan' },
  { code: 'TN', value: 'Tunisia' },
  { code: 'TO', value: 'Tonga' },
  { code: 'TR', value: 'Turkey' },
  { code: 'TT', value: 'Trinidad and Tobago' },
  { code: 'TV', value: 'Tuvalu' },
  { code: 'TW', value: 'Taiwan, Province of China' },
  { code: 'TZ', value: 'Tanzania, United Republic of' },
  { code: 'UA', value: 'Ukraine' },
  { code: 'UG', value: 'Uganda' },
  { code: 'UM', value: 'United States Minor Outlying Islands' },
  { code: 'US', value: 'United States of America' },
  { code: 'UY', value: 'Uruguay' },
  { code: 'UZ', value: 'Uzbekistan' },
  { code: 'VA', value: 'Holy See' },
  { code: 'VC', value: 'Saint Vincent and the Grenadines' },
  { code: 'VE', value: 'Venezuela, Bolivarian Republic of' },
  { code: 'VG', value: 'Virgin Islands, British' },
  { code: 'VI', value: 'Virgin Islands, U.S.' },
  { code: 'VN', value: 'Viet Nam' },
  { code: 'VU', value: 'Vanuatu' },
  { code: 'WF', value: 'Wallis and Futuna' },
  { code: 'WS', value: 'Samoa' },
  { code: 'YE', value: 'Yemen' },
  { code: 'YT', value: 'Mayotte' },
  { code: 'ZA', value: 'South Africa' },
  { code: 'ZM', value: 'Zambia' },
  { code: 'ZW', value: 'Zimbabwe' }
];

export const expectations: string[] = [
  'Schedule content',
  'Create Ads',
  'View performance of social content',
  'View my ad performance',
  'Leads management'
];

export const digitalAds: string[] = [
  'Never!',
  `I've done boosted posts`,
  `I tried but did'nt get the results I'd hoped for`,
  `Yes, I'm a pro`
];

export const runAds: string[] = [
  'I ran them through an agency/freelancer',
  'A friend helped me',
  'I ran them myself directly through the platform I was advertising on (eg. Facebook Ads Manager, Google Ads)',
  'I used another tool'
];
