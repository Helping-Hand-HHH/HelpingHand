import './App.css';
import HomePage from './HomePage/Homepage.js'
import Chat from './Chat/Chat.js'
import Donate from './Donate/Donate.js'
import Resources from './Resources/Resources.js'
import Affirmations from './Affirmations/Affirmations.js'
import Destress from './Destress/Destress.js'
import Mindfullness from './Mindfullness/Mindfullness.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/affirmations" element={<Affirmations />} />
        <Route path="/destress" element={<Destress />} />
        <Route path="/mindfullness" element={<Mindfullness />} />
      </Routes>
    </Router>
  );
}

export default App;
