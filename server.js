// Setup empty JS object to act as endpoint for all routes
// Express to run server and routes
projectData = [];
// Start up an instance of app
const express = require('express');
const app = express();
/* Dependencies */
/* Middleware*/

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
const port = 3000;
const server = app.listen(port, () => {
  console.log(`server running on localhost: ${port}`);
});

// Initialize all route with a callback function
app.get('/all', getAll);
// Callback function to complete GET '/all'
function getAll(req, res) {
  console.log('sending data');
  res.send(projectData);
}
// Post Route
app.post('/addEntry', (req, res) => {
  const newEntry = {
    temp: req.body.temp,
    date: req.body.date,
    userInput: req.body.userInput
  };

  projectData.push(newEntry);
  res.send(newEntry);
});
