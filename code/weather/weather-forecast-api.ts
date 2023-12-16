import CityGeoCoordinates from "../types/city-geo-coordinates";
import CurrentWeather from "../types/weather-forecast-api/current-weather";
import TypeCheckerWeatherForecastApi from "./type-checker-weather-forecast-api";
import WeatherForecastApiError from "./weather-forecast-api-error";

export default class WeatherForecastApi {
    constructor(city: CityGeoCoordinates) {
        this.setCity(city);
        this.setTimezone();
    }

    public setCity = (city: CityGeoCoordinates) => {
        this.endPoint.searchParams.set('latitude', city.latitude);
        this.endPoint.searchParams.set('longitude', city.longitude);

        return this;
    }

    public setTimezone = (timezone: string = 'Europe/Moscow') => {
        this.endPoint.searchParams.set('timezone', timezone);

        return this;
    }

    public getCurrentWeather = async (): Promise<CurrentWeather> => {
        return fetch(this.endPoint.href)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(((weatherData: any) => {
                if (!this.typeChecker.hasCurrentWeather(weatherData)) {
                    throw new WeatherForecastApiError('Incorrect resonance: field current_weather is omit');
                }

                if (!this.typeChecker.isSuccessResponse(weatherData)) {
                    throw new WeatherForecastApiError('Incorrect resonance');
                }

                return weatherData['current_weather'] as CurrentWeather;
            }));
    }

    private endPoint = new URL('?current_weather=true','https://api.open-meteo.com/v1/forecast');
    private typeChecker = new TypeCheckerWeatherForecastApi();
}
