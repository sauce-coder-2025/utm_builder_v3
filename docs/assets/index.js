import React, { useState } from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0';

const App = () => {
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));

  const handleLogin = (email) => {
    setUserEmail(email);
    localStorage.setItem("userEmail", email);
  };

  if (!userEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-6">
          <h1 className="text-2xl font-bold text-center mb-4">UTM Builder</h1>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <form onSubmit={(e) => {
              e.preventDefault();
              const email = e.target.email.value;
              if (email.endsWith("@fisherpaykel.com")) {
                handleLogin(email);
              } else {
                alert("Please use a Fisher & Paykel email address");
              }
            }}>
              <input
                type="email"
                name="email"
                placeholder="Enter your F&P email"
                className="w-full p-2 border rounded mb-4"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">UTM Builder</h1>
          <div className="flex items-center">
            <span className="mr-4">{userEmail}</span>
            <button
              onClick={() => {
                setUserEmail(null);
                localStorage.removeItem("userEmail");
              }}
              className="text-blue-500 hover:text-blue-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">
        Content goes here
      </main>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
