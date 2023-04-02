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

    let json = ""

    async function fetchData(_url) {
        return await fetch(
            _url, { method: "GET" }
        ).then(
            response => {
                return response.json()
            }
        ).then(
            resJSON => {
                json = resJSON
            }
        ).catch(err => {
            console.log(err)
        })
    }

    async function fetchDataDaily(day) {
        let max_temp = 0, min_temp = 0
        await fetchData(url_daily_temp_max_min)
        return [
            max_temp = "H: " + json["daily"]["temperature_2m_max"][day] + " °C",
            min_temp = "L: " + json["daily"]["temperature_2m_min"][day] + " °C"
        ]
    }

    async function fetchDataSunriseSunset(day) {
        await fetchData(url_daily_sunrise_sunset)
        return [
            json['daily']["sunrise"][day],
            json['daily']['sunset'][day]
        ]
    }

    async function fetchDataRain(day) {
        await fetchData(url_daily_rain)
        return json['daily']['precipitation_probability_mean'][day]
    }

    async function fetchDataCurrentWeather() {
        await fetchData(url_daily_currentweather)
        return json['current_weather']
    }

    const main = document.querySelector('main')

    let [h, l] = await fetchDataDaily(0)
    let [sunrise, sunset] = await fetchDataSunriseSunset(0)
    sunrise = "Sunrise: " + sunrise.slice(11)
    sunset = "Sunset: " + sunset.slice(11)

    let percentage_of_rain = await fetchDataRain(0)
    percentage_of_rain = "Precipitation Probability: " + percentage_of_rain + " %"
    let current_weather = await fetchDataCurrentWeather()

    main.innerHTML = h + "<br>" + l + "<br>"
    main.innerHTML += sunrise + "<br>" + sunset + "<br>"
    main.innerHTML += percentage_of_rain + "<br>"
    main.innerHTML += "Current Weather: <br>"

    // current weather
    for(let elem in current_weather) {
        if(elem === "time") {
            main.innerHTML += elem + " " + current_weather[elem].slice(11) + "<br>"
        }
        else if(elem === "winddirection" || elem === "weathercode") main.innerHTML += ""
        else main.innerHTML += elem + " " + current_weather[elem] + "<br>"
    }

    // last item in main
    main.innerHTML += "<div class='current-weather'>gfd</div>"
}

function mobileVersion() {

}

function desktopVersion() {

}

function getPlatform() {
    const isMobile = /iphone|ipad|android/i.test(navigator.userAgent)
    return isMobile ? "mobile" : "desktop"
}