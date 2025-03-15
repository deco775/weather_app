
const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey = '4a4a07fce9774f96373ef0113754bbb8';


weatherForm.addEventListener('submit', async event =>{
    event.preventDefault();
    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError('Please Enter a City')
    }
})

function displayError(message){
    const errorDisplay = document.createElement('h1');
    errorDisplay.textContent = message;
    errorDisplay.classList.add('errorDisplay');

    card.textContent = "";
    card.style.display = 'flex';
    card.appendChild(errorDisplay);
}

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error('Could not fetch Weather Data');
    }
    return await response.json();
}

function displayWeatherInfo(data){
    const {name: city,
        main: {temp, humidity},
        weather: [{description, id}]} = data;
    
    
    card.textContent = "";
    card.style.display = 'flex';

    const cityDisplay = document.createElement('h1');
    const tempDisplay = document.createElement('p');
    const humidityDisplay = document.createElement('p');
    const descDisplay = document.createElement('p');
    const weatherImoji = document.createElement('p');

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)} °C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherImoji.textContent = getWeatherImoji(id);

    cityDisplay.classList.add('cityDisplay');
    tempDisplay.classList.add('tempDisplay');
    humidityDisplay.classList.add('humidityDisplay');
    descDisplay.classList.add('descDisplay');
    weatherImoji.classList.add('weatherEmoji');

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherImoji);
}

function getWeatherImoji(weatherId){
    switch(true){
        case(weatherId >= 200 && weatherId < 300):
            return "⛈";
            //break;
        case(weatherId >= 300 && weatherId < 600):
            return "🌨";
            //break;
        case(weatherId >= 600 && weatherId < 700):
            return "❄";
            //break;
        case(weatherId >= 700 && weatherId < 800):
            return "🌫";
            //;
        case(weatherId === 800):
            return "☀";
            //break;
        case(weatherId >= 801 && weatherId < 810):
            return "☁";
            //break;
        default:
            return "🤷‍♀️";

    }
}

