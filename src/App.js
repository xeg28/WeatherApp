import './App.css';
import {HashRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/Form/Form';
import Weather from './components/Weather/Weather'

function App() {
  document.title = "Weather App"
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Form/>}/>
          <Route path="/weather" element={<Weather/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
