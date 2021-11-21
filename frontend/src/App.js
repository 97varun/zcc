import './App.css';
import Navbar from './Navbar';
import Tickets from './Tickets';

function App() {
  return (
    [<Navbar key="nav"/>,
     <Tickets key="tickets"/>]
  );
}

export default App;
