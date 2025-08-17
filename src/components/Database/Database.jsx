import { useEffect, useState } from "react";
import { getFromDB } from "../../services/DatabaseAPI";
import './Database.css';

function Database() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getFromDB();
        const jsonData = await result.json();
        setData(jsonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="loader"><div className="spinner"></div></div>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="database-page">
      <h2>Stored Weather Data</h2>
      {data.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <ul>
          {data.map((entry) => (
            <li key={entry.id}>
              <h3>{`${entry.location.name}, ${entry.location.region}, ${entry.location.country}`}</h3>
              <p>
                {entry.start_date} → {entry.end_date}
              </p>
              <ul>
                {entry.temperature?.map((day) => (
                  <li key={day.date}>
                    <strong>{day.date}</strong> — 
                    Max: {day.day.maxtemp_f}°F, 
                    Min: {day.day.mintemp_f}°F, 
                    Avg: {day.day.avgtemp_f}°F
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Database;
