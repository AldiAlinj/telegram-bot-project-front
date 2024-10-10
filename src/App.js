import React  from 'react';
import {
 
  Route,
  Routes
} from "react-router-dom"
import Home from './pages/Home/Home';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import Friends from './pages/Friends/Friends';
import Tasks from './pages/Tasks/Tasks';
import Navbar from './components/Navbar/Navbar';
import './app.css'
import Airdrop from './pages/Airdrop/Airdrop';

const App = () => {

  // useEffect(() => {
    // Check if Telegram.WebApp.initData is defined
  //   if (window.Telegram && window.Telegram.WebApp) {
  //     const initData = window.Telegram.WebApp.initData;

  //     // Check if initData is not empty
  //     if (initData) {
  //       try {
  //         const webAppData = JSON.parse(decodeURIComponent(initData));

  //         // Set username if it exists
  //         if (webAppData && webAppData.user) {
  //           setUsername(webAppData.user.username || 'No Username');
  //         } else {
  //           setUsername('No Username');
  //         }
  //       } catch (error) {
  //         alert('Error parsing initData:', error);
  //         setUsername('Error fetching username');
  //       }
  //     } else {
  //       setUsername('No Init Data');
  //     }
  //   } else {
  //     setUsername('Telegram Web App not initialized');
  //   }
  // }, []);

  return (
    <div className="container-fluid px-0">
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/leaderboard' element={<Leaderboard />} />
      <Route path='/friends' element={<Friends />} />
      <Route path='/tasks' element={<Tasks />} />
      <Route path='/airdrop' element={<Airdrop />} />
    </Routes>
    <Navbar />
    </div>
  );
};

export default App;
