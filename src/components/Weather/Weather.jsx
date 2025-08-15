import { useLocation } from "react-router-dom";
import WeatherCard from "../WeatherCard/WeatherCard";
import ForecastDay from "../ForecastDay/ForecastDay";
import './Weather.css';
function Weather() {
  const location = useLocation();
  const forecast = location.state?.forecast;
  console.log(forecast);
  return (
    <div className="weather">
      <WeatherCard 
        current={forecast.current} 
        location={forecast.location} 
        day={forecast.forecast.forecastday[0].day}/>

      <div className="forecast">
        {forecast.forecast.forecastday.map((day, index) => {
          return <div key={`forecast-day-${index}`}>
              <ForecastDay day={day.day} date={day.date}/>
            </div>;
        })}
      </div>
    </div>
  )
}

export default Weather;