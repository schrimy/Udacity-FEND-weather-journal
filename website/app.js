// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=80eaf3db70bd995b99c4d1224eb5278a';
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
/*Other globals*/
const date = new Date();
const readableDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateEntry);
/* Function called by event listener */
function generateEntry(evt) {
  const zipCode = document.getElementById('zip');
  const userInput = document.getElementById('feelings');
  /*check if zip and feelings have content*/
  if (userInput.value === '' || zipCode.value === '') {
    zipCode.classList.add('error-text');
    userInput.classList.add('error-text');
    alert('Please complete required fields in red!');
    return;
  }
  /*grab weather and user data and eneter into array then display*/
  getWeather(baseUrl, zipCode.value, apiKey)
  .then((data) => {
    postData('/addEntry', {temp: data.main.temp, date: readableDate, userInput: userInput.value})
    .then(
      getEntries('/all')
      .then((array) => {
        showLatest(array);
      })
    )
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
const postData = async (url = '', data = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await res.json();
    console.log('new data: '+newData);
    const newEntry = [newData];
    buildEntriesList(newEntry);
  } catch (e) {
    console.log('error ', e);
  }
}

/* Function to GET Project Data */
const getEntries = async (url) => {
  const res = await fetch(url);

  try {
    const entries = await res.json();
    return(entries);
  } catch (e) {
    console.log('error', e);
  }
}

function showLatest(entries){
  const numEntries = entries.length;

  document.querySelector('.title').innerHTML = 'Most Recent Entry';

  document.getElementById('date').innerHTML = entries[numEntries - 1].date;
  document.getElementById('temp').innerHTML = entries[numEntries - 1].temp;
  document.getElementById('content').innerHTML = entries[numEntries - 1].userInput;
}

function buildEntriesList(entriesList) {
  const listHolder = document.querySelector('.entry-list');
  const listFrag = new DocumentFragment();

  if (entriesList === undefined) {
    return;
  }

  listHolder.addEventListener('click', displayEntry);

  entriesList.forEach((entry) => {
    let item = document.createElement('li');
    item.innerText = `${entry.date}, ${entry.temp}, ${entry.userInput}`;
    item.setAttribute('id', `${entry.id}`);

    listFrag.appendChild(item);
  });

  listHolder.appendChild(listFrag);
}

/*callback for past entry click event to display that entry*/
function displayEntry(e) {
  if (e.target.nodeName.toLowerCase() === 'li') {
    const target = e.target.id;

    getEntries('/all')
    .then((array) => {
      document.querySelector('.title').innerHTML = 'Previous Post';

      document.getElementById('date').innerHTML = array[target].date;
      document.getElementById('temp').innerHTML = array[target].temp;
      document.getElementById('content').innerHTML = array[target].userInput;
    });
  }
}

/*auto populate entry field if entries are avaialable*/
getEntries('/all')
.then((data) => {
  showLatest(data);
  /*call function to build list of entries*/
  buildEntriesList(data);
});
