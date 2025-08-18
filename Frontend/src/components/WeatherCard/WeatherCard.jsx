import './WeatherCard.css';

function WeatherCard({ current, location, day }) {

  return (
    <div className="weather-card">
      <span className='location' title={`${location.name}, ${location.region}`}>
        <img src="/svg/location.svg" alt="location"/>
        <h2>{location.name}, {location.region}</h2>
      </span>
      <div className='weather-details'>

        <div className="weather-group">
          <div className='temp'>{Math.round(current.temp_f)}&deg;</div>
          <div>
            <div className='condition'>{current.condition.text}</div>
            <div>&uarr;{Math.round(day.maxtemp_f)}&deg; / &darr;{Math.round(day.mintemp_f)}&deg;</div>
            <div>Feels like {Math.round(current.feelslike_f)}&deg;</div>
          </div>
        </div>
        <div className='weather-icon'>
          <img src={current.condition.icon} alt={current.condition.text} />
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;