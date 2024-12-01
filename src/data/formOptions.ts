// /src/data/formOptions.ts
import { FormOptions } from '../types/utm';

export const formOptions: FormOptions = {
  markets: ['ANZ', 'UK', 'USA', 'CA'],
  
  brands: {
    'ANZ': ['Fisher & Paykel', 'DCS'],
    'UK': ['Fisher & Paykel'],
    'USA': ['Fisher & Paykel', 'DCS'],
    'CA': ['Fisher & Paykel', 'DCS']
  },
  
  productCategories: [
    'Cooking',
    'Refrigeration',
    'Dishwashing',
    'Laundry',
    'Outdoor'
  ],
  
  subCategories: {
    'Cooking': [
      'Ranges',
      'Cooktops',
      'Wall Ovens',
      'Range Hoods'
    ],
    'Refrigeration': [
      'French Door',
      'Bottom Mount',
      'Integrated',
      'Column'
    ],
    'Dishwashing': [
      'Single DishDrawer',
      'Double DishDrawer',
      'Integrated'
    ],
    'Laundry': [
      'Front Loader',
      'Top Loader',
      'Dryer'
    ],
    'Outdoor': [
      'Grill',
      'Storage',
      'Beverage'
    ]
  },
  
  channels: [
    'Paid Social',
    'Paid Search',
    'Display',
    'Video',
    'Email'
  ],
  
  channelTypes: {
    'Paid Social': [
      'Facebook',
      'Instagram',
      'LinkedIn',
      'Pinterest'
    ],
    'Paid Search': [
      'Google',
      'Bing'
    ],
    'Display': [
      'Google Display',
      'Programmatic'
    ],
    'Video': [
      'YouTube',
      'OTT/CTV'
    ],
    'Email': [
      'Newsletter',
      'Promotional',
      'Transactional'
    ]
  },
  
  mediaObjectives: {
    'Facebook': [
      'Awareness',
      'Traffic',
      'Engagement',
      'Lead Generation',
      'Conversions'
    ],
    'Instagram': [
      'Awareness',
      'Traffic',
      'Engagement',
      'Lead Generation',
      'Conversions'
    ],
    'LinkedIn': [
      'Awareness',
      'Traffic',
      'Lead Generation'
    ],
    'Pinterest': [
      'Awareness',
      'Traffic',
      'Conversions'
    ],
    'Google': [
      'Search',
      'Shopping',
      'Local'
    ],
    'Bing': [
      'Search',
      'Shopping'
    ],
    'Google Display': [
      'Awareness',
      'Traffic',
      'Remarketing'
    ],
    'Programmatic': [
      'Awareness',
      'Traffic',
      'Remarketing'
    ],
    'YouTube': [
      'Views',
      'Traffic',
      'Consideration'
    ],
    'OTT/CTV': [
      'Awareness',
      'Reach',
      'Frequency'
    ],
    'Newsletter': [
      'Engagement',
      'Traffic',
      'Conversion'
    ],
    'Promotional': [
      'Sales',
      'Traffic',
      'Conversion'
    ],
    'Transactional': [
      'Information',
      'Confirmation',
      'Updates'
    ]
  }
};
