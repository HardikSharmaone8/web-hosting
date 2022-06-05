var express = require("express");
var app = express();
var path = require("path");
var hbs = require("hbs");
var port = process.env.PORT || 8000;

var staticCSS = path.join(__dirname, "/public");
var imgPath = path.join(__dirname, "/img");
var headerPath = path.join(__dirname, "/partial");

var templatePath = path.join(__dirname, "/template");

app.set("view engine", "hbs");
app.set("views", templatePath);

app.use(express.static(staticCSS));
app.use(express.static(imgPath));
hbs.registerPartials(headerPath);

app.get("/weather", (req, res) => {
    res.render("weather.hbs");
});
app.get("/", (req, res) => {
    res.render("weather.hbs");
});
app.get("/city", (req, res) => {
    res.render("weatherCheck.hbs");
});

app.get("*", (req, res) => {
    res.render("error.hbs");
});
app.get("/weather/*", (req, res) => {
    res.render("error.hbs");
});
app.get("/city/*", (req, res) => {
    res.render("error.hbs");
});
app.listen(port, () => {
    console.log("Bhia Aap k Port No. ki Request Under Process H.....");
});