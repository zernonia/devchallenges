import { Weather, LattLong, QueryResponse } from "./interface";
import { reactive } from "vue";
import axios from "axios";

export const state = reactive({
  location: "",
  temperatureFormat: "C",
  locations: [] as QueryResponse[],
  weatherData: [] as Weather[],
  formatDate: (date: string): string => {
    const preformat = new Date(date);
    const dateFormat = preformat.toLocaleString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short"
    });
    return dateFormat;
  },
  initialData: () => {
    for (let i = 0; i < 6; i++) {
      const initialValue: Weather = {
        condition: "",
        applicableDate: "",
        minTemp: 0,
        maxTemp: 0,
        theTemp: 0,
        minTempF: 0,
        maxTempF: 0,
        theTempF: 0,
        compassDirection: "",
        windSpeed: 0,
        windDirection: 0,
        airPressure: 0,
        humidity: 0,
        visibility: 0,
        predictability: 0
      };
      state.weatherData.push(initialValue);
    }
  },
  changeDegree: (type = "C") => {
    state.temperatureFormat = type;
  },
  sideData: () => state.weatherData.splice(1, 5),
  searchLocation: async (query: string | LattLong, type: string) => {
    if (type === "lattlong") {
      const query2: LattLong = query as LattLong;
      const { data } = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?lattlong=${query2.latitude},${query2.longitude}`
      );
      state.locations = data;
    }
    if (type === "location") {
      const { data } = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${query}`
      );
      state.locations = data;
    }
  },
  getData: async (woeid: number) => {
    const { data } = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`
    );
    state.location = data.title;
    state.weatherData = data.consolidated_weather.map(
      // eslint-disable-next-line
      (obj: any ): Weather => ({
        condition: obj.weather_state_name,
        applicableDate: state.formatDate(obj.applicable_date),
        minTemp: obj.min_temp,
        maxTemp: obj.max_temp,
        theTemp: obj.the_temp,
        minTempF: obj.min_temp * (9 / 5) + 32,
        maxTempF: obj.max_temp * (9 / 5) + 32,
        theTempF: obj.the_temp * (9 / 5) + 32,
        compassDirection: obj.wind_direction_compass,
        windSpeed: obj.wind_speed,
        windDirection: obj.wind_direction,
        airPressure: obj.air_pressure,
        humidity: obj.humidity,
        visibility: obj.visibility,
        predictability: obj.predictability
      })
    );
  }
});
