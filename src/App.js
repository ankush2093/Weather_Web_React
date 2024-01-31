// import axios from "axios";
// import './App.css';
// import "bootstrap/dist/css/bootstrap.min.css"
// import { useEffect, useState } from "react";

// function App() {

//   const apiKey = "5fa957a6cbd2c5e398e28868eded2766"
//   const [inputCity, setInputCity] = useState("")
//   const [data, setData] = useState({})



//   const getWetherDetails = (cityName) => {
//     if (!cityName) return
//     const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
//     axios.get(apiURL).then((res) => {
//       console.log("response", res.data)
//       setData(res.data)
//     }).catch((err) => {
//       console.log("err", err)
//     })
//   }

//   const handleChangeInput = (e) => {
//     console.log("value", e.target.value)
//     setInputCity(e.target.value)
//   }

//   const handleSearch = () => {
//     getWetherDetails(inputCity)
//   }

//   const getWindDirection = (degrees) => {
//     const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
//     const index = Math.round(degrees / 45) % 8;
//     return directions[index];
// }


//   return (
//     <div className="col-md-12">
//     <div className="wetherBg">
//       <h1 className="heading">Weather App</h1>

//       <div className="d-grid gap-3 col-4 mt-4">
//         <input type="text" className="form-control"
//           value={inputCity}
//           onChange={handleChangeInput} />
//         <button className="btn btn-primary" type="button"
//           onClick={handleSearch}
//         >Search</button>
//       </div>
//     </div>

//     {Object.keys(data).length > 0 &&
//       <div className="col-md-12 text-center mt-5">

//         <div className="shadow rounded wetherResultBox">
//           <img className="weathorIcon"
//             src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" />

//           <h5 className="weathorCity">
//             {data?.name}
//           </h5>
//           <h6 className="weathorTemp">{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6>

//           <h3 className="">Max Tem {((data?.main?.temp_max) - 273.15).toFixed(2)}°C & Min Tem {((data?.main?.temp_min) - 273.15).toFixed(2)}°C </h3>
//           <h3 className=""> Humidity: {((data?.main?.humidity) )} % </h3>
//           {/* <h3 className=""> Wind Speed: {((data?.wind?.speed) )} m/s </h3> */}
//          <h3> Wind: {data?.wind?.speed} m/s {getWindDirection(data?.wind?.deg)}</h3>
//           <h3 className="">Description: {data?.weather[0]?.description ?? 'N/A'} </h3>

//         </div>
//       </div>
//     }

// {forecast.length > 0 && (
//         <div className="col-md-12 text-center mt-5">
//           <h2>5-Day Forecast</h2>
//           <div className="row">
//             {forecast.slice(0, 5).map((forecastItem, index) => (
//               <div className="col-md-2" key={index}>
//                 <div className="shadow rounded weatherResultBox">
//                   <h6>{forecastItem?.dt_txt}</h6>
//                   <p>
//                     Temp:{" "}
//                     {(forecastItem?.main?.temp - 273.15).toFixed(2)}°C
//                   </p>
//                   <p>
//                     Max Temp:{" "}
//                     {(forecastItem?.main?.temp_max - 273.15).toFixed(2)}°C
//                   </p>
//                   <p>
//                     Min Temp:{" "}
//                     {(forecastItem?.main?.temp_min - 273.15).toFixed(2)}°C
//                   </p>
//                   <p>Humidity: {forecastItem?.main?.humidity} %</p>
//                   <p>
//                     Wind: {forecastItem?.wind?.speed} m/s{" "}
//                     {getWindDirection(forecastItem?.wind?.deg)}
//                   </p>
//                   <p>
//                     Description: {forecastItem?.weather[0]?.description ?? "N/A"}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//   </div>

//   );
// }

// export default App;
import axios from "axios";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import weatherIcon from './img/pngwing.com.png';

function App() {
  const apiKey = "5fa957a6cbd2c5e398e28868eded2766";
  const [inputCity, setInputCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState([]);

  const getWeatherDetails = (cityName) => {
    if (!cityName) return;
    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

    axios.all([axios.get(currentWeatherURL), axios.get(forecastURL)])
      .then(axios.spread((currentRes, forecastRes) => {
        console.log("Current Weather response", currentRes.data);
        console.log("Forecast response", forecastRes.data);
        setCurrentWeather(currentRes.data);
        setForecast(forecastRes.data.list);

      }))
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    // Fetch default city weather on initial load
    getWeatherDetails("Begusarai");
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  const handleChangeInput = (e) => {
    setInputCity(e.target.value);
  };

  const handleSearch = () => {
    getWeatherDetails(inputCity);
  };

  const getWindDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  return (
    <div className="col-md-12">
      <div className="weatherBg">
        <h1 className="heading">Weather App</h1>
        <div className="d-grid gap-3 col-4 mt-4">
          <h4 className="enterCity">Enter Your City &#9759;</h4>
          <input
            type="text"
            className="form-control"
            value={inputCity}
            onChange={handleChangeInput}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {Object.keys(currentWeather).length > 0 && (
        <div className="col-md-12 text-center mt-5">
          <div className="shadow rounded weatherResultBox">
            <img
              className="weatherIcon"
              src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png"
              alt="Weather Icon"
            />

            <h5 className="weatherCity">{currentWeather?.name}</h5>

            <h6 className="weatherTemp">
              {(currentWeather?.main?.temp - 273.15).toFixed(2)}°C <img alt="logo" className="imgtemlogo" src={weatherIcon}></img>
            </h6>
            <div className="resultBox">
              <h3 >
                Max Temp:{" "}
                {(currentWeather?.main?.temp_max - 273.15).toFixed(2)}°C <i class="fa-solid fa-temperature-arrow-up" id="maxtemp" /> <br></br>Min
                Temp: {(currentWeather?.main?.temp_min - 273.15).toFixed(2)}°C <i class="fa-solid fa-temperature-arrow-down" id="mintemp" />
              </h3>
              <h3 >Humidity: {currentWeather?.main?.humidity} % </h3>
              <h3>
                Wind Speed: {currentWeather?.wind?.speed} M/s <i class="fa-solid fa-flag-checkered" id="windspeed" /> <br></br>{" Direction: "}
                {getWindDirection(currentWeather?.wind?.deg)} <i class="fa-regular fa-compass" id="direction"></i>
              </h3>
              <h3>
                Description: {currentWeather?.weather[0]?.description ?? "N/A"}
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* Display forecast data */}
      {/* {forecast.length > 0 && ( */}
        <div id="main-forecast" className="col-md-12 text-center mt-5">
          <h2>6-Day Forecast</h2>
          <div className="row">
            {forecast.slice(0, 6).map((forecastItem, index) => (
              <div className="col-md-4" key={index}>
                <div className="shadow rounded weatherResultBox">
                  <h6>{forecastItem.dt_txt}</h6>

                  <p>Temp: {(forecastItem.main.temp - 273.15).toFixed(2)}°C</p>
                  <p>Description: {forecastItem.weather[0].description}</p>
                  <i class="fa-solid fa-cloud-moon fa-3x" id="icon"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      {/* )} */}

    </div>
  );
}

export default App;
