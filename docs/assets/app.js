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

  // Months for Campaign Timing
  months: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],

  // Financial Years
  financialYears: ['FY24', 'FY25', 'FY26'],

  // Quarters
  quarters: ['Q1', 'Q2', 'Q3', 'Q4']
};

// Abbreviation mappings
const abbreviations = {
  marketBrand: {
    'AU': {
      'F&P': 'FPAU',
      'Haier': 'HAIAU',
      'Haier Home': 'HHAU',
      'Home Solutions': 'HSAU',
      'DCS': 'DCSAU'
    },
    // ... rest of marketBrandAbbreviations
  },
  mediaObjective: {
    'Attract': 'ATT',
    'Engage': 'ENG',
    'Convert': 'CON',
    'Retain': 'RET'
  },
  month: {
    'January': 'JAN',
    'February': 'FEB',
    'March': 'MAR',
    'April': 'APR',
    'May': 'MAY',
    'June': 'JUN',
    'July': 'JUL',
    'August': 'AUG',
    'September': 'SEP',
    'October': 'OCT',
    'November': 'NOV',
    'December': 'DEC'
  },
  category: {
    'Cooling': 'COOL',
    'Cooking': 'COOK',
    'Fabrice Care': 'FAB',
    'Dishwashing': 'DISH',
    'Outdoor': 'OUT',
    'Ventilation': 'VENT',
    'Accessories': 'ACC',
    'Promotions': 'PROMO'
  }
};

// Section component
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

// Form field component
const FormField = ({ label, value, onChange, options = [], disabled = false, className = '' }) => {
  return React.createElement('div', { className: `form-field ${className}` }, [
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

// Main App component
const App = () => {
  const [userEmail, setUserEmail] = React.useState(localStorage.getItem('userEmail'));
  const [formData, setFormData] = React.useState({
    market: '',
    brand: '',
    productCategory: '',
    subCategory: '',
    financialYear: '',
    quarter: '',
    month: '',
    channel: '',
    channelType: '',
    mediaObjective: '',
    buyType: ''
  });

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    
    // Reset dependent fields
    switch(field) {
      case 'market':
        newData.brand = '';
        break;
      case 'productCategory':
        newData.subCategory = '';
        break;
      case 'channel':
        newData.channelType = '';
        newData.mediaObjective = '';
        newData.buyType = '';
        break;
      case 'channelType':
        newData.mediaObjective = '';
        newData.buyType = '';
        break;
    }
    
    setFormData(newData);
  };

  // Login form rendering
  if (!userEmail) {
    return React.createElement('div', { className: 'min-h-screen flex items-center justify-center bg-gray-50' },
      React.createElement('div', { className: 'max-w-md w-full p-6' },
        React.createElement('h1', { className: 'text-2xl font-bold text-center mb-4' }, 'Ultimate UTM Builder'),
        React.createElement('form', {
          className: 'bg-white p-8 rounded-lg shadow-md',
          onSubmit: e => {
            e.preventDefault();
            const email = new FormData(e.target).get('email');
            if (email.endsWith('@fisherpaykel.com')) {
              setUserEmail(email);
              localStorage.setItem('userEmail', email);
            } else {
              alert('Please use a Fisher & Paykel email address');
            }
          }
        }, [
          React.createElement('input', {
            key: 'email',
            type: 'email',
            name: 'email',
            placeholder: 'Enter your F&P email',
            className: 'w-full p-2 border rounded mb-4',
            required: true
          }),
          React.createElement('button', {
            type: 'submit',
            className: 'w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
          }, 'Sign In')
        ])
      )
    );
  }

  return React.createElement('div', { className: 'min-h-screen bg-gray-50' }, [
    // Header
    React.createElement('header', { 
      key: 'header', 
      className: 'bg-white border-b border-gray-200 mb-6'
    },
      React.createElement('div', { 
        className: 'max-w-7xl mx-auto px-4 py-4 flex justify-between items-center' 
      }, [
        React.createElement('h1', { 
          key: 'title', 
          className: 'text-2xl font-semibold'
        }, 'Ultimate UTM Builder'),
        React.createElement('div', { 
          key: 'user', 
          className: 'flex items-center text-sm' 
        }, [
          React.createElement('span', { 
            key: 'email',
            className: 'text-gray-600'
          }, userEmail),
          React.createElement('button', {
            key: 'logout',
            onClick: () => {
              setUserEmail(null);
              localStorage.removeItem('userEmail');
            },
            className: 'ml-4 text-blue-600 hover:text-blue-800'
          }, 'Sign Out')
        ])
      ])
    ),
    // Main Content
    React.createElement('main', { 
      key: 'main', 
      className: 'max-w-7xl mx-auto px-4 pb-6 grid grid-cols-3 gap-6' 
    }, [
      // Left column (form sections)
      React.createElement('div', { 
        key: 'form',
        className: 'col-span-2 space-y-6'
      }, [
        // Campaign Organization
        React.createElement(Section, {
          key: 'organization',
          title: 'Campaign Organization'
        }, [
          React.createElement('div', { className: 'grid grid-cols-2 gap-4' }, [
            React.createElement(FormField, {
              key: 'market',
              label: 'Market',
              value: formData.market,
              onChange: value => handleChange('market', value),
              options: formOptions.markets
            }),
            React.createElement(FormField, {
              key: 'brand',
              label: 'Brand',
              value: formData.brand,
              onChange: value => handleChange('brand', value),
              options: formData.market ? formOptions.marketBrands[formData.market] : [],
              disabled: !formData.market
            })
          ]),
          React.createElement('div', { className: 'grid grid-cols-2 gap-4 mt-4' }, [
            React.createElement(FormField, {
              key: 'productCategory',
              label: 'Product Category',
              value: formData.productCategory,
              onChange: value => handleChange('productCategory', value),
              options: formOptions.productCategories
            }),
            React.createElement(FormField, {
              key: 'subCategory',
              label: 'Sub Category',
              value: formData.subCategory,
              onChange: value => handleChange('subCategory', value),
              options: formData.productCategory ? formOptions.subCategories[formData.productCategory] : [],
              disabled: !formData.productCategory
            })
          ])
        ]),
        // Campaign Timing
        React.createElement(Section, {
          key: 'timing',
          title: 'Campaign Timing'
        }, 
          React.createElement('div', { className: 'grid grid-cols-3 gap-4' }, [
            React.createElement(FormField, {
              key: 'financialYear',
              label: 'Financial Year',
              value: formData.financialYear,
              onChange: value => handleChange('financialYear', value),
              options: formOptions.financialYears
            }),
            React.createElement(FormField, {
              key: 'quarter',
              label: 'Quarter',
              value: formData.quarter,
              onChange: value => handleChange('quarter', value),
              options: formOptions.quarters
            }),
            React.createElement(FormField, {
              key: 'month',
              label: 'Month',
              value: formData.month,
              onChange: value => handleChange('month', value),
              options: formOptions.months
            })
          ])
        ),
        // Campaign Details
        React.createElement(Section, {
          key: 'details',
          title: 'Campaign Details'
        }, 
          React.createElement('div', { className: 'space-y-4' }, [
            React.createElement('div', { className: 'grid grid-cols-2 gap-4' }, [
              React.createElement(FormField, {
                key: 'channel',
                label: 'Channel',
                value: formData.channel,
                onChange: value => handleChange('channel', value),
                options: formOptions.channels
              }),
              React.createElement(FormField, {
                key: 'channelType',
                label: 'Channel Type',
                value: formData.channelType,
                onChange: value => handleChange('channelType', value),
                options: formData.channel ? formOptions.channelDependencies[formData.channel].channelTypes : [],
                disabled: !formData.channel
              })
            ]),
            React.createElement('div', { className: 'grid grid-cols-2 gap-4' }, [
              React.createElement(FormField, {
                key: 'mediaObjective',
                label: 'Media Objective',
                value: formData.mediaObjective,
                onChange: value => handleChange('mediaObjective', value),
                options: formData.channel ? formOptions.channelDependencies[formData.channel].mediaObjectives : [],
                disabled: !formData.channelType
              }),
              React.createElement(FormField, {
                key: 'buyType',
                label: 'Buy Type',
                value: formData.buyType,
                onChange: value => handleChange('buyType', value),
                options: formData.channel ? formOptions.channelDependencies[formData.channel].buyTypes : [],
                disabled: !formData.mediaObjective
              })
            ])
          ])
        )
      ]),
      // Right column (UTM Log)
      React.createElement('div', { 
        key: 'log',
        className: 'col-span-1'
      }, [
        React 
        'use strict';

// Form options and dependencies
const formOptions = {
  // ... (keep all form options)
};

// Components first
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

// Main App component
const App = () => {
  const [userEmail, setUserEmail] = React.useState(localStorage.getItem('userEmail'));
  const [formData, setFormData] = React.useState({
    market: '',
    brand: '',
    productCategory: '',
    subCategory: '',
    financialYear: '',
    quarter: '',
    month: '',
    channel: '',
    channelType: '',
    mediaObjective: '',
    buyType: ''
  });

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    // Reset dependent fields
    switch(field) {
      case 'market':
        newData.brand = '';
        break;
      case 'productCategory':
        newData.subCategory = '';
        break;
      case 'channel':
        newData.channelType = '';
        newData.mediaObjective = '';
        newData.buyType = '';
        break;
      case 'channelType':
        newData.mediaObjective = '';
        newData.buyType = '';
        break;
    }
    setFormData(newData);
  };

  if (!userEmail) {
    return React.createElement('div', { className: 'min-h-screen flex items-center justify-center bg-gray-50' },
      React.createElement('div', { className: 'max-w-md w-full p-6' }, [
        React.createElement('h1', { 
          key: 'title',
          className: 'text-2xl font-bold text-center mb-4' 
        }, 'Ultimate UTM Builder'),
        React.createElement('form', {
          key: 'form',
          className: 'bg-white p-8 rounded-lg shadow-md',
          onSubmit: e => {
            e.preventDefault();
            const email = new FormData(e.target).get('email');
            if (email.endsWith('@fisherpaykel.com')) {
              setUserEmail(email);
              localStorage.setItem('userEmail', email);
            } else {
              alert('Please use a Fisher & Paykel email address');
            }
          }
        }, [
          React.createElement('input', {
            key: 'email',
            type: 'email',
            name: 'email',
            placeholder: 'Enter your F&P email',
            className: 'w-full p-2 border rounded mb-4',
            required: true
          }),
          React.createElement('button', {
            key: 'submit',
            type: 'submit',
            className: 'w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
          }, 'Sign In')
        ])
      ])
    );
  }

  return React.createElement('div', { className: 'min-h-screen bg-gray-50' }, [
    // Header
    React.createElement('header', { 
      key: 'header', 
      className: 'bg-white border-b border-gray-200 mb-6'
    },
      React.createElement('div', { 
        className: 'max-w-7xl mx-auto px-4 py-4 flex justify-between items-center' 
      }, [
        React.createElement('h1', { 
          key: 'title', 
          className: 'text-2xl font-semibold'
        }, 'Ultimate UTM Builder'),
        React.createElement('div', { 
          key: 'user', 
          className: 'flex items-center text-sm' 
        }, [
          React.createElement('span', { 
            key: 'email',
            className: 'text-gray-600'
          }, userEmail),
          React.createElement('button', {
            key: 'logout',
            onClick: () => {
              setUserEmail(null);
              localStorage.removeItem('userEmail');
            },
            className: 'ml-4 text-blue-600 hover:text-blue-800'
          }, 'Sign Out')
        ])
      ])
    ),
    // Main content with side-by-side layout
    React.createElement('div', { 
      key: 'container',
      className: 'max-w-7xl mx-auto px-4 py-6'
    },
      React.createElement('div', { 
        className: 'flex gap-6' 
      }, [
        // Left column - Form sections
        React.createElement('div', { 
          key: 'form-sections',
          className: 'flex-grow max-w-[66%]'
        }, [
          // Campaign Organization Section
          React.createElement(Section, {
            key: 'organization',
            title: 'Campaign Organization',
            children: [/* your form fields */]
          }),
          
          // Campaign Timing Section
          React.createElement(Section, {
            key: 'timing',
            title: 'Campaign Timing',
            children: [/* your form fields */]
          }),
          
          // Campaign Details Section
          React.createElement(Section, {
            key: 'details',
            title: 'Campaign Details',
            children: [/* your form fields */]
          })
        ]),
        
        // Right column - UTM Log
        React.createElement('div', { 
          key: 'utm-log',
          className: 'w-[34%]'
        }, 
          React.createElement(UTMLogTable)
        )
      ])
    )
  ]);
};

// Mount the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(React.StrictMode, null, React.createElement(App)));
