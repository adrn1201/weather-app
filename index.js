"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const ejs_mate_1 = __importDefault(require("ejs-mate"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.engine("ejs", ejs_mate_1.default);
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let weatherData;
        if (req.query.location) {
            const response = yield axios_1.default.get(`https://api.weatherstack.com/current?access_key=0374cf0a1ebf1ac68f98a8328fee1313&query=${req.query.location}`);
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
        }
        else {
            weatherData = null;
            res.render("index", { weatherData });
        }
    }
    catch (e) {
        console.log(e);
    }
}));
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});
