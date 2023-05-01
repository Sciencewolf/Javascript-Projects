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
        55: "Drizzle",
        56: "Freezing Drizzle",
        57: "Freezing Drizzle",
        61: "Rain",
        63: "Rain",
        65: "Rain",
        66: "Freezing Rain",
        67: "Freezing Rain",
        71: "Snow",
        73: "Snow ",
        75: "Snow ",
        77: "Snow Grains",
        80: "Rain Shower",
        81: "Rain Shower",
        82: "Rain Shower",
        85: "Snow Shower",
        86: "Snow Shower",
        95: "Thunderstorm",
        96: "Thunderstorm: with Slight and Heavy Hail"
    }

    static bgImages = {
        0: "https://cdn.glitch.global/6657a51d-b131-4f5d-b5be-dbcf44368ed8/am.jpg?v=1681156306593",
        1: "https://cdn.glitch.global/6657a51d-b131-4f5d-b5be-dbcf44368ed8/midday_1.png?v=1680703923207",
        2: "https://cdn.glitch.global/6657a51d-b131-4f5d-b5be-dbcf44368ed8/pm.jpg?v=1681156399767",
        3: "https://cdn.glitch.global/6657a51d-b131-4f5d-b5be-dbcf44368ed8/night.jpg?v=1680729064976",
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

    static async getCoords(searchedvalue) {
        const response = await fetch(
            `https://api.api-ninjas.com/v1/geocoding?city=${searchedvalue}`,
            { method: "GET", headers: {"X-Api-Key": "dqx2IUzCCSXClal7HrQpjQ==8FG8UkeolLhT9hxD"}, mode: "cors"
            })
        return await response.json()
    }
}

async function onLoad() {
    onLoadGetGeolocation()
}

function onLoadGetGeolocation() {
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

    const response = await fetch(url, { method: "GET" })
    const resJSON = await response.json()
    span_geolocation.innerHTML = `${resJSON['city']},  ${resJSON['countryCode']}`

    const main_class = new Main();
    await main_class.fetchDataFromWeatherAPI(x, y)
}

async function reloadData(x, y) {
    let bdcApi = "https://api.bigdatacloud.net/data/reverse-geocode-client"
    const span_geolocation = document.getElementById('geolocation')
    let url = bdcApi + "?latitude=" + x + "&longitude=" + y + "&localityLanguage=en"

    const response = await fetch(url, {method: 'GET'})
    const json = await response.json()

    if(json['city'] !== "") span_geolocation.innerHTML = json['city'] + ", " + json['countryCode']
    else span_geolocation.innerHTML = json['locality'] + ", " + json['countryCode']

    const main_class = new Main()
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
                Main.handleErrors(err)
            }
        }

        async function fetchTime(__url) {
            try {
                const response = await fetch(__url)
                return json_time = await response.json()
            }catch(err) {
                Main.handleErrors(err)
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
                Math.round(json["daily"]["temperature_2m_max"][0]) + "°  / ",
                Math.round(json["daily"]["temperature_2m_min"][0]) + "° "
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

        async function fetchInput(value) {
            return await objects.getCoords(value)
        }

        async function awaitDatas() {
            let [h, l] = await fetchDataDaily()
            let [sunrise, sunset] = await fetchDataSunriseSunset()
            let [time_, weathercode] = await fetchDataWeathercode()
            let _timeCurrent = await fetchTimeCurrentTime()

            let currentHour = _timeCurrent.slice(11, -19)
            let currentHourlist = []

            for(let i = 0;i<time_.length;i++) { currentHourlist[i] = time_[i].slice(11, -3) }
            let posAt = currentHourlist.indexOf(currentHour)
            let weathercodeToday = weathercode[posAt]

            let visibility = await fetchDataVisibility(posAt)

            let c_temp = await fetchDataCurrentTemperature(posAt)

            let [date, day_of_week] = await fetchDateTime()
            let year = date.slice(0, -28).toString()
            let month = date.slice(5, -25).toString()
            let day;

            if(date.slice(8, -22).startsWith('0')) {
                day = date.slice(9, -22).toString()
            }
            else {
                day = date.slice(8, -22).toString()
            }

            return [
                h, l, sunrise, sunset, weathercodeToday, visibility, c_temp, day_of_week, year, month, day
            ]
        }

        async function pasteDatabySearch() {
            const input = document.getElementById('search-input')
            const div_guess = document.querySelector('.guess')
            let [
                h, l, sunrise, sunset, weathercodeToday, visibility, c_temp, day_of_week, year, month, day
            ] = await awaitDatas()

            let timeout

            input.addEventListener('keypress', async (e) => {
                    if(input.value !== "") {
                        div_guess.innerHTML = ""
                        clearTimeout(timeout)
                        const span = document.createElement('span')
                        span.innerHTML = 'Wait...'
                        div_guess.appendChild(span)
                        div_guess.style.display = 'block'

                        timeout = setTimeout(async() => {
                            setTimeout(async() => {
                                await handleInput(input, div_guess)
                            }, 1000)
                        }, 1000)
                    }
                    else if (e.key === 'Enter' && input.value !== "") {
                        div_guess.innerHTML = ""
                        const span = document.createElement('span')
                        span.innerHTML = 'Wait...'
                        div_guess.appendChild(span)
                        div_guess.style.display = 'block'
                        await handleInput(input, div_guess)
                    }
            })
            Main.pasteInnerHTML(day_of_week, day, month, year, h, l, c_temp, sunrise, sunset, visibility, weathercodeToday)
        }

        async function handleInput(input_elem, div_guess) {
            try {
                const input = document.getElementById('search-input')

                const json_input = await fetchInput(input.value)
                if(json_input.length > 1) {
                    div_guess.innerHTML = ""
                    div_guess.style.display = "block"
                    for(let i = 0;i<json_input.length;i++) {
                        const span = document.createElement('span')
                        span.id = `${i}`

                        if(i !== 0) {
                            if(json_input[i - 1]['name'] === json_input[i]['name'] && json_input[i]['state'] !== undefined) {
                                span.innerHTML = json_input[i]['name'] + ", " + json_input[i]['country'] + ", " + json_input[i]['state']
                            }
                            else span.innerHTML = json_input[i]['name'] + ", " +json_input[i]['country']
                        }
                        else span.innerHTML = json_input[i]['name'] + ", " + json_input[i]['country']
                        div_guess.appendChild(span)
                    }

                    const spans = document.getElementById('guess').getElementsByTagName('span')
                    for(let i = 0;i<spans.length;i++) {
                        spans[i].addEventListener('click', async function(event) {
                            input_elem.placeholder = event.target.innerHTML
                            input_elem.value = ""

                            let id_of_selected_element = event.target.id.toString()
                            let x = json_input[id_of_selected_element]['latitude']
                            let y = json_input[id_of_selected_element]['longitude']
                            div_guess.innerHTML = ""
                            div_guess.style.display = 'none'

                            await reloadData(x, y)
                        })
                    }
                }
                else {
                    input_elem.placeholder = json_input[0]['name'] + ", " + json_input[0]['country']
                    input_elem.value = ''
                    input_elem.blur()
                    let x = json_input[0]['latitude']
                    let y = json_input[0]['longitude']

                    div_guess.innerHTML = ""
                    div_guess.style.display = 'none'
                    await reloadData(x, y)

                }
            }catch (err) { Main.onInputError() }
        }

        async function pasteData() {
            let [
                h, l, sunrise, sunset, weathercodeToday, visibility, c_temp, day_of_week, year, month, day
            ] = await awaitDatas()
            Main.pasteInnerHTML(day_of_week, day, month, year, h, l, c_temp, sunrise, sunset, visibility, weathercodeToday)
        }

        const time = await fetchTime(objects.url_time())

        await Main.changeBGImage(time)
        await pasteDatabySearch()
        await pasteData()
        if(Main.isMobilePlatform()) await Main.mobileVersion()
    }

    static getElement() {
        const datetime_div = document.querySelector('.datetime')
        const hl_temperature_div = document.querySelector('.hl-temperature')
        const curr_temp = document.querySelector('.m_current-temperature')
        const srsn_sun_div = document.querySelector('.srsn-sun')
        const visibility_div = document.querySelector('.visibility')
        const weathercode_div = document.querySelector('.weathercode')
        const wait_span = document.querySelector('.wait')

        return [
            datetime_div, hl_temperature_div, curr_temp, srsn_sun_div, visibility_div, weathercode_div, wait_span
        ]
    }

    static pasteInnerHTML(day_of_week, day, month, year, h, l, c_temp, sunrise, sunset, visibility, weathercodeToday) {
        let [
            datetime_div,
            hl_temperature_div,
            curr_temp,
            srsn_sun_div,
            visibility_div,
            weathercode_div,
            wait_span
        ] = this.getElement()

        wait_span.innerHTML = ""
        datetime_div.innerHTML = objects.dayOfWeek[day_of_week] + ", " + day + " " + objects.month[month] + " " + year
        weathercode_div.innerHTML = objects.objWeathercode[weathercodeToday]
        curr_temp.innerHTML = c_temp
        hl_temperature_div.innerHTML = h + l
        srsn_sun_div.innerHTML = 'Sunrise: ' + sunrise + 'Sunset: ' + sunset
        visibility_div.innerHTML = 'Visibility: ' + visibility
    }

    static async changeBGImage(time) {
        const body = document.querySelector('body')
        let nowHour = time['datetime'].slice(11, -19)
        let nowHour_00 = time['datetime'].slice(11, -20)

        if(nowHour_00 === 0 || (nowHour >= 1 && nowHour <= 5)) {
            body.style.backgroundImage = `url('${objects.bgImages[3]}')`
            body.style.color = 'white'
            body.id = 'night'
        }
        else if(nowHour >= 6 && nowHour <= 10) {
            body.style.backgroundImage = `url('${objects.bgImages[0]}')`
            body.id = 'am'
        }
        else if(nowHour >= 11 && nowHour <= 17) {
            body.style.backgroundImage = `url('${objects.bgImages[1]}')`
            body.id = 'midday'
        }
        else if(nowHour >= 18 && nowHour <= 21) {
            body.style.backgroundImage = `url('${objects.bgImages[2]}')`
            body.style.color = 'white'
            body.id = 'pm'
        }
        else if(nowHour <= 23) {
            body.style.backgroundImage = `url('${objects.bgImages[3]}')`
            body.style.color = 'white'
            body.id = 'night'
        }
    }

    static Favorites() {
        const btn_add = document.getElementById('btn-add')

        btn_add.addEventListener('click', () => {

        })
    }

    static isMobilePlatform() {
        return /android|iphone|ipad/i.test(navigator.userAgent)
    }

    static mobileVersion() {
        const geoloc = document.getElementById('geolocation')

        if(geoloc.innerHTML.length > 14) {
            geoloc.style.fontSize = '20px'
            geoloc.style.top = '3em'
            geoloc.style.right = '1em'
            geoloc.style.textAlign = 'center'
            geoloc.style.left = '0px'
            geoloc.style.width = `${window.innerWidth}px`
        }
        else {
            geoloc.style.fontSize = null
            geoloc.style.top = null
            geoloc.style.right = null
            geoloc.style.textAlign = null
            geoloc.style.left = null
            geoloc.style.width = null

            // or like this
            // geoloc.style.cssText = 'font-size: unset; top: unset; right: unset; text-align: unset; left: unset; width: unset;';
        }

        Main.changeThemeColor()
    }

    static changeThemeColor() {
        const meta_theme = document.getElementById('meta-theme')

        const interval = setInterval(() => {
            const body = document.querySelector('body')
            if(body.id !== 'default') {
                if(body.id === 'night') meta_theme.content = "#060d36"
                else if(body.id === 'am') meta_theme.content = '#ffcd80'
                else if(body.id === 'midday') {
                    body.style.color = 'black'
                    meta_theme.content = '#fff4a5'
                }
                else if(body.id === 'pm') meta_theme.content = '#3F3FD4'
                clearInterval(interval)
            }
        }, 100)
    }

    static handleErrors(err) {
        const body = document.querySelector('body')
        const span = document.createElement('span')

        console.log(err)

        span.id = 'span-error'
        span.innerHTML = 'Try Again! / Reload Page!'
        body.appendChild(span)

        setTimeout(() => {
            body.removeChild(span)
        }, 3000)
    }

    static onInputError() {
        const input = document.querySelector('#search-input')
        const div_guess = document.querySelector('.guess')

        if(typeof (input) !== undefined && input !== null) {
            input.value = ''
            input.placeholder = 'Try Again!'
            input.style.cssText = 'border: 1px solid red;'
            input.blur()

            div_guess.innerHTML = ''
            div_guess.style.display = 'none'
        }
    }
}