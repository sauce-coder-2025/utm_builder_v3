'use strict';

// Form options data
const formOptions = {
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
    'Cooking': ['Ranges', 'Cooktops', 'Wall Ovens', 'Range Hoods'],
    'Refrigeration': ['French Door', 'Bottom Mount', 'Integrated', 'Column'],
    'Dishwashing': ['Single DishDrawer', 'Double DishDrawer', 'Integrated'],
    'Laundry': ['Front Loader', 'Top Loader', 'Dryer'],
    'Outdoor': ['Grill', 'Storage', 'Beverage']
  }
};

// Section component
const Section = ({ title, children }) => {
  return React.createElement('div', { className: 'section mb-8' }, [
    React.createElement('h2', { 
      key: 'title',
      className: 'text-xl font-medium mb-4' 
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
      className: 'w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white'
    }, [
      React.createElement('option', { key: '', value: '' }, 'Select...'),
      ...options.map(opt => React.createElement('option', { key: opt, value: opt }, opt))
    ])
  ]);
};

// UTM Log Table component
const UTMLogTable = () => {
  return React.createElement('div', { className: 'bg-white rounded-lg p-6 shadow-sm' }, [
    React.createElement('h2', { 
      key: 'title',
      className: 'text-xl font-medium mb-4' 
    }, 'UTM Log'),
    React.createElement('table', { 
      key: 'table',
      className: 'w-full text-sm' 
    }, [
      React.createElement('thead', { key: 'head' }, 
        React.createElement('tr', {}, [
          React.createElement('th', { className: 'text-left py-2' }, 'Actions'),
          React.createElement('th', { className: 'text-left py-2' }, 'Timestamp'),
          React.createElement('th', { className: 'text-left py-2' }, 'Created By'),
          React.createElement('th', { className: 'text-left py-2' }, 'Campaign'),
          React.createElement('th', { className: 'text-left py-2' }, 'UTM URL')
        ])
      ),
      React.createElement('tbody', { key: 'body' })
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
    channelType: ''
  });

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    // Reset dependent fields
    if (field === 'market') newData.brand = '';
    if (field === 'productCategory') newData.subCategory = '';
    if (field === 'channel') newData.channelType = '';
    setFormData(newData);
  };

  if (!userEmail) {
    // Login form JSX
    return React.createElement('div', { className: 'min-h-screen flex items-center justify-center bg-gray-50' },
      React.createElement('div', { className: 'max-w-md w-full p-6' },
        React.createElement('h1', { className: 'text-2xl font-bold text-center mb-4' }, 'UTM Builder'),
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
          className: 'text-2xl font-bold'
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
      className: 'max-w-7xl mx-auto px-4 pb-6' 
    },
      React.createElement('div', { 
        className: 'grid grid-cols-1 lg:grid-cols-3 gap-6' 
      }, [
        React.createElement('div', { 
          key: 'form',
          className: 'lg:col-span-2 space-y-6'
        }, [
          // Campaign Organization Section
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
                options: formData.market ? formOptions.brands[formData.market] : [],
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
          // Campaign Timing Section
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
                options: ['FY24', 'FY25', 'FY26']
              }),
              React.createElement(FormField, {
                key: 'quarter',
                label: 'Quarter',
                value: formData.quarter,
                onChange: value => handleChange('quarter', value),
                options: ['Q1', 'Q2', 'Q3', 'Q4']
              }),
              React.createElement(FormField, {
                key: 'month',
                label: 'Month',
                value: formData.month,
                onChange: value => handleChange('month', value),
                options: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
              })
            ])
          ),
          // Campaign Details Section
          React.createElement(Section, {
            key: 'details',
            title: 'Campaign Details'
          }, 
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
                options: formData.channel ? formOptions.channelTypes[formData.channel] : [],
                disabled: !formData.channel
              })
            ])
          )
        ]),
        // UTM Log Section
        React.createElement('div', { 
          key: 'log',
          className: 'lg:col-span-1'
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
