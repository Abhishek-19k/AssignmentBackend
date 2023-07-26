const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const WEATHER_API_KEY = "a4d1ec6bcf1c41efa7e42917232507"; // Replace this with your actual API key

app.use(cors());

// Defining the API endpoint
app.get('/api/weather', async (req, res) => {
  const { location } = req.query;

  try {
    const weatherData = await getWeatherData(location);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Function to fetch weather data from the external API
async function getWeatherData(location) {
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${location}&aqi=no`;

  try {
    const response = await axios.get(apiUrl);
    const { data } = response;
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    return {
      weather: data.current.condition.text,
      temperature: data.current.temp_c,
      humidity: data.current.humidity,
    };
  } catch (error) {
    throw new Error('Failed to fetch weather data: ' + error.message);
  }
}


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
