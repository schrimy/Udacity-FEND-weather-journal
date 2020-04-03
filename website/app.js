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
    postData('/addEntry', {temp: (data.main.temp - 273.15).toFixed(1) + '\xB0C',
    date: readableDate,
    userInput: userInput.value,
    weather: data.weather[0].description,
    place: data.name})
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
    const newEntry = [newData];
    buildEntriesList(newEntry);
  } catch (e) {
    console.log('error', e);
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

/*Show latest entry when page is opened, if there are any*/
function showLatest(entries){
  const numEntries = entries.length;
  //if there are no current entries, exit this function
  if (numEntries === 0) {
    return;
  }
  //otherwise get last entry from passed array
  const entryItem = entries[numEntries - 1];

  document.querySelector('.title').innerHTML = 'Most Recent Entry';
  document.getElementById('date').innerHTML = entryItem.date + ' - ' + entryItem.place;
  document.getElementById('temp').innerHTML = entryItem.weather + ' - ' + entryItem.temp;
  document.getElementById('content').innerHTML = entryItem.userInput;
}

/*crete and build previous entries field into UI*/
function buildEntriesList(entriesList) {
  const listContainer = document.querySelector('.past-entries');
  const listHolder = document.querySelector('.entry-list');
  //if there is an error for previous entries exit from function
  if (entriesList === undefined) {
    return;
  }

  /*hide entries list div if no current entries*/
  if (entriesList.length === 0) {
    listContainer.setAttribute('style', 'display: none');
    return;
  } else {
    listContainer.removeAttribute('style');
  }
  //if there are previous entries run through array of entries passed in and
  //build a list item for each and add to 'ul' in html
  const listFrag = new DocumentFragment();

  entriesList.forEach((entry) => {
    let item = document.createElement('li');
    item.innerText = `${entry.date}, ${entry.place}, `;
    //shorten the feelings text to fit if 7 characters or over
    if (entry.userInput.length >= 7) {
      item.innerText += `${entry.userInput.slice(0, 7) + '...'}`;
    } else {
      item.innerText += `${entry.userInput}`;
    }
    //set id attribute for reference if clicked
    item.setAttribute('id', `${entry.id}`);
    listFrag.appendChild(item);
  });

  listHolder.appendChild(listFrag);
}

/*callback for previous entry click event to display that entry*/
function displayEntry(e) {
  if (e.target.nodeName.toLowerCase() === 'li') {
    const target = e.target.id;

    getEntries('/all')
    .then((array) => {
      document.querySelector('.title').innerHTML = 'Selected Entry';

      document.getElementById('date').innerHTML = array[target].date + ' - ' + array[target].place;
      document.getElementById('temp').innerHTML = array[target].weather + ' - ' + array[target].temp;
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
  /*add entries list click listener here so it's not duplicated*/
  document.querySelector('.entry-list').addEventListener('click', displayEntry);
});
