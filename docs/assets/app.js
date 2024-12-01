'use strict';

// Form options and dependencies
const formOptions = {
  markets: ['AU', 'NZ', 'US', 'UK', 'CA', 'SG', 'GBL'],
  
  marketBrands: {
    'AU': ['F&P', 'Haier', 'Haier Home', 'Home Solutions', 'DCS'],
    'NZ': ['F&P', 'Haier', 'Haier Home', 'Home Solutions'],
    'US': ['F&P', 'DCS'],
    'UK': ['F&P'],
    'CA': ['F&P', 'DCS'],
    'SG': ['F&P'],
    'GBL': ['F&P', 'Haier', 'Haier Home', 'Home Solutions', 'DCS']
  },

  productCategories: [
    'Cooling',
    'Cooking',
    'Fabrice Care',
    'Dishwashing',
    'Outdoor',
    'Ventilation',
    'Accessories',
    'Promotions'
  ],

  subCategories: {
    'Cooling': ['Refrigeration', 'Wine', 'Chest Freezer'],
    'Cooking': ['Ovens', 'Cooktops', 'Freestanding', 'Companions'],
    'Fabrice Care': ['Washing Machines', 'Dryers', 'Cabinets'],
    'Dishwashing': [],
    'Outdoor': ['Grills', 'Carts', 'Storage'],
    'Ventilation': [],
    'Accessories': ['Spare Parts', 'Accessories', 'Water Filters', 'Cleaning'],
    'Promotions': []
  },

  channels: ['Meta', 'Tiktok', 'LinkedIn', 'Pinterest', 'DV360'],

  channelDependencies: {
    'Meta': {
      channelTypes: ['Paid Social', 'Social'],
      mediaObjectives: ['Attract', 'Engage', 'Convert', 'Retain'],
      buyTypes: ['Reach', 'Traffic', 'Conversion', 'Engagement']
    },
    'Tiktok': {
      channelTypes: ['Paid Social', 'Social'],
      mediaObjectives: ['Attract', 'Engage', 'Convert', 'Retain'],
      buyTypes: ['Reach', 'Traffic', 'Conversion', 'Engagement']
    },
    'LinkedIn': {
      channelTypes: ['Paid Social', 'Social'],
      mediaObjectives: ['Attract', 'Engage', 'Convert', 'Retain'],
      buyTypes: ['Reach', 'Traffic', 'Conversion', 'Engagement']
    },
    'Pinterest': {
      channelTypes: ['Paid Social', 'Social'],
      mediaObjectives: ['Attract', 'Engage', 'Convert', 'Retain'],
      buyTypes: ['Reach', 'Traffic', 'Conversion', 'Engagement']
    },
    'DV360': {
      channelTypes: ['Display', 'Video'],
      mediaObjectives: ['Attract', 'Engage', 'Convert', 'Retain'],
      buyTypes: ['Reach', 'Traffic', 'Conversion', 'Engagement']
    }
  },

  months: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],

  financialYears: ['FY24', 'FY25', 'FY26'],
  quarters: ['Q1', 'Q2', 'Q3', 'Q4']
};
// Components
const Section = ({ title, children }) => {
  return React.createElement('div', { className: 'section mb-6' }, [
    React.createElement('h2', { 
      key: 'title',
      className: 'text-lg font-medium mb-4' 
    }, title),
    React.createElement('div', { 
      key: 'content',
      className: 'bg-white rounded-lg p-6 shadow-sm' 
    }, children)
  ]);
};

const FormField = ({ label, value, onChange, options = [], disabled = false }) => {
  return React.createElement('div', { className: 'mb-4' }, [
    React.createElement('label', { 
      key: 'label',
      className: 'block text-sm font-medium mb-2' 
    }, label),
    React.createElement('select', {
      key: 'select',
      value: value || '',
      onChange: e => onChange(e.target.value),
      disabled: disabled,
      className: 'w-full px-3 py-2 border border-gray-300 rounded text-sm'
    }, [
      React.createElement('option', { key: '', value: '' }, 'Select...'),
      ...options.map(opt => React.createElement('option', { key: opt, value: opt }, opt))
    ])
  ]);
};

const UTMLogTable = () => {
  return React.createElement('div', { className: 'bg-white rounded-lg p-6 shadow-sm' }, [
    React.createElement('h2', { 
      key: 'title',
      className: 'text-lg font-medium mb-4' 
    }, 'UTM Log'),
    React.createElement('div', {
      key: 'table-container',
      className: 'overflow-x-auto'
    }, 
      React.createElement('table', { 
        className: 'w-full text-sm' 
      }, [
        React.createElement('thead', { key: 'head' }, 
          React.createElement('tr', {}, [
            React.createElement('th', { className: 'text-left p-2 border-b' }, 'Actions'),
            React.createElement('th', { className: 'text-left p-2 border-b' }, 'Timestamp'),
            React.createElement('th', { className: 'text-left p-2 border-b' }, 'Created By'),
            React.createElement('th', { className: 'text-left p-2 border-b' }, 'Campaign'),
            React.createElement('th', { className: 'text-left p-2 border-b' }, 'UTM URL')
          ])
        ),
        React.createElement('tbody', { key: 'body' })
      ])
    )
  ]);
};
