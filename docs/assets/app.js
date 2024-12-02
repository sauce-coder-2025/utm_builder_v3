(function() {
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
      notification.className = 'fixed top-4 right-4 bg-white shadow-lg rounded-lg p-4 transition-opacity';
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
// Component Definitions
  function Section({ title, children }) {
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
  }

  function FormField({ label, value, onChange, options = [], disabled = false }) {
    return React.createElement('div', { className: 'mb-4' }, [
      React.createElement('label', { 
        key: 'label',
        className: 'block text-sm font-medium mb-2' 
      }, label),
      React.createElement('select', {
        key: 'select',
        value: value || '',
        onChange: (e) => onChange(e.target.value),
        disabled: disabled,
        className: 'w-full px-3 py-2 border border-gray-300 rounded text-sm'
      }, [
        React.createElement('option', { key: '', value: '' }, 'Select...'),
        ...(options || []).map(opt => 
          React.createElement('option', { key: opt, value: opt }, opt)
        )
      ])
    ]);
  }

  function UTMLogTable() {
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
          React.createElement('tbody', { 
            key: 'body',
            children: [] // UTM log entries will be added dynamically
          })
        ])
      )
    ]);
  }
// Main App Component
  function App() {
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

    const [utmState, setUtmState] = React.useState({
      baseUrl: 'https://www.fisherpaykel.com',
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
      utmContent: '',
      utmTerm: '',
      isManualMode: false
    });

    const [utmLog, setUtmLog] = React.useState([]);

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
    }

    function handleGenerateUtm() {
      if (!utmState.baseUrl) {
        showNotification('Please enter a Base URL');
        return;
      }

      if (!utmState.utmSource || !utmState.utmMedium || !utmState.utmCampaign) {
        showNotification('Please ensure Source, Medium, and Campaign fields are filled');
        return;
      }

      try {
        const url = new URL(utmState.baseUrl.toLowerCase());
        
        url.searchParams.set('utm_source', formatUtmValue(utmState.utmSource));
        url.searchParams.set('utm_medium', formatUtmValue(utmState.utmMedium));
        url.searchParams.set('utm_campaign', formatUtmValue(utmState.utmCampaign));
        
        if (utmState.utmContent) {
          url.searchParams.set('utm_content', formatUtmValue(utmState.utmContent));
        }
        if (utmState.utmTerm) {
          url.searchParams.set('utm_term', formatUtmValue(utmState.utmTerm));
        }

        const newUtmEntry = {
          id: Date.now(),
          url: url.toString(),
          timestamp: new Date().toLocaleString(),
          createdBy: userEmail,
          campaign: utmState.utmCampaign
        };

        setUtmLog(prevLog => [newUtmEntry, ...prevLog]);
        showNotification('UTM generated and added to log');

      } catch (error) {
        showNotification('Invalid URL format. Please check the Base URL.');
      }
    }

    function handleAutoGenerate() {
      if (!formData.channel || !formData.market || !formData.brand) {
        showNotification('Please fill in required fields first');
        return;
      }

      const campaignName = generateCampaignName(formData);
      const adSetName = generateAdSetName(formData);

      setUtmState(prev => ({
        ...prev,
        utmSource: formatUtmValue(formData.channel),
        utmMedium: formatUtmValue(formData.channelType),
        utmCampaign: formatUtmValue(campaignName),
        utmContent: formatUtmValue(adSetName)
      }));
    }
// Login Form Render
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

    // Main App Layout
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
              onClick: function() {
                setUserEmail(null);
                localStorage.removeItem('userEmail');
              },
              className: 'ml-4 text-blue-600 hover:text-blue-800'
            }, 'Sign Out')
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
            className: 'flex-grow max-w-[66%]'
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
                    React.createElement('span', { className: 'text-sm' }, 'Manual Mode')
                  ])
                ]),
                
                // UTM Fields
                React.createElement('div', { className: 'space-y-4' }, [
                  React.createElement('div', { className: 'grid grid-cols-2 gap-4' }, [
                    // Base URL
                    React.createElement('div', { className: 'col-span-2' }, [
                      React.createElement('label', { className: 'block text-sm font-medium mb-2' }, 'Base URL'),
                      React.createElement('input', {
                        type: 'url',
                        value: utmState.baseUrl,
                        onChange: (e) => setUtmState(prev => ({ ...prev, baseUrl: e.target.value })),
                        className: 'w-full px-3 py-2 border border-gray-300 rounded text-sm',
                        placeholder: 'https://www.fisherpaykel.com'
                      })
                    ]),
                    // UTM Source
                    React.createElement('div', {}, [
                      React.createElement('label', { className: 'block text-sm font-medium mb-2' }, 'UTM Source'),
                      React.createElement('input', {
                        type: 'text',
                        value: utmState.utmSource,
                        onChange: (e) => setUtmState(prev => ({ ...prev, utmSource: e.target.value })),
                        readOnly: !utmState.isManualMode,
                        className: 'w-full px-3 py-2 border border-gray-300 rounded text-sm'
                      })
                    ]),
                    // UTM Medium
                    React.createElement('div', {}, [
                      React.createElement('label', { className: 'block text-sm font-medium mb-2' }, 'UTM Medium'),
                      React.createElement('input', {
                        type: 'text',
                        value: utmState.utmMedium,
                        onChange: (e) => setUtmState(prev => ({ ...prev, utmMedium: e.target.value })),
                        readOnly: !utmState.isManualMode,
                        className: 'w-full px-3 py-2 border border-gray-300 rounded text-sm'
                      })
                    ])
                  ]),
                  
                  // Buttons
                  React.createElement('div', { className: 'flex justify-end space-x-4 mt-6' }, [
                    React.createElement('button', {
                      type: 'button',
                      onClick: handleAutoGenerate,
                      className: 'px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200'
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
            React.createElement(UTMLogTable)
          )
        ])
      )
    ]);
}

  // Mount the application
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(React.createElement(React.StrictMode, null, React.createElement(App)));
})();
