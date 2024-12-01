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
  channels: ['Paid Social', 'Paid Search', 'Display', 'Video', 'Email'],
  channelTypes: {
    'Paid Social': ['Facebook', 'Instagram', 'LinkedIn', 'Pinterest'],
    'Paid Search': ['Google', 'Bing'],
    'Display': ['Google Display', 'Programmatic'],
    'Video': ['YouTube', 'OTT/CTV'],
    'Email': ['Newsletter', 'Promotional', 'Transactional']
  }
};

// Create a select field component
const FormField = ({ label, type = 'select', value, onChange, options = [], disabled = false, placeholder }) => {
  return React.createElement('div', { className: 'mb-6' }, [
    React.createElement('label', { 
      key: 'label',
      className: 'block text-sm font-medium mb-2' 
    }, label),
    type === 'select' ? 
      React.createElement('select', {
        key: 'input',
        value: value || '',
        onChange: e => onChange(e.target.value),
        disabled: disabled,
        className: 'w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm'
      }, [
        React.createElement('option', { key: '', value: '' }, 'Select...'),
        ...options.map(opt => React.createElement('option', { key: opt, value: opt }, opt))
      ])
    : React.createElement('input', {
        key: 'input',
        type: type,
        value: value,
        onChange: e => onChange(e.target.value),
        placeholder: placeholder,
        className: 'w-full px-3 py-2 border border-gray-300 rounded-md text-sm'
      })
  ]);
};

// Main App component
const App = () => {
  const [userEmail, setUserEmail] = React.useState(localStorage.getItem('userEmail'));
  const [formData, setFormData] = React.useState({
    market: '',
    brand: '',
    channel: '',
    channelType: '',
    campaignName: ''
  });

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    if (field === 'market') newData.brand = '';
    if (field === 'channel') newData.channelType = '';
    setFormData(newData);
  };

  if (!userEmail) {
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
      className: 'bg-white border-b border-gray-200'
    },
      React.createElement('div', { 
        className: 'max-w-7xl mx-auto px-4 py-3 flex justify-between items-center' 
      }, [
        React.createElement('h1', { 
          key: 'title', 
          className: 'text-xl font-medium'
        }, 'UTM Builder'),
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
      className: 'max-w-7xl mx-auto px-4 py-6' 
    },
      React.createElement('div', { 
        className: 'bg-white rounded-lg p-6' 
      }, [
        // Market
        React.createElement(FormField, {
          key: 'market',
          label: 'Market',
          value: formData.market,
          onChange: value => handleChange('market', value),
          options: formOptions.markets
        }),
        // Brand
        React.createElement(FormField, {
          key: 'brand',
          label: 'Brand',
          value: formData.brand,
          onChange: value => handleChange('brand', value),
          options: formData.market ? formOptions.brands[formData.market] : [],
          disabled: !formData.market
        }),
        // Channel
        React.createElement(FormField, {
          key: 'channel',
          label: 'Channel',
          value: formData.channel,
          onChange: value => handleChange('channel', value),
          options: formOptions.channels
        }),
        // Channel Type
        React.createElement(FormField, {
          key: 'channelType',
          label: 'Channel Type',
          value: formData.channelType,
          onChange: value => handleChange('channelType', value),
          options: formData.channel ? formOptions.channelTypes[formData.channel] : [],
          disabled: !formData.channel
        }),
        // Campaign Name
        React.createElement(FormField, {
          key: 'campaignName',
          label: 'Campaign Name',
          type: 'text',
          value: formData.campaignName,
          onChange: value => handleChange('campaignName', value),
          placeholder: 'Enter campaign name'
        })
      ])
    )
  ]);
};

// Mount the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(React.StrictMode, null, React.createElement(App)));
