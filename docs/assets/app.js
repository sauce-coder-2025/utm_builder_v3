'use strict';

// Create elements using React.createElement instead of JSX
const App = () => {
  const [userEmail, setUserEmail] = React.useState(localStorage.getItem("userEmail"));

  const handleLogin = (email) => {
    setUserEmail(email);
    localStorage.setItem("userEmail", email);
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
                  handleLogin(email);
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
          React.createElement(
            "span",
            { className: "mr-4" },
            userEmail
          ),
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
      "Content goes here"
    )
  );
};

// Mount the application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(React.StrictMode, null, React.createElement(App)));
