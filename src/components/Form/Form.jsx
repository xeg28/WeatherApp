import './Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fiveDayForecastRequest, dateRangeRequest } from '../../services/WeatherAPI';
import { insertToDB } from '../../services/DatabaseAPI';
function Form() {
  const [useLocation, setUseLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);

    let startDate = new Date(formData.get('startDate') + 'T12:00:00');
    let endDate = new Date(formData.get('endDate') + 'T12:00:00');


    if (isNaN(startDate) && isNaN(endDate)) {
      defaultRequest(formData);
    }
    else if (!isNaN(startDate) && !isNaN(endDate)) {
      if (startDate > endDate) {
        alert("Start and end dates are invalid.");
        return;
      }

      if (useLocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            setIsLoading(true);
            const response = await dateRangeRequest(`${lat},${lon}`, startDate, endDate);
            setIsLoading(false);
            response['isDateRange'] = true;
            let forecast = response;
            if (response.error) {
              alert(response.error.message);
              return;
            }
            insertToDB(response.location, startDate, endDate, response.dateRange.forecastday);
            navigate('/weather', { state: { forecast } })
          },
          (err) => {
            alert("Can't access your location.\n" + err.message);
          }
        );
      }
      else {
        setIsLoading(true);
        const response = await dateRangeRequest(formData.get('q'), startDate, endDate);
        setIsLoading(false);
        response['isDateRange'] = true;
        let forecast = response;

        if (response.error) {
          alert(response.error.message);
          return;
        }
        insertToDB(response.location, startDate, endDate, response.dateRange.forecastday);
        navigate('/weather', { state: { forecast } })
      }

    }
    else {
      alert("You must enter both start and end dates.");
    }

  }

  const defaultRequest = async (formData) => {
    if (useLocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setIsLoading(true);
          const response = await fiveDayForecastRequest(`${lat},${lon}`);
          if (response.ok) {
            let forecast = await response.json();
            setIsLoading(false);
            navigate('/weather', { state: { forecast } });
          }
          else {
            let res = await response.json();
            setIsLoading(false);
            alert(res.error.message);
          }
        },
        (err) => {
          alert("Can't access your location.\n" + err.message);
        }
      );
    }
    else {
      const response = await fiveDayForecastRequest(formData.get('q'));
      if (response.ok) {
        let forecast = await response.json();
        navigate('/weather', { state: { forecast } });
      }
      else {
        let res = await response.json();
        alert(res.error.message);
      }
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
            required={!useLocation} />
          <div className="dates">
            <div className='date-input'>
              <label htmlFor="startDate">Start Date</label>
              <input type="date" id="startDate" name="startDate" />
            </div>
            <div className='date-input'>
              <label htmlFor="endDate">End Date</label>
              <input type="date" id="endDate" name="endDate" />
            </div>
          </div>
          <div className="checkbox">
            <label htmlFor="useLocation">
              <input type="checkbox" name="useLocation" id="useLocation" onChange={(e) => { setUseLocation(e.target.checked) }} />
              <span>Use current location</span>
            </label>
          </div>
          <button className="form-btn" type="submit">
            {!isLoading ?
              (<span>Submit</span>) :
              (
                <div className="spinner"></div>
              )
            }
          </button>
        </div>
      </div>
    </form>
  );
}

export default Form;