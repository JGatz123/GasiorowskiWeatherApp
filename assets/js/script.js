var apiKey = "2501b0e880b7ddff88c5693617b301ea"
document.getElementById("search-button").addEventListener("click", function(){
    var cityValue = document.getElementById("search-value").value
    findCitycords(cityValue)
})
async function findCitycords (locationName) {
    var limit = 5;
    return fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=${limit}&appid=${apiKey}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        if (data.length === 0) {
            alert('City not found');
            return;
        }
        console.log(data);
        var lat = data[0].lat;
        var lon = data[0].lon;
        currentForecast(lat, lon)
    })
}

async function currentForecast (lat, lon) {
    // This gets the weather for the city you are searching
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`);
    var data = await res.json();
    // console.log(data) Returns all data for the given array
    // specifies the specific data we are looking for from the array
    data = {
        city: data.name,
        temp: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        description: data.weather[0].description,
        icon: data.weather[0].icon
    };
    console.log(data)
    var currentCard = document.createElement("div")
    currentCard.setAttribute("class", "currentCard")

    var city = document.createElement("h2")
    city.textContent = data.city




    currentCard.append(city)
    document.querySelector("#today").append(currentCard)
}

// async function getWeekdayWeather ({lat, lon}) {
//     // This gets the weather for the city
//     const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`);
//     var data = await res.json();
//     data = data.list.filter(function (weather) {
//         return weather.dt_txt.includes('12:00:00');
//     });
//     data = data.map(function (weather) {
//         return {
//             date: weather.dt_txt,
//             temp: weather.main.temp,
//             humidity: weather.main.humidity,
//             windSpeed: weather.wind.speed,
//             description: weather.weather[0].description,
//             icon: weather.weather[0].icon
//         }
//     });
//     return data;
// }


async function getForecast (locationName) {
    var location = await findCitycords(locationName);
    var weather = await currentForecast(location);
    var weekdayWeather = await getWeekdayWeather(location);
    return {weather, weekdayWeather};
}

// export {getForecast};