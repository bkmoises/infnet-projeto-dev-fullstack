import React from 'react';

interface LogoutProps {
  onLogout: () => void;
}

const Logout: React.FC<LogoutProps> = React.memo(({ onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    onLogout();
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
      aria-label="Logout"
    >
      Logout
    </button>
  );
});

export default Logout;
