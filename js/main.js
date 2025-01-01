
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const showData = document.getElementById('showData');


async function search(location) {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=667e0b9f292a4a1ab48125730240912&q=${location}&days=3`);
    if (response.ok) {
        const data = await response.json();
        console.log(data);

    
        const weatherData = {
            locationName: data.location.name,
            today: {
                date: new Date(data.current.last_updated),
                temp: data.current.temp_c,
                icon: data.current.condition.icon,
                text: data.current.condition.text,
            },
            tomorrow: {
                tempMax: data.forecast.forecastday[1].day.maxtemp_c,
                tempMin: data.forecast.forecastday[1].day.mintemp_c,
                icon: data.forecast.forecastday[1].day.condition.icon,
                text: data.forecast.forecastday[1].day.condition.text,
                day: days[new Date(data.forecast.forecastday[1].date).getDay()],
            },
            dayAfterTomorrow: {
                tempMax: data.forecast.forecastday[2].day.maxtemp_c,
                tempMin: data.forecast.forecastday[2].day.mintemp_c,
                icon: data.forecast.forecastday[2].day.condition.icon,
                text: data.forecast.forecastday[2].day.condition.text,
                day: days[new Date(data.forecast.forecastday[2].date).getDay()],
            }
        };


        displayWeather(weatherData);
    }
}


function displayWeather(data) {
    showData.innerHTML = `
    <div class="row shadow w-80 mb-5 g-0">
        <!-- Today's Weather -->
        <div class="col-lg-4">
            <div class="weather-cards h-100 d-flex">
                <div class="today w-100">
                    <div class="today-header p-3 d-flex justify-content-between">
                        <span id="todayName">${days[data.today.date.getDay()]}</span>
                        <span id="dateName">${data.today.date.getDate()} ${months[data.today.date.getMonth()]}</span>
                    </div>
                    <div class="today-weather p-4">
                        <div class="location h3 text-white-50 fs-2 mt-3">${data.locationName}</div>
                        <div class="degree text-white">
                            <span id="temp" class="">${data.today.temp}<sup>o</sup>C</span>
                        </div>
                        <div class="forecast-icon">
                            <img src="https://${data.today.icon}" width="90" alt="">
                        </div>
                        <div class="custom">${data.today.text}</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Tomorrow's Weather -->
        <div class="col-lg-4">
            <div class="weather-cards shadow h-100 d-flex">
                <div class="today bg-section pb-4 text-center w-100">
                    <div id="tmrhead" class="tmr-header text-white part-color p-3">${data.tomorrow.day}</div>
                    <div class="today-weather p-5">
                        <div class="forecast-icon pb-3">
                            <img src="https://${data.tomorrow.icon}" alt="">
                        </div>
                        <div class="degree text-white">
                            <span id="" class="fs-3">${data.tomorrow.tempMax}<sup>o</sup>C</span>
                        </div>
                        <div class="degree mt-2 pt-2 text-white">
                            <span id="" class="fs-6 ">${data.tomorrow.tempMin}<sup>o</sup>C</span>
                        </div>
                        <div class="custom">${data.tomorrow.text}</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Day After Tomorrow's Weather -->
        <div class="col-lg-4">
            <div class="weather-cards shadow h-100 d-flex">
                <div class="today bg-section pb-4 text-center w-100">
                    <div id="afTmr" class="tmr-header text-white part-color p-3">${data.dayAfterTomorrow.day}</div>
                    <div class="today-weather p-5">
                        <div class="forecast-icon pb-3">
                            <img src="https://${data.dayAfterTomorrow.icon}" alt="">
                        </div>
                        <div class="degree text-white">
                            <span id="" class="fs-3">${data.dayAfterTomorrow.tempMax}</span>
                        </div>
                        <div class="degree mt-2 pt-2 text-white">
                            <span id="" class="fs-6 ">${data.dayAfterTomorrow.tempMin}<sup>o</sup>C</span>
                        </div>
                        <div class="custom">${data.dayAfterTomorrow.text}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}


search('Cairo');
document.getElementById('searchName').addEventListener('keyup', function (e) {
    search(e.target.value);
});

