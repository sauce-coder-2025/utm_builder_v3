(function() {
  'use strict';

  // Theme Setup
  function setTheme(isDark) {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  // Initialize theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    setTheme(true);
  }

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
      'NZ': {
        'F&P': 'FPNZ',
        'Haier': 'HAINZ',
        'Haier Home': 'HHNZ',
        'Home Solutions': 'HSNZ'
      },
      'US': {
        'F&P': 'FPUS',
        'DCS': 'DCSUS'
      },
      'UK': {
        'F&P': 'FPUK'
      },
      'CA': {
        'F&P': 'FPCA',
        'DCS': 'DCSCA'
      },
      'SG': {
        'F&P': 'FPSG'
      },
      'GBL': {
        'F&P': 'FPGBL',
        'Haier': 'HAIGBL',
        'Haier Home': 'HHGBL',
        'Home Solutions': 'HSGBL',
        'DCS': 'DCSGBL'
      }
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
    },
    buyType: {
      'Reach': 'REACH',
      'Traffic': 'TRAFFIC',
      'Conversion': 'CONV',
      'Engagement': 'ENG',
      'Video Views': 'VIDV'
    }
  };

  // Utility Functions
  function formatUtmValue(value) {
    if (!value) return '';
    return value.toLowerCase()
               .replace(/\s+/g, '_')
               .replace(/[^a-z0-9_-]/g, '');
  }

  function showNotification(message) {
    let notification = document.getElementById('notification');
    if (!notification) {
      notification = document.createElement('div');
      notification.id = 'notification';
      notification.className = 'fixed top-4 right-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 transition-opacity z-50';
      document.body.appendChild(notification);
    }

    notification.textContent = message;
    notification.style.opacity = '1';
    
    setTimeout(() => {
      notification.style.opacity = '0';
    }, 3000);
  }

  function generateCampaignName(formData) {
    const {market, brand, mediaObjective, financialYear, quarter, month} = formData;
    
    if (!market || !brand || !mediaObjective || !financialYear || !quarter || !month) {
      showNotification('Please fill in all required fields first');
      return '';
    }

    const marketBrandCode = abbreviations.marketBrand[market][brand];
    const objectiveCode = abbreviations.mediaObjective[mediaObjective];
    const monthCode = abbreviations.month[month];

    return `${marketBrandCode}_${objectiveCode}_${financialYear}_${quarter}_${monthCode}`;
  }

  function generateAdSetName(formData) {
    const {mediaObjective, buyType, productCategory, subCategory} = formData;

    if (!mediaObjective || !buyType) {
      showNotification('Please select Media Objective and Buy Type first');
      return '';
    }

    const objectiveCode = abbreviations.mediaObjective[mediaObjective];
    const buyTypeCode = abbreviations.buyType[buyType];
    const categoryCode = productCategory ? abbreviations.category[productCategory] || '' : '';
    const subCategoryCode = subCategory ? '_' + (abbreviations.subCategory[subCategory] || '') : '';
    
    return `${objectiveCode}_${buyTypeCode}${categoryCode ? '_' + categoryCode : ''}${subCategoryCode}`;
  }

  function generateFullUtmUrl(utmState) {
    if (!utmState.baseUrl) return '';

    try {
      const url = new URL(utmState.baseUrl.toLowerCase());
      
      if (utmState.utmSource) url.searchParams.set('utm_source', formatUtmValue(utmState.utmSource));
      if (utmState.utmMedium) url.searchParams.set('utm_medium', formatUtmValue(utmState.utmMedium));
      if (utmState.utmCampaign) url.searchParams.set('utm_campaign', formatUtmValue(utmState.utmCampaign));
      if (utmState.utmContent) url.searchParams.set('utm_content', formatUtmValue(utmState.utmContent));
      if (utmState.utmTerm) url.searchParams.set('utm_term', formatUtmValue(utmState.utmTerm));
      
      return url.toString();
    } catch (error) {
      showNotification('Invalid URL format');
      return '';
    }
  }
  // Component Definitions
  function Section({ title, children }) {
    return React.createElement('div', { 
      className: 'section mb-6'
    }, [
      React.createElement('h2', { 
        key: 'title',
        className: 'text-lg font-medium mb-4 text-gray-900 dark:text-gray-100' 
      }, title),
      React.createElement('div', { 
        key: 'content',
        className: 'bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm' 
      }, children)
    ]);
  }

  function FormField({ label, value, onChange, options = [], disabled = false }) {
    return React.createElement('div', { className: 'mb-4' }, [
      React.createElement('label', { 
        key: 'label',
        className: 'block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300' 
      }, label),
      React.createElement('select', {
        key: 'select',
        value: value || '',
        onChange: (e) => onChange(e.target.value),
        disabled: disabled,
        className: 'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:bg-gray-100 dark:disabled:bg-gray-600'
      }, [
        React.createElement('option', { key: '', value: '' }, 'Select...'),
        ...(options || []).map(opt => 
          React.createElement('option', { key: opt, value: opt }, opt)
        )
      ])
    ]);
  }

  function ThemeToggle({ isDark, onToggle }) {
    return React.createElement('button', {
      onClick: onToggle,
      className: 'p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
    }, isDark ? '☀️' : '🌙');
  }

  function UTMLogTable({ utmLog, onCopy, onDelete }) {
    return React.createElement('div', { 
      className: 'bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm'
    }, [
      React.createElement('h2', { 
        key: 'title',
        className: 'text-lg font-medium mb-4 flex justify-between items-center text-gray-900 dark:text-gray-100'
      }, [
        React.createElement('span', { key: 'title-text' }, 'UTM Log'),
        React.createElement('button', {
          key: 'complete-session',
          onClick: completeSession,
          className: 'px-3 py-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded'
        }, 'Complete Session')
      ]),
      React.createElement('div', {
        key: 'table-container',
        className: 'overflow-x-auto'
      }, 
        React.createElement('table', { 
          className: 'w-full text-sm text-gray-900 dark:text-gray-100' 
        }, [
          React.createElement('thead', { key: 'head' }, 
            React.createElement('tr', {}, [
              React.createElement('th', { className: 'text-left p-2 border-b border-gray-200 dark:border-gray-700' }, 'Actions'),
              React.createElement('th', { className: 'text-left p-2 border-b border-gray-200 dark:border-gray-700' }, 'Timestamp'),
              React.createElement('th', { className: 'text-left p-2 border-b border-gray-200 dark:border-gray-700' }, 'Created By'),
              React.createElement('th', { className: 'text-left p-2 border-b border-gray-200 dark:border-gray-700' }, 'Campaign'),
              React.createElement('th', { className: 'text-left p-2 border-b border-gray-200 dark:border-gray-700' }, 'UTM URL')
            ])
          ),
          React.createElement('tbody', { 
            key: 'body',
            children: utmLog.map(entry => 
              React.createElement('tr', { key: entry.id }, [
                React.createElement('td', { className: 'p-2 border-b border-gray-200 dark:border-gray-700' }, [
                  React.createElement('button', {
                    onClick: () => onCopy(entry.url),
                    className: 'mr-2 text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300'
                  }, '💾'),
                  React.createElement('button', {
                    onClick: () => onDelete(entry.id),
                    className: 'text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300'
                  }, '🚫')
                ]),
                React.createElement('td', { className: 'p-2 border-b border-gray-200 dark:border-gray-700' }, entry.timestamp),
                React.createElement('td', { className: 'p-2 border-b border-gray-200 dark:border-gray-700' }, entry.createdBy),
                React.createElement('td', { className: 'p-2 border-b border-gray-200 dark:border-gray-700' }, entry.campaign),
                React.createElement('td', { 
                  className: 'p-2 border-b border-gray-200 dark:border-gray-700 truncate max-w-xs',
                  title: entry.url
                }, entry.url)
              ])
            )
          })
        ])
      )
    ]);
  }

  function InputField({ label, type = 'text', value, onChange, placeholder, readOnly = false }) {
    return React.createElement('div', {}, [
      React.createElement('label', { 
        key: 'label',
        className: 'block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300' 
      }, label),
      React.createElement('input', {
        key: 'input',
        type: type,
        value: value,
        onChange: onChange,
        readOnly: readOnly,
        placeholder: placeholder,
        className: 'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm ' + 
                  'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ' +
                  'disabled:bg-gray-100 dark:disabled:bg-gray-600 ' +
                  'read-only:bg-gray-50 dark:read-only:bg-gray-600'
      })
    ]);
  }
  // Main App Component
  function App() {
    const [userEmail, setUserEmail] = React.useState(localStorage.getItem('userEmail'));
    const [isDarkMode, setIsDarkMode] = React.useState(
      localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
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

    const [utmState, setUtmState] = React.useState({
      baseUrl: 'https://www.fisherpaykel.com',
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
      utmContent: '',
      utmTerm: '',
      isManualMode: false,
      generatedUrl: '' // Added to store the generated URL
    });

    const [utmLog, setUtmLog] = React.useState([]);

    // Theme toggle handler
    const toggleTheme = React.useCallback(() => {
      setIsDarkMode(prev => {
        const newValue = !prev;
        setTheme(newValue);
        return newValue;
      });
    }, []);

    function handleChange(field, value) {
      const newData = { ...formData };
      newData[field] = value;
      
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

      // Auto-generate UTM parameters if not in manual mode
      if (!utmState.isManualMode) {
        handleAutoGenerate(newData);
      }
    }

    function handleAutoGenerate(data = formData) {
      if (!data.channel || !data.market || !data.brand) {
        showNotification('Please fill in required fields first');
        return;
      }

      const campaignName = generateCampaignName(data);
      const adSetName = generateAdSetName(data);

      setUtmState(prev => {
        const newState = {
          ...prev,
          utmSource: formatUtmValue(data.channel),
          utmMedium: formatUtmValue(data.channelType),
          utmCampaign: formatUtmValue(campaignName),
          utmContent: formatUtmValue(adSetName)
        };

        // Also generate the URL
        newState.generatedUrl = generateFullUtmUrl(newState);
        return newState;
      });
    }

    function handleGenerateUtm() {
      const url = generateFullUtmUrl(utmState);
      if (!url) return;

      const newEntry = {
        id: Date.now(),
        url: url,
        timestamp: new Date().toLocaleString(),
        createdBy: userEmail,
        campaign: utmState.utmCampaign
      };

      setUtmLog(prevLog => [newEntry, ...prevLog]);
      setUtmState(prev => ({ ...prev, generatedUrl: url }));
      showNotification('UTM generated and added to log');
    }

    function handleCopyUtm(url) {
      navigator.clipboard.writeText(url)
        .then(() => showNotification('UTM copied to clipboard!'))
        .catch(err => showNotification('Failed to copy UTM: ' + err));
    }

    function handleDeleteUtm(id) {
      setUtmLog(prevLog => prevLog.filter(entry => entry.id !== id));
      showNotification('UTM deleted successfully');
    }

    function clearForm() {
      setFormData({
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

      setUtmState({
        baseUrl: 'https://www.fisherpaykel.com',
        utmSource: '',
        utmMedium: '',
        utmCampaign: '',
        utmContent: '',
        utmTerm: '',
        isManualMode: false,
        generatedUrl: ''
      });

      showNotification('Form cleared');
    }

    function completeSession() {
      if (utmLog.length === 0) {
        showNotification('No UTMs to save. Please generate at least one UTM first.');
        return;
      }

      // Save to localStorage
      localStorage.setItem('utmLog', JSON.stringify(utmLog));
      showNotification('Session completed and saved successfully');
      clearForm();
      setUtmLog([]);
    }
    // Login Form Render
    if (!userEmail) {
      return React.createElement('div', { 
        className: 'min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900' 
      },
        React.createElement('div', { className: 'max-w-md w-full p-6' }, [
          React.createElement('h1', { 
            key: 'title',
            className: 'text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white' 
          }, 'Ultimate UTM Builder'),
          React.createElement('form', {
            key: 'form',
            className: 'bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md',
            onSubmit: function(e) {
              e.preventDefault();
              const email = e.target.email.value;
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
              className: 'w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white',
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

    // Main App Layout
    return React.createElement('div', { 
      className: 'min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200'
    }, [
      // Header
      React.createElement('header', { 
        key: 'header', 
        className: 'bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 mb-6'
      },
        React.createElement('div', { 
          className: 'max-w-7xl mx-auto px-4 py-4 flex justify-between items-center' 
        }, [
          React.createElement('h1', { 
            key: 'title', 
            className: 'text-2xl font-semibold text-gray-900 dark:text-white'
          }, 'Ultimate UTM Builder'),
          React.createElement('div', { 
            key: 'actions', 
            className: 'flex items-center space-x-4' 
          }, [
            // Theme Toggle
            React.createElement(ThemeToggle, {
              key: 'theme-toggle',
              isDark: isDarkMode,
              onToggle: toggleTheme
            }),
            // User Info
            React.createElement('div', { 
              key: 'user', 
              className: 'flex items-center text-sm' 
            }, [
              React.createElement('span', { 
                key: 'email',
                className: 'text-gray-600 dark:text-gray-300'
              }, userEmail),
              React.createElement('button', {
                key: 'logout',
                onClick: () => {
                  setUserEmail(null);
                  localStorage.removeItem('userEmail');
                },
                className: 'ml-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300'
              }, 'Sign Out')
            ])
          ])
        ])
      ),
      // Main content
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
            className: 'flex-grow max-w-[66%] space-y-6'
          }, [
            // Campaign Organization
            React.createElement(Section, {
              key: 'organization',
              title: 'Campaign Organization',
              children: [
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
              ]
            }),
            
            // Campaign Timing
            React.createElement(Section, {
              key: 'timing',
              title: 'Campaign Timing',
              children: React.createElement('div', { className: 'grid grid-cols-3 gap-4' }, [
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
            }),
            
            // Campaign Details
            React.createElement(Section, {
              key: 'details',
              title: 'Campaign Details',
              children: [
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
                React.createElement('div', { className: 'grid grid-cols-2 gap-4 mt-4' }, [
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
              ]
            }),

            // UTM Generation Section
            React.createElement(Section, {
              key: 'utm-generation',
              title: 'UTM Generation',
              children: [
                // Manual/Auto toggle
                React.createElement('div', { className: 'flex items-center mb-4' }, [
                  React.createElement('label', {
                    className: 'flex items-center cursor-pointer'
                  }, [
                    React.createElement('input', {
                      type: 'checkbox',
                      className: 'mr-2',
                      checked: utmState.isManualMode,
                      onChange: (e) => setUtmState(prev => ({
                        ...prev,
                        isManualMode: e.target.checked
                      }))
                    }),
                    React.createElement('span', { 
                      className: 'text-sm text-gray-700 dark:text-gray-300' 
                    }, 'Manual Mode')
                  ])
                ]),
                
                // UTM Fields
                React.createElement('div', { className: 'space-y-4' }, [
                  // Base URL
                  React.createElement(InputField, {
                    label: 'Base URL',
                    type: 'url',
                    value: utmState.baseUrl,
                    onChange: (e) => setUtmState(prev => ({ ...prev, baseUrl: e.target.value })),
                    placeholder: 'https://www.fisherpaykel.com'
                  }),
                  
                  // UTM Parameters Grid
                  React.createElement('div', { className: 'grid grid-cols-2 gap-4' }, [
                    React.createElement(InputField, {
                      label: 'UTM Source',
                      value: utmState.utmSource,
                      onChange: (e) => setUtmState(prev => ({ ...prev, utmSource: e.target.value })),
                      readOnly: !utmState.isManualMode
                    }),
                    React.createElement(InputField, {
                      label: 'UTM Medium',
                      value: utmState.utmMedium,
                      onChange: (e) => setUtmState(prev => ({ ...prev, utmMedium: e.target.value })),
                      readOnly: !utmState.isManualMode
                    }),
                    React.createElement(InputField, {
                      label: 'UTM Campaign',
                      value: utmState.utmCampaign,
                      onChange: (e) => setUtmState(prev => ({ ...prev, utmCampaign: e.target.value })),
                      readOnly: !utmState.isManualMode
                    }),
                    React.createElement(InputField, {
                      label: 'UTM Content',
                      value: utmState.utmContent,
                      onChange: (e) => setUtmState(prev => ({ ...prev, utmContent: e.target.value })),
                      readOnly: !utmState.isManualMode
                    })
                  ]),

                  // Generated URL (if exists)
                  utmState.generatedUrl && React.createElement('div', {
                    className: 'mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md'
                  }, [
                    React.createElement('div', { 
                      className: 'flex justify-between items-center mb-2' 
                    }, [
                      React.createElement('label', { 
                        className: 'font-medium text-gray-700 dark:text-gray-300' 
                      }, 'Generated UTM URL:'),
                      React.createElement('button', {
                        onClick: () => handleCopyUtm(utmState.generatedUrl),
                        className: 'text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300'
                      }, 'Copy to Clipboard')
                    ]),
                    React.createElement('div', { 
                      className: 'break-all text-sm text-gray-600 dark:text-gray-300' 
                    }, utmState.generatedUrl)
                  ]),
                  
                  // Buttons
                  React.createElement('div', { className: 'flex justify-end space-x-4 mt-6' }, [
                    React.createElement('button', {
                      type: 'button',
                      onClick: handleAutoGenerate,
                      className: 'px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600'
                    }, 'Auto Generate'),
                    React.createElement('button', {
                      type: 'button',
                      onClick: handleGenerateUtm,
                      className: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                    }, 'Generate UTM')
                  ])
                ])
              ]
            })
          ]),
          
          // Right column - UTM Log
          React.createElement('div', { 
            key: 'utm-log',
            className: 'w-[34%]'
          }, 
            React.createElement(UTMLogTable, {
              utmLog: utmLog,
              onCopy: handleCopyUtm,
              onDelete: handleDeleteUtm
            })
          )
        ])
      )
    ]);
    }

  // Mount the application
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(React.createElement(React.StrictMode, null, React.createElement(App)));
})();
