const apiURL = process.env.REACT_APP_BACKEND_API;
export async function insertToDB(location, startDate, endDate, temperatureArray) {
  let data = { "location": location, "start_date": startDate, "end_date": endDate, temperature: temperatureArray }
  const request = await fetch(apiURL,
    {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }
  );

  if(!request.ok) throw new Error("Failed to insert to database.");

  return request;
}

export async function getFromDB() {
  const request = await fetch(apiURL,
     {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    }
  );
  if(!request.ok) throw new Error("Failed to fetch from the databse");
  return request;
}

export async function deleteFromDB(id) {
  const request = await fetch(`${apiURL}/${id}`, {
    method:'DELETE',
    headers: { "Content-Type": "application/json" },
  });

  if(!request.ok) throw new Error("Failed to delete from the databse");
  return request;
}

export async function updateDB(id, updatedData) {
  const request = await fetch(`http://localhost:5000/weather/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!request.ok) throw new Error("Failed to update datababse");
  return request.json();
}