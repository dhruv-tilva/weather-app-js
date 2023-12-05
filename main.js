let timeDisplay = document.getElementById("watch")
let input = document.getElementById("input")
let cityName = document.getElementById("cityName")
let yesTempCel = document.getElementById("yes-temp-cel")
let yesTempFeh = document.getElementById("yes-temp-feh")
let yesFeels = document.getElementById("yes-feels")
let yesHumidity = document.getElementById("yes-humidity")
let yesWind = document.getElementById("yes-wind")
let todayTempCel = document.getElementById("today-temp-cel")
let todayTempFeh = document.getElementById("today-temp-feh")
let todayFeels = document.getElementById("today-feels")
let todayHumidity = document.getElementById("today-humidity")
let todayWind = document.getElementById("today-wind")
let tomTempCel = document.getElementById("tom-temp-cel")
let tomTempFeh = document.getElementById("tom-temp-feh")
let tomFeels = document.getElementById("tom-feels")
let tomHumidity = document.getElementById("tom-humidity")
let tomWind = document.getElementById("tom-wind")
let warning = document.getElementById("warning");

input.focus();


const lastDate = new Date().getDate() - 1 < 10 ? "0" + new Date().getDate() - 1 : (new Date().getDate() - 1);
const thisMonth = (new Date().getMonth() + 1) < 10 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1);
const yesterday = new Date().getFullYear() + "-" + thisMonth + "-" + lastDate;

const nexeDate = new Date().getDate() + 1 < 10 ? "0" + new Date().getDate() + 1 : (new Date().getDate() + 1);
const tomorrow = new Date().getFullYear() + "-" + thisMonth + "-" + nexeDate

function timeShow() {
    let hour = new Date().getHours() < 10 ? "0" + new Date().getHours() : new Date().getHours();
    let minutes = new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes()

    let date = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate()

    let months = (new Date().getMonth() + 1) < 10 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)

    let year = new Date().getFullYear()
    timeDisplay.innerText = hour + ":" + minutes + "  " + date + "/" + months + "/" + year
}

setInterval(timeShow, 1000)

window.addEventListener("DOMContentLoaded", timeShow)


async function getData(city) {
    if (input.value !== "") {
        document.getElementById("loader").style.display = "flex"
        document.getElementById("data").style.display = "none"
        const data = await fetch(`https://api.weatherapi.com/v1/current.json?key=d9e8f5da32de41f788c63921232509&q=${city}`)
        const res = await data.json();


        // weather for yeasterday
        const yesWeather = await fetch(`https://api.weatherapi.com/v1/history.json?key=d9e8f5da32de41f788c63921232509&q=${city}&dt=${yesterday}`)
        const yesWeatherData = await yesWeather.json()

        // weather for tomorrow
        const tomorowWeather = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d9e8f5da32de41f788c63921232509&q=${city}&dt=${tomorrow}`)
        const tomorowWeatherData = await tomorowWeather.json()

        document.getElementById("loader").style.display = "none"
        document.getElementById("data").style.display = "block"
        if (data.status == 200 && yesWeather.status == 200 && tomorowWeather.status == 200) {

            warning.innerHTML = "Weather for " + `<strong>${res.location.name}</strong>`
            warning.classList.remove("text-red-500")
            warning.classList.add("text-black")
            input.value = ""

            todayTempCel.innerHTML = "Temperature(c): " + res.current.temp_c + ` &#x2103;`
            todayTempFeh.innerHTML = "Temperature(f): " + res.current.temp_f + ` &#x2109;`
            todayFeels.innerHTML = "Feels like Temp.(c): " + res.current.feelslike_c + ` &#x2103;`
            todayHumidity.innerHTML = "Humidity: " + res.current.humidity
            todayWind.innerHTML = "Wind Speed: " + res.current.wind_kph + " km/h"
            // console.log(res);

            yesTempCel.innerHTML = "Temperature(c): " + yesWeatherData.forecast.forecastday[0].day.avgtemp_c + ` &#x2103;`
            yesTempFeh.innerHTML = "Temperature(f): " + yesWeatherData.forecast.forecastday[0].day.avgtemp_f + ` &#x2109;`
            yesFeels.innerHTML = "Feels like Temp.(c): " + yesWeatherData.forecast.forecastday[0].day.maxtemp_c + ` &#x2103;`
            yesHumidity.innerHTML = "Humidity: " + yesWeatherData.forecast.forecastday[0].day.avghumidity
            yesWind.innerHTML = "Wind Speed: " + yesWeatherData.forecast.forecastday[0].day.maxwind_kph + " km/h"

            tomTempCel.innerHTML = "Temperature(c): " + tomorowWeatherData.forecast.forecastday[0].day.avgtemp_c + ` &#x2103;`
            tomTempFeh.innerHTML = "Temperature(f): " + tomorowWeatherData.forecast.forecastday[0].day.avgtemp_f + ` &#x2109;`
            tomFeels.innerHTML = "Feels like Temp.(c): " + tomorowWeatherData.forecast.forecastday[0].day.maxtemp_c + ` &#x2103;`
            tomHumidity.innerHTML = "Humidity: " + tomorowWeatherData.forecast.forecastday[0].day.avghumidity
            tomWind.innerHTML = "Wind Speed: " + tomorowWeatherData.forecast.forecastday[0].day.maxwind_kph + " km/h"
        } else {
            warning.innerHTML = "Data not found"
            warning.classList.add("text-red-500")
            warning.classList.remove("text-black")
            todayTempCel.innerHTML = "--"
            todayTempFeh.innerHTML = "--"
            todayFeels.innerHTML = "--"
            todayHumidity.innerHTML = "--"
            todayWind.innerHTML = "--"

            yesTempCel.innerHTML = "--"
            yesTempFeh.innerHTML = "--"
            yesFeels.innerHTML = "--"
            yesHumidity.innerHTML = "--"
            yesWind.innerHTML = "--"

            tomTempCel.innerHTML = "--"
            tomTempFeh.innerHTML = "--"
            tomFeels.innerHTML = "--"
            tomHumidity.innerHTML = "--"
            tomWind.innerHTML = "--"
        }
        // console.log(res);
    } else {
        document.getElementById("loader").style.display = "flex"
        document.getElementById("data").style.display = "none"
        warning.innerHTML = "Weather for " + `<strong>Ahmedabad</strong>`
        const data = await fetch(`https://api.weatherapi.com/v1/current.json?key=d9e8f5da32de41f788c63921232509&q=${city}`)
        const res = await data.json()

        // weather for yesterday
        const yesWeather = await fetch(`https://api.weatherapi.com/v1/history.json?key=d9e8f5da32de41f788c63921232509&q=${city}&dt=${yesterday}`)
        const yesWeatherData = await yesWeather.json()

        // weather for tomorrow
        const tomorowWeather = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d9e8f5da32de41f788c63921232509&q=${city}&dt=${tomorrow}`)
        const tomorowWeatherData = await tomorowWeather.json()
        // console.log(tomorowWeatherData.forecast.forecastday[0].day);

        document.getElementById("loader").style.display = "none"
        document.getElementById("data").style.display = "block"

        if (!res || !yesWeatherData || !tomorowWeatherData) {
            document.getElementById("data").style.display = "none"
            document.getElementById("loader").style.display = "block"
        } else {
            document.getElementById("loader").style.display = "none"
            document.getElementById("data").style.display = "block"
        }

        if (data.status == 200 && yesWeather.status == 200 && tomorowWeather.status == 200) {

            // cityName.innerText = "Ahmedabad"
            todayTempCel.innerHTML = "Temperature(c): " + res.current.temp_c + ` &#x2103;`
            todayTempFeh.innerHTML = "Temperature(f): " + res.current.temp_f + ` &#x2109;`
            todayFeels.innerHTML = "Feels like Temp.(c): " + res.current.feelslike_c + ` &#x2103;`
            todayHumidity.innerHTML = "Humidity: " + res.current.humidity
            todayWind.innerHTML = "Wind Speed: " + res.current.wind_kph + " km/h"

            yesTempCel.innerHTML = "Temperature(c): " + yesWeatherData.forecast.forecastday[0].day.avgtemp_c + ` &#x2103;`
            yesTempFeh.innerHTML = "Temperature(f): " + yesWeatherData.forecast.forecastday[0].day.avgtemp_f + ` &#x2109;`
            yesFeels.innerHTML = "Feels like Temp.(c): " + yesWeatherData.forecast.forecastday[0].day.maxtemp_c + ` &#x2103;`
            yesHumidity.innerHTML = "Humidity: " + yesWeatherData.forecast.forecastday[0].day.avghumidity
            yesWind.innerHTML = "Wind Speed: " + yesWeatherData.forecast.forecastday[0].day.maxwind_kph + " km/h"

            tomTempCel.innerHTML = "Temperature(c): " + tomorowWeatherData.forecast.forecastday[0].day.avgtemp_c + ` &#x2103;`
            tomTempFeh.innerHTML = "Temperature(f): " + tomorowWeatherData.forecast.forecastday[0].day.avgtemp_f + ` &#x2109;`
            tomFeels.innerHTML = "Feels like Temp.(c): " + tomorowWeatherData.forecast.forecastday[0].day.maxtemp_c + ` &#x2103;`
            tomHumidity.innerHTML = "Humidity: " + tomorowWeatherData.forecast.forecastday[0].day.avghumidity
            tomWind.innerHTML = "Wind Speed: " + tomorowWeatherData.forecast.forecastday[0].day.maxwind_kph + " km/h"
        } else {
            cityName.innerText = ""
            warning.innerHTML = "Data Not found"
            todayTempCel.innerHTML = "--"
            todayTempFeh.innerHTML = "--"
            todayFeels.innerHTML = "--"
            todayHumidity.innerHTML = "--"
            todayWind.innerHTML = "--"

            yesTempCel.innerHTML = "--"
            yesTempFeh.innerHTML = "--"
            yesFeels.innerHTML = "--"
            yesHumidity.innerHTML = "--"
            yesWind.innerHTML = "--"

            tomTempCel.innerHTML = "--"
            tomTempFeh.innerHTML = "--"
            tomFeels.innerHTML = "--"
            tomHumidity.innerHTML = "--"
            tomWind.innerHTML = "--"
        }
    }
}

getData("Ahmedabad")

window.onload = getData("Ahmedabad")

document.getElementById("search-button").addEventListener("click", () => {
    getData(input.value)
})

input.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        getData(input.value)
    }
})