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

    static icons = {
        "sunset": "<img src='https://img.icons8.com/ios/50/null/sunset--v1.png'/>",
        "sunrise": "<img src='https://img.icons8.com/ios/50/null/sunrise--v1.png'/>",
        "precipitation": "<img src='https://img.icons8.com/external-microdots-premium-microdot-graphic/64/null/external-precipitation-weather-forecast-microdots-premium-microdot-graphic-2.png' />",
        "visibility": '<img src="https://img.icons8.com/fluency-systems-filled/48/null/visible.png"/>',
        "humidity": '<img src="https://img.icons8.com/ios-glyphs/30/null/hygrometer.png"/>',
    }

    static bgImages = {
        0: "https://cdn.glitch.global/6657a51d-b131-4f5d-b5be-dbcf44368ed8/am.jpg?v=1680703581670",
        1: "https://cdn.glitch.global/6657a51d-b131-4f5d-b5be-dbcf44368ed8/midday_1.png?v=1680703923207",
        2: "https://cdn.glitch.global/6657a51d-b131-4f5d-b5be-dbcf44368ed8/pm.jpg?v=1680703588085",
    }

    static dayOfWeek = {
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
        0: "Sunday",
    }

    static month = {
        '01': "January",
        '02': "February",
        '03': "March",
        '04': "April",
        '05': "May",
        '06': "June",
        '07': "July",
        '08': "August",
        '09': "September",
        '10': "October",
        '11': "November",
        '12': "December",
    }

    static url_daily_temp_max_min(class_) {
        return `https://api.open-meteo.com/v1/forecast?latitude=${class_.x}&longitude=${class_.y}&timezone=Europe/Budapest&daily=temperature_2m_max,temperature_2m_min&forecast_days=1`
    }

    static url_hourly_temp(class_) {
        return `https://api.open-meteo.com/v1/forecast?latitude=${class_.x}&longitude=${class_.y}&timezone=Europe/Budapest&hourly=temperature_2m&forecast_days=1`
    }

    static url_daily_sunrise_sunset(class_) {
        return `https://api.open-meteo.com/v1/forecast?latitude=${class_.x}&longitude=${class_.y}&timezone=Europe/Budapest&daily=sunrise,sunset&forecast_days=1`
    }

    static url_hourly_visibility(class_) {
        return `https://api.open-meteo.com/v1/forecast?latitude=${class_.x}&longitude=${class_.y}&timezone=Europe/Budapest&hourly=visibility&forecast_days=1`
    }

    static url_hourly_weathercode(class_) {
        return `https://api.open-meteo.com/v1/forecast?latitude=${class_.x}&longitude=${class_.y}&timezone=Europe/Budapest&hourly=weathercode&forecast_days=1`
    }

    static url_time() {
        return "https://worldtimeapi.org/api/timezone/Europe/Budapest"
    }

    static get_X_Y_coords(searchedvalue) {

    }
}

async function onLoad() {
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

    const main_class = new Main();
    await main_class.fetchDataFromWeatherAPI(x, y)
}

class Main {

    async fetchDataFromWeatherAPI(x, y) {
        const objClass = new objects(x, y)

        let json = ""
        let json_time = ""

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

        async function fetchDateTime() {
            await fetchTime(objects.url_time())
            return [
                json_time['datetime'],
                json_time['day_of_week'],
            ]
        }

        async function fetchDataDaily() {
            await fetchData(objects.url_daily_temp_max_min(objClass))
            return [
                "H: " + Math.round(json["daily"]["temperature_2m_max"][0]) + "° ",
                "L: " + Math.round(json["daily"]["temperature_2m_min"][0]) + "° "
            ]
        }

        async function fetchDataCurrentTemperature(hour) {
            await fetchData(objects.url_hourly_temp(objClass))
            return json['hourly']['temperature_2m'][hour] + "° "
        }

        async function fetchDataSunriseSunset() {
            await fetchData(objects.url_daily_sunrise_sunset(objClass))
            return [
                json['daily']["sunrise"][0].slice(11) + "<br>",
                json['daily']['sunset'][0].slice(11)
            ]
        }

        async function fetchDataVisibility(hour) {
            await fetchData(objects.url_hourly_visibility(objClass))
            return json['hourly']['visibility'][hour] + " m"
        }

        async function fetchDataWeathercode() {
            await fetchData(objects.url_hourly_weathercode(objClass))
            return [
                json['hourly']['time'],
                json['hourly']['weathercode']
            ]
        }

        async function fetchTimeCurrentTime() {
            await fetchTime(objects.url_time())
            return json_time['datetime']
        }

        // Paste Data
        async function pasteData() {
            // main divs
            const datetime_div = document.querySelector('.datetime')
            const hl_temperature_div = document.querySelector('.hl-temperature')
            const curr_temp = document.querySelector('.m_current-temperature')
            const srsn_sun_div = document.querySelector('.srsn-sun')
            const visibility_div = document.querySelector('.visibility')
            const weathercode_div = document.querySelector('.weathercode')
            const wait_span = document.querySelector('.wait')

            // await fetch, call functions
            let [h, l] = await fetchDataDaily()
            let [sunrise, sunset] = await fetchDataSunriseSunset()
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

            // reformat current temperature
            let c_temp = await fetchDataCurrentTemperature(posAt)

            // reformat datetime
            let [date, day] = await fetchDateTime()
            let year = date.slice(0, -28).toString()
            let month = date.slice(5, -25).toString()

            // appending data into main divs
            wait_span.innerHTML = ""
            datetime_div.innerHTML = objects.dayOfWeek[day] + ", " + day + " " + objects.month[month] + " " + year
            hl_temperature_div.innerHTML = h + l
            curr_temp.innerHTML = c_temp
            srsn_sun_div.innerHTML = objects.icons['sunrise'] + sunrise + objects.icons['sunset'] + sunset
            visibility_div.innerHTML = objects.icons['visibility'] + visibility
            weathercode_div.innerHTML = objects.objWeathercode[weathercodeToday]
        }

        async function changeBGImage() {
            const body = document.querySelector('body')
            const time = await fetchTime(objects.url_time())
            let nowHour = time['datetime'].slice(11, -19)
            let nowHour_00 = time['datetime'].slice(11, -20)

            if(nowHour <= 9 || nowHour_00 === 0) body.style.backgroundImage = `url('${objects.bgImages[0]}')`
            else if(nowHour >= 10 && nowHour <= 17) body.style.backgroundImage = `url('${objects.bgImages[1]}')`
            else if(nowHour >= 18 && nowHour <= 23 ) {
                body.style.backgroundImage = `url('${objects.bgImages[2]}')`
            }
        }
        await changeBGImage()
        await pasteData()
    }

    static changeTextColor(color) {

    }
}