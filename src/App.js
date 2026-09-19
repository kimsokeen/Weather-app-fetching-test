import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [weather, setWeather] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=1.3521&longitude=103.8198&current_weather=true`);
        const data = await response.json();
        setWeather(data);
      } catch (e){
        setError(e);
      } finally {
        setIsLoading(false);
      }
      
    }

    fetchWeather();
    
  }, [])

  if(isLoading) {
    return (
      <p>Loading...</p>
    )
  }

  if(error){
    return (
      <div>
        <p>Try again...</p>
        <p>Error: {error.message}</p>
      </div>
    )
  }
  

  return (
    <div className="App">
      {weather && (
        <div className="weather-card">
          <h2>Current Weather</h2>
          <p>Temperature: {weather.current_weather?.temperature}°C</p>
          <p>Wind Speed: {weather.current_weather?.windspeed} km/h</p>
        </div>
      )}
    </div>
  );
}

export default App;
