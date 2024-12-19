import express from "express";
import ejsMate from "ejs-mate";
import path from "path";
import dotenv from "dotenv";
import Weather from "@weatheradrn/weather-npm-package"
import { WeatherData } from "./utils";

const app = express();

dotenv.config();
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  try {
    let weatherData: WeatherData | null;
    if (req.query.location) {
      const weatherObj = new Weather(process.env.WEATHER_ACCESS_KEY, req.query.location)
      const response = await weatherObj.getWeather()
      const { location } = response;
      const { current } = response;
      weatherData = {
        name: location.name,
        country: location.country,
        region: location.region,
        timezone: location.timezone_id,
        localtime: location.localtime,
        temperature: current.temperature,
        humidity: current.humidity,
      };
      res.render("index", { weatherData });
    } else {
      weatherData = null;
      res.render("index", { weatherData });
    }
  } catch (e) {
    console.log(e);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
