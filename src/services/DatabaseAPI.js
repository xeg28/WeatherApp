const apiURL = process.env.REACT_APP_BACKEND_API;
export async function insertToDB(location, startDate, endDate, temperatureArray) {
  let data = { "location": location, "start_date": startDate, "end_date": endDate, temperature: temperatureArray }
  const request = await fetch(apiURL,
    {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }
  )

  return request;
}

export async function getFromDB() {
  const request = await fetch(apiURL,
     {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    }
  );

  return request;
}