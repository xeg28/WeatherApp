import { useEffect, useState } from "react";
import { getFromDB, deleteFromDB, updateDB } from "../../services/DatabaseAPI";
import { dateRangeRequest } from '../../services/WeatherAPI';
import './Database.css';

function Database() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ location: "", start: "", end: "" });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getFromDB();
        const jsonData = await result.json();
        setData(jsonData);
        console.log(jsonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    try {
      await deleteFromDB(id);
      setData((prev) => prev.filter((entry) => entry.id !== id));
    } catch (err) {
      alert("Error deleting entry: " + err.message);
    }
  };

  if (loading) return <div className="loader"><div className="spinner"></div></div>;
  if (error) return <p className="status error">Error: {error}</p>;

  const handleEdit = (entry) => {
    setEditingId(entry.id);
    setEditForm({
      location: typeof entry.location === "string" ? entry.location : `${entry.location.name} ${entry.location.region}`,
      start: entry.start_date,
      end: entry.end_date,
    });
  };

  const handleSave = async (id) => {
    try {
      // fetch new data from WeatherAPI
      const startDate = new Date(editForm.start + 'T12:00:00');
      const endDate = new Date(editForm.end + 'T12:00:00');

      if (isNaN(startDate) || isNaN(endDate)) {
        alert("start and end dates are required");
        return;
      }
      else if (startDate > endDate) {
        alert("start and end dates are not valid.");
        return;
      }
      setUpdateLoading(true);
      const newData = await dateRangeRequest(
        editForm.location,
        startDate,
        endDate
      );


      // build updated object for DB
      const updated = {
        location: newData.location,
        start_date: editForm.start,
        end_date: editForm.end,
        temperature: newData.dateRange.forecastday,
      };

      // update in DB
      await updateDB(id, updated);

      // update state
      setData((prev) =>
        prev.map((entry) => (entry.id === id ? { ...entry, ...updated } : entry))
      );

      setEditingId(null);
    } catch (err) {
      alert("Error updating: " + err.message);
    }
    finally {
      setUpdateLoading(false);
    }
  };

  return (
  <div className="database-page">
    <h2>Stored Weather Data</h2>

    {data.length === 0 ? (
      <p className="empty-text">No weather records found. 🌤️</p>
    ) : (
      <ul>
        {data.map((entry) => (
          <li key={entry.id}>
            {editingId === entry.id ? (
              <>
                {/* Editable fields */}
                <div className="edit-fields">
                  <input
                    className="edit-input"
                    type="text"
                    value={editForm.location}
                    onChange={(e) =>
                      setEditForm({ ...editForm, location: e.target.value })
                    }
                  />
                  <div className="dates">
                    <input
                      className="edit-input"
                      type="date"
                      value={editForm.start}
                      onChange={(e) =>
                        setEditForm({ ...editForm, start: e.target.value })
                      }
                    />
                    <input
                      className="edit-input"
                      type="date"
                      value={editForm.end}
                      onChange={(e) =>
                        setEditForm({ ...editForm, end: e.target.value })
                      }
                    />
                  </div>
                  {!updateLoading ? (
                    <div className="db-btns">
                      <button onClick={() => handleSave(entry.id)}>💾 Save</button>
                      <button onClick={() => setEditingId(null)}>❌ Cancel</button>
                    </div>
                  ) : (
                    <div className="spinner dark"></div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Normal view */}
                <div className="entry-header">
                  <h3>
                    {typeof entry.location === "string"
                      ? entry.location
                      : `${entry.location.name}, ${entry.location.region}, ${entry.location.country}`}
                  </h3>
                </div>
                <p>
                  {entry.start_date} → {entry.end_date}
                </p>
                <ul>
                  {entry.temperature?.map((day) => (
                    <li key={day.date}>
                      <strong>{day.date}</strong> — Max: {day.day.maxtemp_f}°F, Min:{" "}
                      {day.day.mintemp_f}°F, Avg: {day.day.avgtemp_f}°F
                    </li>
                  ))}
                </ul>
                <div className="db-btns">
                  <button onClick={() => handleEdit(entry)}>✏️ Edit</button>
                  <button onClick={() => handleDelete(entry.id)}>🗑 Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
);
}

export default Database;