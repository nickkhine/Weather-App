
const searchBox = document.getElementById('search-box-input');
const errorMsg = document.getElementById('error-msg');
console.log(searchBox);

searchBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        getData(searchBox.value);
    }
  });


async function getData(city) {
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=d624892761d86e37e3f0f91649971232`,{mode: 'cors'});
        console.log(response);
        const data = await response.json();
        console.log(data);
        const weatherData = getWeatherData(data);
        console.log(weatherData);
        displayWeatherData(weatherData);
        errorMsg.style.visibility = "hidden";
    }
    catch(error) {
        errorMsg.style.visibility = "visible";

    }

}

function getWeatherData(data) {
    let str = data.weather[0].description;
    let arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    
    }
    const str2 = arr.join(" ");

    const weatherData = {
        name : data.name,
        description : str2,
        farenheight : Math.round(data.main.temp),
        feels_like : Math.round(data.main.feels_like),
        wind : Math.round(data.wind.speed),
        humidity : data.main.humidity,
    };
    return weatherData;
}

var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

function displayWeatherData(weatherData) {
    document.getElementById('description').innerHTML = weatherData.description;
    document.getElementById('city').innerHTML = weatherData.name;
    let today = new Date();
    today = today.toLocaleDateString("en-US", options);
    document.getElementById('date').innerHTML = today;
    document.getElementById('farenheight').innerHTML = weatherData.farenheight + " °F";
    document.getElementById('feels-like').innerHTML = "Feels Like: " + weatherData.feels_like + " °F";
    document.getElementById('humidity').innerHTML = "Humidity: " + weatherData.humidity + " %";
    document.getElementById('wind').innerHTML = "Wind: " + weatherData.wind + " mph";
}

data = getData('Fremont');


