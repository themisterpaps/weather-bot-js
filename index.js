require('dotenv').config()
const fetch = require('node-fetch')
const Telegram = require('node-telegram-bot-api')
const bot = new Telegram(process.env.TELEGRAM_TOKEN)
const weatherToken = process.env.WEATHER_API_TOKEN
const weatherURL = new URL('https://api.openweathermap.org/data/2.5/weather')

weatherURL.searchParams.set('id', '1040652')
weatherURL.searchParams.set('APPID', weatherToken)
weatherURL.searchParams.set('units', 'metric')
weatherURL.searchParams.set('lang','pt')

const getWeatherData = async () => {
  const resp = await fetch(weatherURL.toString())
  const body = await resp.json()
  return body
}
const generateWeatherMessage = weatherData =>
  `O Estado do tempo em ${weatherData.name}: ${weatherData.weather[0].description} \n Temperatura é ${weatherData.main.temp}°C \n Min: ${weatherData.main.temp_min}°C \n Max: ${weatherData.main.temp_max}°C \n Humidade: ${weatherData.main.humidity}Pa \n ____ \n Ventos:\n   Velocidade: ${weatherData.wind.speed}Kmh\n   Graus:${weatherData.wind.deg}°`

const main = async () => {
  const weatherData = await getWeatherData()
  const weatherString = generateWeatherMessage(weatherData)
  bot.sendMessage(process.env.TELEGRAM_CHAT_ID, weatherString)
}

main()

