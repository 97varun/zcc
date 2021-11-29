import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Tickets from './components/Tickets';

const App = function App() {
  return (
    [<Navbar key="nav" />,
      <Tickets key="tickets" />]
  );
};

export default App;
