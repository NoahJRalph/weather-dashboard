// let savedCities = [];
function calculateWeather(event) {
    event.preventDefault();
    let cityName = event.target.elements.cityName.value;
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&cnt=1&appid=7e64038d345462098cd3594177602462`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let parsedData = JSON.parse(JSON.stringify(data));
        $(`#searchedCity`).empty();
        $(`#searchedCity`).append(
            `<div class="p-1 mx-3 m-1 col border-3 bg-info border border-light text-black text-center">
                <h2 class="p-1">Today's climate in: ${parsedData.name}<img src="http://openweathermap.org/img/w/${parsedData.weather[0].icon}.png"}"></h2>
                <ul>
                    <li>Weather: ${parsedData.weather[0].main}</li>
                    <li>Temp: ${parsedData.main.feels_like}°F</li>
                    <li>Wind: ${parsedData.wind.speed}MPH</li>
                    <li>Humidity: ${parsedData.main.humidity}%</li>
                </ul>
            </div>`);
    })
    .catch(error => {
        console.error(`Error: ${error}`)
    });
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=7e64038d345462098cd3594177602462`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let parsedData = JSON.parse(JSON.stringify(data));
        $(`#searched5Days`).empty();
        for (let i=0;i<40;++i) {
            if (i==3||i==11||i==19||i==27||i==35) {
                $(`#searched5Days`).append(
                    `<div class="m-1 p-1 col border-3 bg-info border border-light text-black text-center">
                        <h3><img src="http://openweathermap.org/img/w/${parsedData.list[i].weather[0].icon}.png"}">${parsedData.list[i].dt_txt}PM</h3>
                        <ul class="text-start">
                            <li>Weather: ${parsedData.list[i].weather[0].main}</li>
                            <li>Temp: ${parsedData.list[i].main.feels_like}°F</li>
                            <li>Wind: ${parsedData.list[i].wind.speed}MPH</li>
                            <li>Humidity: ${parsedData.list[i].main.humidity}%</li>
                        </ul>
                    </div>`);
            }
        }
    })
    .catch(error => {
        console.error(`Error: ${error}`);
    });
   event.target.elements.cityName.value = ``;
};
$(`#searchForm`).on(`submit`, calculateWeather);