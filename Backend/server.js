require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// CREATE - Save weather entry
app.post('/weather', async (req, res) => {
  const { location, start_date, end_date, temperature } = req.body;
  const { data, error } = await supabase
    .from('weather_data')
    .insert([{ location, start_date, end_date, temperature }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// READ - Get all weather entries
app.get('/weather', async (req, res) => {
  const { data, error } = await supabase
    .from('weather_data')
    .select('*')
    .order('id', { ascending: false });

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// UPDATE - Modify a weather entry
app.put('/weather/:id', async (req, res) => {
  const { id } = req.params;
  const { location, start_date, end_date, temperature } = req.body;
  const { data, error } = await supabase
    .from('weather_data')
    .update({ location, start_date, end_date, temperature })
    .eq('id', id);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// DELETE - Remove a weather entry
app.delete('/weather/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('weather_data')
    .delete()
    .eq('id', id);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
