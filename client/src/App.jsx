import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UrlShortener from './components/UrlShortener';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UrlShortener />} />
      </Routes>
    </Router>
  );
};

export default App;
