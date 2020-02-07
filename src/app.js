const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set up handle bars engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Jinu"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Jinu"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Jinu",
    msg: "This is an app to forecast the Weather"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address must be specified"
    });
  }

  geocode(
    req.query.address,
    (error, { lattitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error
        });
      }
      forecast(lattitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );

  // res.send({
  //   location: "Bangalore",
  //   forecast: "Clear Day. Temperature is 35 degree up.",
  //   address: req.query.address
  // });
});

app.get("/products", (req, res) => {
  console.log(req.query.search);
  if (!req.query.search) {
    return res.send({ error: "Search parameter " });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Jinu",
    errorMsg: "Help article Not Found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Jinu",
    errorMsg: "Page Not Found"
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
