import './Form.css';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
function Form() {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const [useLocation, setUseLocation] = useState(false);
  const navigate = useNavigate();

  const apiRequest = async (e, formData) => {
    formData.set('days', 5);

    var response = await fetch(' http://api.weatherapi.com/v1/forecast.json', {
      method: 'POST',
      body: formData
    });

    let result = await response.json();
    if(response.ok) {
      let forecast = result;
      navigate('/weather', {state: {forecast}})
    }
    else{
      alert(result.error.message);
    }
      
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    try {
      if(useLocation) {
        navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          formData.set('q', `${lat},${lon}`);
          apiRequest(e, formData);
        },
        (err) => {
          console.error("Error getting location:", err.message);
        }
      );
      }

      else {
        apiRequest(e, formData);
      }
    } catch (error) {

    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-wrapper">
        <h2>Enter a Location</h2>
        <div className="input-wrapper">
          <input 
            type="text" 
            name="q" 
            placeholder="Enter Zip Code, GPS Coordinates, City" 
            required={!useLocation}/>

          <input type="hidden" name="key" value={apiKey}/>
          
          <div className="checkbox">
            <input type="checkbox" name="useLocation" id="useLocation" onChange={(e) => {setUseLocation(e.target.checked)}}/>
            <label htmlFor="useLocation">Use current location</label>
          </div>
          <button className="form-btn" type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
}

export default Form;