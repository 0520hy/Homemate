import './App.css';
import Portfolio from './pages/Portfolio'
import Page1 from './pages/Page1'
import Page2 from './pages/Page2'
import Page3 from './pages/Page3'
import {  Route, Routes } from 'react-router-dom';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} />
      </Routes>
    
  );
}

export default App;
