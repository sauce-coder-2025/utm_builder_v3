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

// Create a select field component without JSX
const SelectField = ({ label, value, onChange, options, disabled }) => {
  return React.createElement('div', { className: 'mb-4' },
    React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, label),
    React.createElement('select', {
      value: value || '',
      onChange: e => onChange(e.target.value),
      disabled: disabled,
      className: 'w-full px-3 py-2 border border-gray-300 rounded-md'
    }, [
      React.createElement('option', { key: '', value: '' }, 'Select...'),
      ...options.map(opt => React.createElement('option', { key: opt, value: opt }, opt))
    ])
  );
};

// Main App component
const App = () => {
  const [userEmail, setUserEmail] = React.useState(localStorage.getItem('userEmail'));
  const [formData, setFormData] = React.useState({
    market: '',
    brand: '',
    channel: '',
    channelType: ''
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
    React.createElement('header', { key: 'header', className: 'bg-white shadow' },
      React.createElement('div', { className: 'max-w-7xl mx-auto px-4 py-6 flex justify-between items-center' }, [
        React.createElement('h1', { key: 'title', className: 'text-2xl font-bold' }, 'UTM Builder'),
        React.createElement('div', { key: 'user', className: 'flex items-center' }, [
          React.createElement('span', { key: 'email', className: 'mr-4' }, userEmail),
          React.createElement('button', {
            key: 'logout',
            onClick: () => {
              setUserEmail(null);
              localStorage.removeItem('userEmail');
            },
            className: 'text-blue-500 hover:text-blue-700'
          }, 'Sign Out')
        ])
      ])
    ),
    React.createElement('main', { key: 'main', className: 'max-w-7xl mx-auto px-4 py-6' },
      React.createElement('div', { className: 'bg-white rounded-lg shadow p-6' }, [
        React.createElement(SelectField, {
          key: 'market',
          label: 'Market',
          value: formData.market,
          onChange: value => handleChange('market', value),
          options: formOptions.markets
        }),
        React.createElement(SelectField, {
          key: 'brand',
          label: 'Brand',
          value: formData.brand,
          onChange: value => handleChange('brand', value),
          options: formData.market ? formOptions.brands[formData.market] : [],
          disabled: !formData.market
        }),
        React.createElement(SelectField, {
          key: 'channel',
          label: 'Channel',
          value: formData.channel,
          onChange: value => handleChange('channel', value),
          options: formOptions.channels
        }),
        React.createElement(SelectField, {
          key: 'channelType',
          label: 'Channel Type',
          value: formData.channelType,
          onChange: value => handleChange('channelType', value),
          options: formData.channel ? formOptions.channelTypes[formData.channel] : [],
          disabled: !formData.channel
        })
      ])
    )
  ]);
};

// Mount the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(React.StrictMode, null, React.createElement(App)));
