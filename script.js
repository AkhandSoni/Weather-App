const API_KEY = "b0cf810a066c4d6194f71220260701"
const BASE_URL = "https://api.weatherapi.com/v1/current.json"

const tempEl = document.getElementById("temp")
const conditionEl = document.getElementById("condition")
const locationEl = document.getElementById("location")
const aqiE1 = document.getElementById("AQI")

const form = document.getElementById("searchForm")
const input = document.getElementById("searchInput")

async function fetchWeather(city) {
  const res = await fetch(`${BASE_URL}?key=${API_KEY}&q=${city}&aqi=yes`)
  return res.json()
}

async function updateMain(city) {
  const data = await fetchWeather(city)
  tempEl.textContent = `${data.current.temp_c}°C`
  conditionEl.textContent = data.current.condition.text
  locationEl.textContent = `${data.location.name}, ${data.location.country}`
  aqiE1.textContent=`${data.current.air_quality.pm10}`
}

form.addEventListener("submit", e => {
  e.preventDefault()
  if (input.value) updateMain(input.value)
})

updateMain("Delhi,India")

document.querySelectorAll("tbody tr").forEach(async row => {
  const city = row.dataset.city
  const data = await fetchWeather(city)
  row.children[1].textContent = `${data.current.temp_c}°C`
  row.children[2].textContent = data.current.condition.text
  row.children[3].textContent = `${data.location.name}, ${data.location.country}`
  row.children[4].textContent = `${data.current.air_quality.pm10}`
})
