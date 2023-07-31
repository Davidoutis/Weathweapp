const api = {
    endpoint: "https://api.openweathermap.org/data/2.5/",
    key: "4755d8a121d58b361f6a66b0425dad93"
};

const input = document.querySelector("#input");
input.addEventListener("keypress", enter);

window.addEventListener("load", () => {
    getInfo(input.value);
});

function enter(e) {
    if (e.key === "Enter") {
        getInfo(input.value);
    }
}

function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

function formatTime(date) {
    const options = { hour: '2-digit', minute: '2-digit', hour12: true, };
    return date.toLocaleTimeString(undefined, options);
}

async function getInfo(data) {
    const res = await fetch(`${api.endpoint}weather?q=${data}&units=metric&appid=${api.key}`);
    const result = await res.json();

    displayResult(result);
}

function displayResult(result) {
    let city = document.querySelector("#city");
    city.textContent = `${result.name}, ${result.sys.country}`;

    let temperature = document.querySelector(".temp");
    temperature.innerHTML = `${Math.round(result.main.temp)}<span>°</span>`;

    let icon = document.querySelector("#icon");
    let iconId = `${result.weather[0].icon}`;
    icon.src = `http://openweathermap.org/img/wn/${iconId}.png`;

    let feelsLike = document.querySelector("#feelsLike");
    feelsLike.innerHTML = `${Math.round(result.main.feels_like)}<span>°</span>`;

    let variation = document.querySelector("#variation");
    variation.innerHTML = `Min: ${Math.round(result.main.temp_min)}<span>°</span> Max: ${Math.round(result.main.temp_max)}<span>°</span>`;

    let humidity = document.querySelector(".humidity");
    humidity.innerHTML = `${Math.round(result.main.humidity)}<span>%</span>`;

    let wind = document.querySelector(".wind");
    wind.innerHTML = `${Math.round(result.wind.speed)} <span>km/h</span>`;

    let conditions = document.querySelector(".conditions");
    conditions.textContent = `${result.weather[0].main}`;

    let currentDate = new Date();
    let dateElement = document.querySelector(".date");
    dateElement.textContent = formatDate(currentDate);

    let currentTime = new Date();
    let timeElement = document.querySelector(".time");
    timeElement.textContent = formatTime(currentTime);

    document.querySelector(".details").style.display = "block";
}
