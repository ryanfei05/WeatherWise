import React from 'react'
//import './App.css'

const api = {
  key: 'b67f7a44821683ce4c5677582022bc7e',
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const dateBuilder = (d) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
      'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let hours = d.getHours();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;

    return `${hours} ${ampm}, ${day} ${month} ${date} ${year}`

  }



  return (
    <>
      <div className='app'>
        <div className='gradient'>
          <main>
            <div className='search-box'>
              <input
                type='text'
                className='search-bar'
                placeholder='Search for Location'
              />
              <div className='location-box'>
                <div className='location'>
                  Toronto, ON

                </div>
                <div className='date'>

                  {dateBuilder(new Date())}


                </div>


              </div>

            </div>

          </main>

        </div>

      </div>
    </>
  )
}

export default App
