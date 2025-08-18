const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

export const fiveDayForecastRequest = async (location) => {
    
  var response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=5`);

  return response;
}

function stripTime(date) {
  const d = new Date(date);
  d.setHours(12, 0, 0, 0);
  return d;
}


function cleanForecastDays(forecastdays) {
  return forecastdays.map((day) => ({
    date: day.date,
    day: {
      maxtemp_c: day.day.maxtemp_c,
      mintemp_c: day.day.mintemp_c,
      avgtemp_c: day.day.avgtemp_c,
      maxtemp_f: day.day.maxtemp_f,
      mintemp_f: day.day.mintemp_f,
      avgtemp_f: day.day.avgtemp_f,
      daily_chance_of_rain: day.day.daily_chance_of_rain, 
      condition: day.day.condition, 
    }
  }));
}

export const dateRangeRequest = async (location, start, end) => {
  let today = new Date();
  let results = [];

  let currentRequest = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1`);

  let data = await currentRequest.json();

  if(!currentRequest.ok) {
    throw new Error(data.error.message);
  }


  // Case 1: Entirely past range → use History API (loop per day)
  if (stripTime(end) < stripTime(today)) {
    let current = new Date(start);
    while (stripTime(current) <= stripTime(end)) {
      const dateStr = current.toISOString().split("T")[0];
      const url = `http://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${location}&dt=${dateStr}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.forecast?.forecastday) {
        results.push(data.forecast.forecastday[0]);
      }
      current.setDate(current.getDate() + 1);
    }
    
  }

  // Case 2: Entirely future range → use Forecast API (one call)
  else if (stripTime(start) >= stripTime(today)) {
    const diffDays =
      Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1; // inclusive
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=${diffDays}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.forecast?.forecastday) {
      // filter out only days inside requested range
      results = data.forecast.forecastday.filter(
        d => stripTime(new Date(d.date + 'T12:00:00')) >= stripTime(start) && stripTime(new Date(d.date + 'T12:00:00')) <= stripTime(end)
      );
    }
  
  }

  // Case 3: Mixed past + future → do both
  else {
    // Past part
    let current = new Date(start);
    while (stripTime(current) < stripTime(today)) {
      const dateStr = current.toISOString().split("T")[0];
      const url = `http://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${location}&dt=${dateStr}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.forecast?.forecastday) {
        results.push(data.forecast.forecastday[0]);
      }
      current.setDate(current.getDate() + 1);
    }

    // Future part
    const diffDays =
      Math.ceil((end - today) / (1000 * 60 * 60 * 24)) + 1;
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=${diffDays}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.forecast?.forecastday) {
      results = results.concat(
        data.forecast.forecastday.filter(
          d => stripTime(new Date(d.date + 'T12:00:00')) >= stripTime(start) && stripTime(new Date(d.date + 'T12:00:00')) <= stripTime(end)
        )
      );
    }

  }
  data['dateRange'] = {forecastday: cleanForecastDays(results)};
  return data;
}