class objects {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    static objWeathercode = {
        0: "Clear",
        1: "Mainly Clear",
        2: "Partly Cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing Rime Fog",
        51: "Drizzle: Light",
        53: "Drizzle: Moderate",
        55: "Drizzle: Dense Intensity",
        56: "Freezing Drizzle: Light",
        57: "Freezing Drizzle: Dense Intensity",
        61: "Rain: Slight",
        63: "Rain: Moderate",
        65: "Rain: Heavy Intensity",
        66: "Freezing Rain: Light",
        67: "Freezing Rain: Heavy Intensity",
        71: "Snow Fall: Slight",
        73: "Snow Fall: Moderate",
        75: "Snow Fall: Heavy Intensity",
        77: "Snow Grains",
        80: "Rain Showers: Slight",
        81: "Rain Showers: Moderate",
        82: "Rain Showers: Violent",
        85: "Snow Shower: Slight",
        86: "Snow Shower: Heavy",
        95: "Thunderstorm: Slight or Moderate",
        96: "Thunderstorm: with Slight and Heavy Hail"
    }

    static images = {
        "sunset": "<img src='https://img.icons8.com/ios/50/null/sunset--v1.png'/>",
        "sunrise": "<img src='https://img.icons8.com/ios/50/null/sunrise--v1.png'/>",
        "precipitation": "<img src='https://img.icons8.com/external-microdots-premium-microdot-graphic/64/null/external-precipitation-weather-forecast-microdots-premium-microdot-graphic-2.png' />",
        "visibility": '<img src="https://img.icons8.com/fluency-systems-filled/48/null/visible.png"/>',
        "humidity": '<img src="https://img.icons8.com/ios-glyphs/30/null/hygrometer.png"/>',
    }

    static compassDirections = [
        "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"
    ]

    static url_daily_temp_max_min(class_) {
        return `https://api.open-meteo.com/v1/forecast?latitude=${class_.x}&longitude=${class_.y}&timezone=Europe/Budapest&daily=temperature_2m_max,temperature_2m_min&forecast_days=1`
    }

    static url_daily_sunrise_sunset(class_) {
        return `https://api.open-meteo.com/v1/forecast?latitude=${class_.x}&longitude=${class_.y}&timezone=Europe/Budapest&daily=sunrise,sunset&forecast_days=1`
    }

    static url_daily_rain(class_) {
        return `https://api.open-meteo.com/v1/forecast?latitude=${class_.x}&longitude=${class_.y}&timezone=Europe/Budapest&daily=precipitation_probability_mean&forecast_days=1`
    }

    static url_daily_currentweather(class_) {
        return `https://api.open-meteo.com/v1/forecast?latitude=${class_.x}&longitude=${class_.y}&timezone=Europe/Budapest&current_weather=true&forecast_days=1`
    }

    static url_hourly_visibility(class_) {
        return `https://api.open-meteo.com/v1/forecast?latitude=${class_.x}&longitude=${class_.y}&timezone=Europe/Budapest&hourly=visibility&forecast_days=1`
    }

    static url_hourly_humidity(class_) {
        return `https://api.open-meteo.com/v1/forecast?latitude=${class_.x}&longitude=${class_.y}&timezone=Europe/Budapest&hourly=relativehumidity_2m&forecast_days=1`
    }

    static url_hourly_weathercode(class_) {
        return `https://api.open-meteo.com/v1/forecast?latitude=${class_.x}&longitude=${class_.y}&timezone=Europe/Budapest&hourly=weathercode&forecast_days=1`
    }
}

async function onLoad() {
    if(getPlatform() === "mobile") mobileVersion()
    else if(getPlatform() === 'desktop') desktopVersion()
    await onLoadGetGeolocation()
}

async function onLoadGetGeolocation() {
    const span_geolocation = document.getElementById('geolocation')
    if(navigator.geolocation) navigator.geolocation.getCurrentPosition(position)
    else span_geolocation.innerHTML = "unknown"
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
        span_geolocation.innerHTML = `${resJSON['city']},  ${resJSON['countryCode']}`
    ).catch(_ => {
        span_geolocation.innerHTML = "Error!"
    })
    await fetchDataFromWeatherAPI(x, y)
}

async function fetchDataFromWeatherAPI(x, y) {
    const objClass = new objects(x, y)

    let json = ""
    let json_time = ""
    let urltime = "https://worldtimeapi.org/api/timezone/Europe/Budapest"

    async function fetchData(_url) {
        try {
            const response = await fetch(_url, { method: "GET" })
            return json = await response.json()
        }catch (err) {
            console.log(err)
        }
    }

    async function fetchTime(__url) {
        try {
            const response = await fetch(__url)
            return json_time = await response.json()
        }catch(err) {
            console.log(err)
        }
    }

    async function fetchDataDaily() {
        await fetchData(objects.url_daily_temp_max_min(objClass))
        return [
            "H: " + Math.round(json["daily"]["temperature_2m_max"][0]) + "° ",
            "L: " + Math.round(json["daily"]["temperature_2m_min"][0]) + "° "
        ]
    }

    async function fetchDataSunriseSunset() {
        await fetchData(objects.url_daily_sunrise_sunset(objClass))
        return [
            json['daily']["sunrise"][0].slice(11) + "<br>",
            json['daily']['sunset'][0].slice(11)
        ]
    }

    async function fetchDataRain() {
        await fetchData(objects.url_daily_rain(objClass))
        return json['daily']['precipitation_probability_mean'][0] + " %"
    }

    async function fetchDataCurrentWeather() {
        await fetchData(objects.url_daily_currentweather(objClass))
        return json['current_weather']
    }

    async function fetchDataVisibility(hour) {
        await fetchData(objects.url_hourly_visibility(objClass))
        return json['hourly']['visibility'][hour] + " m"
    }

    async function fetchDataHumidity(hour) {
        await fetchData(objects.url_hourly_humidity(objClass))
        return json['hourly']['relativehumidity_2m'][hour] + " %"
    }

    async function fetchDataWeathercode() {
        await fetchData(objects.url_hourly_weathercode(objClass))
        return [
            json['hourly']['time'],
            json['hourly']['weathercode']
        ]
    }

    async function fetchTimeCurrentTime() {
        await fetchTime(urltime)
        return json_time['datetime']
    }

    // Paste Data
    async function pasteData() {
        // main divs
        const hl_temperature_div = document.querySelector('.hl-temperature')
        const srsn_sun_div = document.querySelector('.srsn-sun')
        const rain_chance_div = document.querySelector('.rain-chance')
        const visibility_div = document.querySelector('.visibility')
        const humidity_div = document.querySelector('.humidity')
        const weathercode_div = document.querySelector('.weathercode')
        const wait_span = document.querySelector('.wait')

        // current weather divs
        const current_weather_div = document.querySelector('.wrapper-current-weather')
        const current_temperature_div = document.querySelector('.current-temperature')
        const current_windspeed_div = document.querySelector('.current-windspeed')
        const current_winddirection_div = document.querySelector('.current-winddirection')
        const current_lasttimeupdated_div = document.querySelector('.current-lasttimeupdated')
        const wait_currentweather_div = document.querySelector('.wait-currweather')

        // await fetch, call functions
        let [h, l] = await fetchDataDaily(0)
        let [sunrise, sunset] = await fetchDataSunriseSunset(0)
        let percentage_of_rain = await fetchDataRain(0)
        let current_weather = await fetchDataCurrentWeather()
        let [time_, weathercode] = await fetchDataWeathercode()
        let _timeCurrent = await fetchTimeCurrentTime()

        let currentHour = _timeCurrent.slice(11, -19)
        let currentHourlist = []
        // reformat weathercode
        for(let i = 0;i<time_.length;i++) { currentHourlist[i] = time_[i].slice(11, -3) }
        let posAt = currentHourlist.indexOf(currentHour)
        let weathercodeToday = weathercode[posAt]
        // reformat visibility
        let visibility = await fetchDataVisibility(posAt)
        // reformat humidity
        let humidity = await fetchDataHumidity(posAt)

        // appending data into main divs
        wait_span.innerHTML = ""
        hl_temperature_div.innerHTML = h + l
        srsn_sun_div.innerHTML = objects.images['sunrise'] + sunrise + objects.images['sunset'] + sunset
        rain_chance_div.innerHTML = objects.images['precipitation'] + percentage_of_rain
        visibility_div.innerHTML = objects.images['visibility'] + visibility
        humidity_div.innerHTML = objects.images['humidity'] + humidity
        weathercode_div.innerHTML = objects.objWeathercode[weathercodeToday]
        wait_currentweather_div.innerHTML = "Current Weather: <br>"

        let compassDir = Math.round((current_weather['winddirection']) / 45)

        // current weather
        for (let elem in current_weather) {
            if (elem === "time") current_lasttimeupdated_div.innerHTML = "Last time updated: " + current_weather[elem].slice(11) + "<br>"
            else if (elem === "weathercode") continue
            else if(elem === "winddirection")
                current_winddirection_div.innerHTML = elem + ": " + current_weather[elem] + "° " + objects.compassDirections[compassDir] + "<br>"
            else if (elem === "temperature") current_temperature_div.innerHTML = elem + ": " + current_weather[elem] + " °C<br>"
            else if (elem === "windspeed") current_windspeed_div.innerHTML = elem + ": " + current_weather[elem] + " km/h<br>"
        }
    }
    await pasteData()
}

function mobileVersion() {

}

function desktopVersion() {

}

function getPlatform() {
    const isMobile = /iphone|ipad|android/i.test(navigator.userAgent)
    return isMobile ? "mobile" : "desktop"
}