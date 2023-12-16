import WeatherForecastApi from "./weather/weather-forecast-api";
import Cities from "./cities";
import setupScene from "./scene/setup-scene";
import CityGeoCoordinates from "./types/city-geo-coordinates";

showCurrentTemperatureInTaganrog(Cities.taganrog);

function showCurrentTemperatureInTaganrog(city: CityGeoCoordinates) {
    new WeatherForecastApi(city).getCurrentWeather()
        .then(currentWeather => setupScene(currentWeather.temperature.toString()))
        .catch(error => console.error(error));
}
