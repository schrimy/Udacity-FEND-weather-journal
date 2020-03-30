// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=80eaf3db70bd995b99c4d1224eb5278a';
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateEntry);
/* Function called by event listener */
function generateEntry(evt) {
  const zipCode = document.getElementById('zip').value;

  getWeather(baseUrl, zipCode, apiKey)
  .then((data) => {
    console.log('returned data: '+data.main.temp);
  });
}
/* Function to GET Web API Data*/
const getWeather = async (url, zip, key) => {
  const res = await fetch(url+zip+key);

  try {
    const data = await res.json();
    return data;
  } catch (e) {
    console.log('error', e);
  }
}

/* Function to POST data */


/* Function to GET Project Data */
