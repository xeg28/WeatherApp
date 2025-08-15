import './ForecastDay.css';

const days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
function getDayOfWeek(date) {
  let day = new Date(date + 'T12:00:00').getDay();
  let today = new Date().getDay();
  if (day === today) {
    return 'Today'
  }
  return days[day];
}

function ForecastDay({ day, date }) {

  return (
    <div className="forecast-day">
      <div>{getDayOfWeek(date)}</div>

      <div className="forecast-info">
        <div className="rain-chance">
          <img src="/svg/rain.svg" alt="rain" />
          <span>{day.daily_chance_of_rain}%</span>
        </div>
        <div className='forecast-condition'>
          <img src={day.condition.icon} alt="condition" />
        </div>
        <div>
          <span>&uarr;{Math.round(day.maxtemp_f)}&deg; &darr;{Math.round(day.mintemp_f)}&deg;</span>
        </div>
      </div>
    </div>
  );
}

export default ForecastDay;