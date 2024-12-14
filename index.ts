import express from "express";
import axios from "axios";
import ejsMate from "ejs-mate";
import path from "path";
import { Weather, WeatherData } from "./utils";

const app = express();

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  try {
    let weatherData: WeatherData | null;
    if (req.query.location) {
      const response = await axios.get<Weather>(
        `https://api.weatherstack.com/current?access_key=0374cf0a1ebf1ac68f98a8328fee1313&query=${req.query.location}`
      );
      const { location } = response.data;
      const { current } = response.data;
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
