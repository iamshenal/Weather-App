const weatherForm = document.querySelector('.weatherform');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card')
const apiKey = "c15e69cbf3c87ac651ec9af346a38ce2";

weatherForm.addEventListener('submit', async event => {
    event.preventDefault();
    const city = cityInput.value;
    if(city){
        try {
            const weatherData = await getWeatherData(city); 
            displayWeatherData(weatherData);
        } catch (error) {
            console.log(error);
            displayErrors(error);
        }
    } else{
        displayErrors('Please enter a city!');
    }
})

async function getWeatherData(city){
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiURL);
    console.log(response);
    if(!response){
        throw new Error("could not fetch weather data")
    }
    return await response.json();
}
function displayWeatherData(data){
    const{name:city, 
          main:{temp,humidity},
          weather:[{description,id }]} = data; 
    card.textContent = '';
    card.style.display = 'flex'; 

    const cityDisplay = document.createElement('h1');
    const temppDisplay = document.createElement("p")
    const humidityDisplay = document.createElement("p")
    const descDisplay = document.createElement("p")
    const weatherEmoji = document.createElement("p")

    cityDisplay.textContent =  city;
    temppDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = `${description}`;
    weatherEmoji.textContent = getWeatherEmoji(id); 

    cityDisplay.classList.add('cityDisplay');
    temppDisplay.classList.add('tempDisplay');
    humidityDisplay.classList.add('humidityDisplay');
    descDisplay.classList.add('descDisplay');
    weatherEmoji.classList.add('weatherEmoji')


    card.appendChild(cityDisplay);
    card.appendChild(temppDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji)
}

function getWeatherEmoji(weatherID){
    switch (true) {
        case (weatherID >= 200 && weatherID < 300):
            return '🌩️'
            break;
        case (weatherID >= 300 && weatherID < 500):
            return '🌧️'
            break;
        case (weatherID >= 500 && weatherID < 600):
            return '🌧️'
            break;
        case (weatherID >= 600 && weatherID < 700):
            return '❄️'
            break;
        case (weatherID >= 700 && weatherID < 800):
            return '⛅️'
            break;
        case(weatherID >= 800):
            return '☁️'
        default:
            break;
    }
}

function displayErrors(msg){
    const errorDispl = document.createElement('p');
    errorDispl.textContent = msg;
    errorDispl.classList.add('errorMsg');

    card.textContent = "";
    card.style.display = "flex"; 
    card.append(errorDispl);
}