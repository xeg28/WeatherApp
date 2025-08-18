import { useLocation } from "react-router-dom";
import WeatherCard from "../WeatherCard/WeatherCard";
import ForecastDay from "../ForecastDay/ForecastDay";
import './Weather.css';

function Weather() {
  const location = useLocation();
  var forecast = location.state?.forecast;
  console.log(forecast);

  return (
    <div className="weather">
      <WeatherCard 
        current={forecast.current} 
        location={forecast.location} 
        day={forecast.forecast.forecastday[0].day}/>

      <div className="forecast">
        {!forecast.isDateRange && forecast.forecast.forecastday.map((day, index) => {
          return <div key={`forecast-day-${index}`}>
              <ForecastDay day={day.day} date={day.date} showDate={false}/>
            </div>;
        })}

        {forecast.isDateRange && forecast.dateRange.forecastday.map((day, index) => {
          return <div key={`forecast-day-${index}`}>
              <ForecastDay day={day.day} date={day.date} showDate={true}/>
            </div>;
        })
        }
      </div>
    </div>
  )
}

export default Weather;