import './App.css';
import {HashRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/Form/Form';
import Weather from './components/Weather/Weather';
import Info from './components/Info/Info';
import Navbar from './components/Navbar/Navbar';
import Database from './components/Database/Database';
function App() {
  document.title = "Weather App"
  return (
    <div className="container">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Form/>}/>
          <Route path="/weather" element={<Weather/>}/>
          <Route path="/database" element={<Database/>}/>
        </Routes>
      </Router>
      <Info/>
    </div>
  );
}

export default App;
