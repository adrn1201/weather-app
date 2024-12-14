import axios from "axios";

interface Weather {
  request: {
    type: string;
    query: string;
    language: string;
    unit: string;
  };
  location: {
    name: string;
    country: string;
    region: string;
    lat: string;
    lon: string;
    timezone_id: string;
    localtime: string;
    localtime_epoch: number;
    utc_offset: string;
  };
  current: {
    observation_time: string;
    temperature: number;
    weather_code: number;
    weather_icons: string[];
    weather_descriptions: string[];
    wind_speed: number;
    wind_degree: number;
    wind_dir: string;
    pressure: number;
    precip: number;
    humidity: number;
    cloudcover: number;
    feelslike: number;
    uv_index: number;
    visibility: number;
    is_day: string;
  };
}

async function getWeather() {
  try {
    const res = await axios.get<Weather>(
      "https://api.weatherstack.com/current?access_key=0374cf0a1ebf1ac68f98a8328fee1313&query=New York"
    );
    console.log(res.data)
  } catch (e) {
    console.log(e);
  }
}

getWeather();