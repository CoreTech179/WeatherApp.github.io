let cityName = document.querySelector(".cityName");
let dateTime = document.querySelector(".weather_date_time");
let weatherForecast = document.querySelector(".weather_forecast");
let weatherIcon = document.querySelector(".weather_icon");
let weatherTemperature = document.querySelector(".weather-temperature");
let weatherMin = document.querySelector(".weather_min");
let weatherMax = document.querySelector(".weather_max");

// targetting the form tag
let citySearch = document.querySelector(".weather-search");


// third Part
let feelsLike = document.querySelector(".weather-feelsLike");
let weatherWind = document.querySelector(".weather-wind");
let weatherHumidity = document.querySelector(".weather-humidity");
let weatherPressure = document.querySelector(".weather-Pressure");


// To get the actual country name

const getCountryName = (countryCode)=>{
    // This piece of line is taken from international api
    // where it returns the country code in the form of object and .of() method decodes the full name and return the full country name
    return new Intl.DisplayNames([countryCode], { type: 'region' }).of(countryCode);
};

// Getting date and time 
const getDateTime = (date)=>{
    const currDate = new Date(date * 1000);
    console.log(currDate);

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minutes: "numeric"
    };

    const formatter = new Intl.DateTimeFormat("en-US",options);
    console.log(formatter);
    return formatter.format(currDate)
};  

// By default data will occur for this city
let city = "Pune";

// Search functionality function with event listener


citySearch.addEventListener('submit',(event)=>{
    event.preventDefault();

    let cityName = document.querySelector(".city");
    city = cityName.value;
    cityName.value = "";
    getWeatherData();
});

const changeKelvinToDegree = (kelvin)=>{
    return (kelvin - 273);
};


// Whenever we are dealing with api we need to make our function asyn function

const getWeatherData = async () => {

    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lat={lat}&lon={lon}&appid=e8e5ce81044ac5922bf2fd1ea970b6c6`;

    try {
        const response = await fetch(weatherURL);
        const data = await response.json();
        console.log(data);

        const { main, name, weather, wind, sys, dt } = data;

        cityName.textContent = `${name}, ${getCountryName(sys.country)}`;
        dateTime.textContent = getDateTime(dt);

        weatherForecast.innerHTML = `${weather[0].main}`;
        weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png"/>`;

        // Converting Kelvin to degree celcius
        let kelvinData = main.temp;

        let celciusData = changeKelvinToDegree(kelvinData);
        
        weatherTemperature.innerHTML = `${celciusData.toFixed(1)}&#176C`;

        // Converting Kelvin to degree celcius
        let minKelvinTemp = main.temp_min;
        let maxKelvinTemp = main.temp_max;

        let minDegreeTemp = changeKelvinToDegree(minKelvinTemp);
        let maxDegreeTemp = changeKelvinToDegree(maxKelvinTemp);

        
        weatherMin.innerHTML = `Min: ${minDegreeTemp.toFixed()}&#176C`;
        weatherMax.innerHTML = `Max: ${maxDegreeTemp.toFixed()}&#176C`;


        // getting third part

        // Converting Kelvin to degree celcius
        let kelvinFeelsLike = main.feels_like;
        let degreeFeelsLike = changeKelvinToDegree(kelvinFeelsLike);
        
        feelsLike.innerHTML = `${degreeFeelsLike.toFixed()}&#176C`;
        weatherWind.innerHTML = `${wind.speed} m/s`;
        weatherHumidity.innerHTML = `${main.humidity} %`;
        weatherPressure.innerHTML = `${main.pressure} hpa`;
    } catch (error) {
        console.log(error);
    }

};


// When the page load for the first time the function will run automatically

document.body.addEventListener('load',getWeatherData());
