const apiKey = "e51892fc7e1608f63016beeab51bdb4c";

const weatherDataElement = document.querySelector(".weather-data");
const cityNameElement = document.querySelector("#city-name");
const formElement = document.querySelector("form");
const imgIconElement = document.querySelector(".icon");
const detailsElement = document.querySelector(".details");

formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    const cityValue = cityNameElement.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error("Network problem");
        }
        const data = await response.json();

        const temperature = Math.floor(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like: ${Math.floor(data.main.feels_like)} ℃`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`
        ];

        weatherDataElement.innerHTML = `<strong>${temperature} ℃<br><br>${description}</strong>`;
        imgIconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="weather icon">`;
        detailsElement.innerHTML = details.map(detail => {
            return `<div>${detail}</div>`;
        }).join("");
    } catch (err) {
       weatherDataElement.querySelector(".temp").textContent=""
       imgIconElement.innerHTML=""
       weatherDataElement.querySelector(".desc").textContent= "An Error occurred!"

    }
}
