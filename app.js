const clock = document.querySelector(".clock");
const name = document.querySelector(".name");
const greeting = document.querySelector(".greeting");
const weather = document.querySelector(".weather");
const date = document.querySelector(".date");

window.addEventListener("load", setGreeting);
window.addEventListener("load", getName);
window.addEventListener("load", showWeather);
window.addEventListener("load", setDate);

name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);

function showTime(){
    const time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();

    if(hours < 10){
        hours = "0" + hours;
    }

    if(minutes < 10){
        minutes = "0" + minutes;
    }

    if(seconds < 10){
        seconds = "0" + seconds;
    }

    clock.innerText = hours + ":" + minutes + ":" + seconds;
}

setInterval(showTime, 1000);

function setGreeting(){
    let today = new Date();
    let hours = today.getHours();

    if(hours < 12){
        document.body.style.background = "url(morning.jpg)";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundAttachment = "fixed";
        greeting.innerText = "Good Morning";
    } else if(hours < 19){
        document.body.style.background = "url(afternoon.jpg)";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundAttachment = "fixed";
        greeting.innerText = "Good Afternoon";
    } else {
        document.body.style.background = "url(night.jpeg)";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundAttachment = "fixed";
        greeting.innerText = "Good Evening";
    }
}

function setName(e){
    if(e.type = "keypress"){
        if(e.which == 13 || e.keyCode == 13){
            localStorage.setItem("name", e.target.innerText);
            name.blur();
        }
    } else {
        localStorage.setItem("name", e.target.innerText);
    }
}

function getName(){
    if(localStorage.getItem("name") === null){
        name.innerText = "[Enter Name]";
    } else {
        name.innerText = localStorage.getItem("name");
    }
}

function showWeather(){
    let lat;
    let lon;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=8916ec882e494cc4301bfcb4caaa4f26`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const weatherDiv = document.createElement("div");
                    weatherDiv.classList.add("weather-div");
                    weather.appendChild(weatherDiv);

                    const location = document.createElement("h3");
                    location.innerText = data.name;
                    location.classList.add("location");
                    weatherDiv.appendChild(location);

                    const { temp } = data.main;
                    const temperature = document.createElement("h3");
                    temperature.innerText = temp + "°C";
                    temperature.classList.add("temperature");
                    weatherDiv.appendChild(temperature);


                })
        });
    }
}

function setDate(){
    days =  [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]

    months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    let currentDate = new Date();
    let day = currentDate.getDay();
    let dateOfWeek = currentDate.getDate();
    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();
    date.innerText = days[day] + " " + dateOfWeek + " " + months[month] + " " + year;
}