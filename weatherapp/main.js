function onLoad() {
    if(getPlatform() === "mobile") mobileVersion()
    else if(getPlatform() === 'desktop') desktopVersion()
    actions()
}

function actions() {
    onLoadGetGeolocation()
}

async function onLoadGetGeolocation() {
    const span_geolocation = document.getElementById('geolocation')
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position)
    }else span_geolocation.innerHTML = "unknown"
}

async function position(pos) {
    let bdcApi = "https://api.bigdatacloud.net/data/reverse-geocode-client"
    let x = pos.coords.latitude
    let y = pos.coords.longitude
    const span_geolocation = document.getElementById('geolocation')

    let url = bdcApi + "?latitude=" + x + "&longitude=" + y + "&localityLanguage=en"

    await fetch(
        url, { method: "GET" }
    ).then(
        response => {
            return response.json()
        }
    ).then(resJSON => 
        span_geolocation.innerHTML = `${resJSON['postcode']},  ${resJSON['city']},  ${resJSON['countryCode']}`
    ).catch(err => {
        span_geolocation.innerHTML = "Error!" + err
    })

    await fetchDataFromWeatherAPI(x, y)
}

async function fetchDataFromWeatherAPI(x, y) {
    let url_daily_temp_max_min   = 
        `https://api.open-meteo.com/v1/forecast?latitude=${x}&longitude=${y}&timezone=Europe/Budapest&daily=temperature_2m_max,temperature_2m_min`
    let url_daily_sunrise_sunset = 
        `https://api.open-meteo.com/v1/forecast?latitude=${x}&longitude=${y}&timezone=Europe/Budapest&daily=sunrise,sunset`
    let url_daily_rain           = 
        `https://api.open-meteo.com/v1/forecast?latitude=${x}&longitude=${y}&timezone=Europe/Budapest&daily=precipitation_probability_mean`
    let url_daily_currentweather = 
        `https://api.open-meteo.com/v1/forecast?latitude=${x}&longitude=${y}&timezone=Europe/Budapest&current_weather=true`
    let url_hourly_visibility = 
        `https://api.open-meteo.com/v1/forecast?latitude=${x}&longitude=${y}&timezone=Europe/Budapest&hourly=visibility`
    let url_hourly_humidity = 
        `https://api.open-meteo.com/v1/forecast?latitude=${x}&longitude=${y}&timezone=Europe/Budapest&hourly=relativehumidity_2m`

    let json = ""
    let json_time = ""
    let urltime = `https://timeapi.io/api/Time/current/coordinate?latitude=47.53&longitude=21.62`

    async function fetchData(_url) {
        try {
            const response = await fetch(_url, { method: "GET" })
            const resJSON = await response.json()
            json = resJSON
            return json
        }catch (err) {
            console.log(err);
        }
    }

    async function fetchDataDaily(day) {
        await fetchData(url_daily_temp_max_min)
        return [
            "H: " + json["daily"]["temperature_2m_max"][day] + " °C<br>",
            "L: " + json["daily"]["temperature_2m_min"][day] + " °C<br>"
        ]
    }

    async function fetchDataSunriseSunset(day) {
        await fetchData(url_daily_sunrise_sunset)
        return [
            "Sunrise: " + json['daily']["sunrise"][day].slice(11) + "<br>",
            "Sunset: " + json['daily']['sunset'][day].slice(11) + "<br>"
        ]
    }

    async function fetchDataRain(day) {
        await fetchData(url_daily_rain)
        return "Precipitation Probability: " + json['daily']['precipitation_probability_mean'][day] + " %<br>"
    }

    async function fetchDataCurrentWeather() {
        await fetchData(url_daily_currentweather)
        return json['current_weather']
    }

    async function fetchDataVisibility() { // now time hour
        await fetchData(url_hourly_visibility)
        return "Visibility: " + json['hourly']['visibility'][0] + " m<br>"
    }

    async function fetchDataHumidity(hour) { // need to get now time hour
        await fetchData(url_hourly_humidity)
        return "Humidity: " + json['hourly']['relativehumidity_2m'][hour] + " %<br>"
    }


    // Paste Data
    async function pasteData() {
        const main = document.querySelector('main')

        // await fetch, call functions
        let [h, l] = await fetchDataDaily(0)
        let [sunrise, sunset] = await fetchDataSunriseSunset(0)
        let percentage_of_rain = await fetchDataRain(0)
        let current_weather = await fetchDataCurrentWeather()
        let visibility = await fetchDataVisibility()
        let humidity = await fetchDataHumidity(16)

        main.innerHTML = h + l
        main.innerHTML += sunrise + sunset
        main.innerHTML += percentage_of_rain
        main.innerHTML += visibility
        main.innerHTML += humidity

        // last item in main
        main.innerHTML += "<div class='current-weather'></div>"

        const curr_weather_div = document.querySelector('.current-weather')
        curr_weather_div.innerHTML += "Current Weather: <br>"
        let compassDirections = [
            "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"
        ]
        let compassDir = Math.round((current_weather['winddirection']) / 45)

        // current weather
        for (let elem in current_weather) {
            if (elem === "time") curr_weather_div.innerHTML += "Last time updated: " + current_weather[elem].slice(11) + "<br>"
            else if (elem === "weathercode") curr_weather_div.innerHTML += ""
            else if(elem === "winddirection") 
                curr_weather_div.innerHTML += elem + ": " + current_weather[elem] + "° " + compassDirections[compassDir] + "<br>"
            else if (elem === "temperature") curr_weather_div.innerHTML += elem + ": " + current_weather[elem] + " °C<br>"
            else if (elem === "windspeed") curr_weather_div.innerHTML += elem + ": " + current_weather[elem] + " km/h<br>"
        }
    }
    pasteData()
}

function mobileVersion() {

}

function desktopVersion() {

}

function getPlatform() {
    const isMobile = /iphone|ipad|android/i.test(navigator.userAgent)
    return isMobile ? "mobile" : "desktop"
}