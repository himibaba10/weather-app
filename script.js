let input = document.querySelector(".input-search input");
let submitBtn = document.querySelector(".input-search button");
let notAvailableText = document.getElementById("not-available");

const apiKey = "a5c38d9981af1529364df00bd5245260";

async function getWeatherData(city) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiURL);

  //   Fetch data
  let request = await fetch(apiURL);
  let data = await request.json();
  console.log(data);
  if (data.message == "city not found") {
    notAvailableText.style.display = "block";
  } else {
    notAvailableText.style.display = "none";
    document.getElementById("weather-degree").innerHTML = `${Math.round(
      data.main.temp
    )}° celcius`;

    document.getElementById("weather-country").innerHTML = city;
    document.querySelector(
      ".humidity-wrapper h3"
    ).innerHTML = `${data.main.humidity}%`;
    document.querySelector(
      ".wind-speed-wrapper h3"
    ).innerHTML = `${data.wind.speed} km/h`;

    const weatherImg = document.getElementById("weather-img");
    switch (data.weather[0].main) {
      case "Clear":
        weatherImg.src = "./images/clear.png";
        break;
      case "Haze":
        weatherImg.src = "./images/clouds.png";
        break;
      case "Clouds":
        weatherImg.src = "./images/clouds.png";
        break;
      case "Drizzle":
        weatherImg.src = "./images/drizzle.png";
        break;
      case "Mist":
        weatherImg.src = "./images/mist.png";
        break;
      case "Rain":
        weatherImg.src = "./images/rain.png";
        break;
      case "Snow":
        weatherImg.src = "./images/snow.png";
        break;
    }
  }
}

submitBtn.addEventListener("click", function () {
  getWeatherData(input.value);
});

input.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    getWeatherData(input.value);
  }
});
