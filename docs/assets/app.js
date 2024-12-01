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
const SelectField = ({ label, value, onChange, options, disabled }) => {
  return React.createElement(
    "div",
    { className: "mb-4" },
    React.createElement(
      "label",
      { className: "block text-sm font-medium text-gray-700 mb-1" },
      label
    ),
    React.createElement(
      "select",
      {
        value: value,
        onChange: (e) => onChange(e.target.value),
        disabled: disabled,
        className: "w-full px-3 py-2 border border-gray-300 rounded-md",
      },
      [
        React.createElement("option", { value: "", key: "empty" }, "Select..."),
        ...options.map(option =>
          React.createElement("option", { value: option, key: option }, option)
        )
      ]
    )
  );
};

// Main App component
const App = () => {
  const [userEmail, setUserEmail] = React.useState(localStorage.getItem("userEmail"));
  const [formState, setFormState] = React.useState({
    market: '',
    brand: '',
    channel: '',
    channelType: '',
    campaignName: '',
    utmResult: ''
  });

  const updateField = (field, value) => {
    setFormState(prev => {
      const newState = { ...prev, [field]: value };
      
      // Reset dependent fields
      if (field === 'market') {
        newState.brand = '';
      }
      if (field === 'channel') {
        newState.channelType = '';
      }

      // Generate UTM
      if (newState.market && newState.brand && newState.channel && newState.channelType && newState.campaignName) {
        const baseUrl = 'https://www.fisherpaykel.com';
        const utmParams = new URLSearchParams({
          utm_source: newState.channel.toLowerCase().replace(/ /g, '-'),
          utm_medium: newState.channelType.toLowerCase().replace(/ /g, '-'),
          utm_campaign: `${newState.market.toLowerCase()}_${newState.brand.toLowerCase().replace(/ & /g, '-')}_${newState.campaignName.toLowerCase()}`,
        });
        newState.utmResult = `${baseUrl}?${utmParams.toString()}`;
      }

      return newState;
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formState.utmResult)
      .then(() => alert('UTM copied to clipboard!'))
      .catch(err => console.error('Failed to copy:', err));
  };

  if (!userEmail) {
    return React.createElement(
      "div",
      { className: "min-h-screen flex items-center justify-center bg-gray-50" },
      React.createElement(
        "div",
        { className: "max-w-md w-full p-6" },
        React.createElement(
          "h1",
          { className: "text-2xl font-bold text-center mb-4" },
          "UTM Builder"
        ),
        React.createElement(
          "div",
          { className: "bg-white p-8 rounded-lg shadow-md" },
          React.createElement(
            "form",
            {
              onSubmit: (e) => {
                e.preventDefault();
                const email = e.target.email.value;
                if (email.endsWith("@fisherpaykel.com")) {
                  setUserEmail(email);
                  localStorage.setItem("userEmail", email);
                } else {
                  alert("Please use a Fisher & Paykel email address");
                }
              },
            },
            React.createElement("input", {
              type: "email",
              name: "email",
              placeholder: "Enter your F&P email",
              className: "w-full p-2 border rounded mb-4",
              required: true,
            }),
            React.createElement(
              "button",
              {
                type: "submit",
                className: "w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600",
              },
              "Sign In"
            )
          )
        )
      )
    );
  }

  return React.createElement(
    "div",
    { className: "min-h-screen bg-gray-50" },
    React.createElement(
      "header",
      { className: "bg-white shadow" },
      React.createElement(
        "div",
        { className: "max-w-7xl mx-auto px-4 py-6 flex justify-between items-center" },
        React.createElement(
          "h1",
          { className: "text-2xl font-bold" },
          "UTM Builder"
        ),
        React.createElement(
          "div",
          { className: "flex items-center" },
          React.createElement("span", { className: "mr-4" }, userEmail),
          React.createElement(
            "button",
            {
              onClick: () => {
                setUserEmail(null);
                localStorage.removeItem("userEmail");
              },
              className: "text-blue-500 hover:text-blue-700",
            },
            "Sign Out"
          )
        )
      )
    ),
    React.createElement(
      "main",
      { className: "max-w-7xl mx-auto px-4 py-6" },
      React.createElement(
        "div",
        { className: "bg-white rounded-lg shadow p-6" },
        // Market Selection
        React.createElement(SelectField, {
          label: "Market",
          value: formState.market,
          onChange: (value) => updateField('market', value),
          options: formOptions.markets
        }),
        // Brand Selection
        React.createElement(SelectField, {
          label: "Brand",
          value: formState.brand,
          onChange: (value) => updateField('brand', value),
          options: formState.market ? formOptions.brands[formState.market] : [],
          disabled: !formState.market
        }),
        // Channel Selection
        React.createElement(SelectField, {
          label: "Channel",
          value: formState.channel,
          onChange: (value) => updateField('channel', value),
          options: formOptions.channels
        }),
        // Channel Type Selection
        React.createElement(SelectField, {
          label: "Channel Type",
          value: formState.channelType,
          onChange: (value) => updateField('channelType', value),
          options: formState.channel ? formOptions.channelTypes[formState.channel] : [],
          disabled: !formState.channel
        }),
        // Campaign Name Input
        React.createElement(
          "div",
          { className: "mb-4" },
          React.createElement(
            "label",
            { className: "block text-sm font-medium text-gray-700 mb-1" },
            "Campaign Name"
          ),
          React.createElement("input", {
            type: "text",
            value: formState.campaignName,
            onChange: (e) => updateField('campaignName', e.target.value),
            className: "w-full px-3 py-2 border border-gray-300 rounded-md",
            placeholder: "Enter campaign name"
          })
        ),
        // UTM Result
        formState.utmResult && React.createElement(
          "div",
          { className: "mt-6 p-4 bg-gray-50 rounded-md" },
          React.createElement(
            "div",
            { className: "flex justify-between items-center mb-2" },
            React.createElement("label", { className: "font-medium" }, "Generated UTM URL:"),
            React.createElement(
              "button",
              {
                onClick: copyToClipboard,
                className: "text-blue-500 hover:text-blue-700"
              },
              "Copy to Clipboard"
            )
          ),
          React.createElement(
            "div",
            { className: "break-all text-sm" },
            formState.utmResult
          )
        )
      )
    )
  );
};

// Mount the application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(React.StrictMode, null, React.createElement(App)));
