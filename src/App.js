import './App.css';
import HomePage from './Homepage.js'
import Chat from './Chat.js'
import Donate from './Donate.js'
import Resources from './Resources.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </Router>
  );
}

export default App;
