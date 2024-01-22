import React, { useState, useEffect } from 'react'

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;


const api = {
  key: apiKey,
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        })
    }
  }

  function setTime(date) {



    const dateBuilder = (d) => {
      let months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
      let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
        'Friday', 'Saturday'];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${month} ${date}, ${year}`

    }

    const timeBuilder = (d) => {

      let hours = d.getHours();
      let mins = d.getMinutes();
      let ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      let min = (mins < 10 ? '0' : '') + mins;


      return `${hours}:${min} ${ampm} `
    }


    return (
      <>
        {timeBuilder(date)} <br></br> {dateBuilder(date)}
      </>
    )

  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000);

    return () => clearInterval(intervalId);
  }, []); 



  return (
    <>
      <div className={
        (typeof weather.main != 'undefined')
          ? ((weather.main.temp > 16)
            ? 'app warm'
            : 'app')
        : 'app'}>
        <div className='gradient'>
          <main>
            <div className='search-box'>
              <input
                type='text'
                className='search-bar'
                placeholder='Search for Location'
                onChange={e => setQuery(e.target.value)}
                value={query}
                onKeyDown={search}
              />
            </div>
            {(typeof weather.main != 'undefined') ? (
              <div>
                <div className='location-box'>
                  <div className='location'>
                    {weather.name}, {weather.sys.country}

                  </div>
                  <div className='date'>
                    {setTime(currentTime)}
                  </div>
                  <div className='weather-box'>

                    <div className="temp">
                      {Math.round(weather.main.temp)}°C
                    </div>
                    <div className="weather">{weather.weather[0].main}</div>


                  </div>


                </div>

              </div>


            ) : ('')}



          </main>

        </div>

      </div>
    </>
  )
}

export default App
