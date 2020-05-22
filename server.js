// Setup empty JS object to act as endpoint for all routes
// Express to run server and routes
projectData = [];
/*globals*/
//array reference for each entry
//let entryNum = 0;
// Start up an instance of app
const express = require('express');
const app = express();
/* Dependencies */
/* Middleware*/
const dotenv = require('dotenv');
dotenv.config();
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Spin up the server
// Callback to debug
const port = process.env.PORT;
if(port == null || port == '') {
  port = 3030;
};
const server = app.listen(port, () => {
  console.log(`server running on localhost: ${port}`);
});

// Initialize all route with a callback function
app.get('/all', getAll);
// Callback function to complete GET '/all'
function getAll(req, res) {
  res.send(projectData);
}
// Post Route
app.post('/addEntry', (req, res) => {
  const newEntry = {
    temp: req.body.temp,
    date: req.body.date,
    userInput: req.body.userInput,
    weather: req.body.weather,
    place: req.body.place,
    id: projectData.length
  };

  projectData.push(newEntry);
  res.send(newEntry);
});

//return hidden api key
app.get('/apiKey', (req, res) => {
  const apiKey = { key: process.env.API_KEY }
  res.send(apiKey)
})
