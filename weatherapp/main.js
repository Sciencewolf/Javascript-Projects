function onLoad() {
    if(getPlatform() === "mobile") mobileVersion()
    else if(getPlatform() === 'desktop') desktopVersion()
    actions()
}

function actions() {
    onLoadGetGeolocation()
}

function onLoadGetGeolocation() {
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

    return await fetch(
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
}

async function fetchData() {

}

function mobileVersion() {

}

function desktopVersion() {

}

function getPlatform() {
    const isMobile = /iphone|ipad|android/i.test(navigator.userAgent)
    return isMobile ? "mobile" : "desktop"
}