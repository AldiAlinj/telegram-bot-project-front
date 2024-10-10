import React, { useEffect, useState } from 'react';

const App = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if Telegram.WebApp.initData is defined
    if (window.Telegram && window.Telegram.WebApp) {
      const initData = window.Telegram.WebApp.initData;

      // Check if initData is not empty
      if (initData) {
        try {
          const webAppData = JSON.parse(decodeURIComponent(initData));

          // Set username if it exists
          if (webAppData && webAppData.user) {
            setUsername(webAppData.user.username || 'No Username');
          } else {
            setUsername('No Username');
          }
        } catch (error) {
          alert('Error parsing initData:', error);
          setUsername('Error fetching username');
        }
      } else {
        setUsername('No Init Data');
      }
    } else {
      setUsername('Telegram Web App not initialized');
    }
  }, []);

  return (
    <div>
      <h1>Welcome to the Telegram Web App</h1>
      <p>Your Telegram username: {username}</p>
    </div>
  );
};

export default App;
