/* Variables to call APIS */
const apiKey = "772920597e4ec8f00de8d376dfb3f094";
const geoKey = "8cbd6c5b448c4b3b853e8be4b6b3c674";
const apiWeather = "https://api.openweathermap.org/data/2.5/weather?";
let mode;

/* Get elements and values from HTML */

document.addEventListener("DOMContentLoaded", getBG());
const searchWeather = document.querySelector("#go");
const cityInput = document.querySelector("#city-name");
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherElement = document.querySelector("#weather-icon");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const changedTemp = document.querySelector("#temperature");
const pressElement = document.querySelector("#conditions span");

/* Events Listening */

searchWeather.addEventListener("click", async function (){
  mode = 1;
  const city = cityInput.value;
  const geoInfo = await getGeoCode(encodeURI(city));
  console.log("COORDENADAS", geoInfo);
  const latitude = geoInfo.results[0].geometry.lat;
  const longitude = geoInfo.results[0].geometry.lng;

  const weather = await getWeather(latitude, longitude);
  document.getElementById("hide").style.display= "block";
  getTempColor(parseInt(weather.main.temp));
  cityElement.innerHTML = weather.name;
  descElement.innerHTML = weather.weather[0].description;
  tempElement.innerHTML = parseInt(weather.main.temp) + "&deg;C";
  humidityElement.innerHTML = `${weather.main.humidity}%`;
  windElement.innerHTML = `${weather.wind.speed}km/hr`;
  pressElement.innerHTML = `${weather.main.pressure}hPA`;
  console.log("TEMPO", weather);
  // tempElement = innerHTML
})

changedTemp.addEventListener("click", function (){
  let nbr = parseInt(tempElement.innerHTML);
  console.log(nbr);
  if (mode == 0)
  {  
    mode++;
    tempElement.innerHTML = (((nbr - 32) * 5 / 9).toFixed() + "&deg;C");
  }
  else
  {
    mode--;
    tempElement.innerHTML = ((nbr * 9 / 5 + 32).toFixed() + "&deg;F");
  }
})

cityInput.addEventListener("input", function (){
  document.getElementById("city-name").style.fontWeight = "bold";
  if (cityInput.value == "")
    document.getElementById("city-name").style.fontWeight = "100";

})

/* Functions */

const getWeather = async (latitude, longitude) => {
  const resp = await fetch (apiWeather + "&units=metric&lang=pt&appid=" + `${apiKey}` + "&lat=" + `${latitude}` + "&lon=" + `${longitude}`);
  const data = await resp.json();
  return (data);
}

const getGeoCode = async (city) => {
  console.log(city);
  const resp = await fetch (`https://api.opencagedata.com/geocode/v1/json?key=${geoKey}&q=${city}}&pretty=1&no_annotations=1`);
  const data = await resp.json();
  return (data);
}

function getTempColor(temp)
{
  console.log("ENTRA UM TEMPO", document.getElementById("container"));
  if (temp > 35)
    document.getElementById("container").style.background = "linear-gradient(0deg, rgb(255, 0, 0, 0.6) 0%, rgb(204, 0, 0, 0.6) 35%, rgb(102, 0, 0, 0.6) 100%)";
  else if(temp < 15)
    document.getElementById("container").style.background = "linear-gradient(0deg, rgb(0, 102, 204, 0.6) 0%, rgb(0, 76, 153, 0.6) 35%, rgb(0, 0, 204, 0.6) 100%)";
  else
    document.getElementById("container").style.background = "linear-gradient(0deg, rgb(255, 255, 0, 0.6) 0%, rgb(255, 255, 102, 0.6) 35%, rgb(255, 255, 51, 0.6) 100%)";
}


async function callBing (){
  try {
    const response = await fetch("http://localhost:9090/https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=pt-US", {
      method: 'GET',
    });
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
  } catch(error) {
    console.error(error);
  }
}
    
async function getBG(){
  const img = await callBing();
  const teste = img.images[0];
  const testa = JSON.stringify(teste);
  const testing = JSON.parse(testa);
  const ready = ("https://www.bing.com/" + testing.url);
  document.body.style.backgroundImage = `url('${ready}')`;
}