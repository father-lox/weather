export default class WeatherForecastApiError extends Error {
    constructor(message) {
        super(message);
        this.name = 'WeatherForecastApiError';
    }
}
