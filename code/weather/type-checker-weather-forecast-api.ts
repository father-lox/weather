import TypeChecker from "../type-checker";
import ResponseWeatherForecastApi from "../types/weather-forecast-api/response-weather-forecast-api";

export default class TypeCheckerWeatherForecastApi extends TypeChecker {
    constructor() {
        super();
    }

    isSuccessResponse(data: any): data is ResponseWeatherForecastApi {
        const hasLatitude = this.isExists('latitude', data, 'number');
        const hasLongitude = this.isExists('longitude', data, 'number');
        const hasGenerationtimeMs = this.isExists('generationtime_ms', data, 'number');
        const hasUtcOffsetSeconds = this.isExists('utc_offset_seconds', data, 'number');
        const hasTimezone = this.isExists('timezone', data, 'string');
        const hasTimezoneAbbreviation = this.isExists('timezone_abbreviation', data, 'string');
        const hasElevation = this.isExists('elevation', data, 'number');

        return hasLatitude && hasLongitude && hasGenerationtimeMs && hasUtcOffsetSeconds && hasTimezone && hasTimezoneAbbreviation && hasElevation;
    }

    hasCurrentWeather(data: any): boolean {
        return this.isExists('current_weather', data);
    }

    /*isErrorResponse(data: any): data is ErrorWeatherForecastApi {
        const hasErrorKey = this.isExists('error', data, 'boolean');
        const hasReason = this.isExists('reason', data, 'string');

        return hasReason && hasErrorKey;
    }*/

    /*isCurrentWeather(data: any): data is CurrentWeather {
        const hasIsDay = this.isExists('is_day', data);
        const hasTemperature = this.isExists('temperature', data);
        const hasTime = this.isExists('time', data);
        const hasWeathercode = this.isExists('weathercode', data);
        const hasWinddirection = this.isExists('winddirection', data);
        const hasWindspeed = this.isExists('windspeed', data);

        return hasIsDay && hasTemperature && hasTime && hasWeathercode && hasWinddirection && hasWindspeed;
    }*/
}
