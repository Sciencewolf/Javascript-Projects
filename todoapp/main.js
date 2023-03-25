const onLoad = () => {
    if(getPlatform() === "mobile") mobileVersion()
    else if(getPlatform() === "desktop") desktopVersion()
    quotes()
}

function addTask() {
}

function removeTask() {
    
}

function cookies() {

}

function dropdown() {
    
}

async function quotes() {
    const tip_div = document.querySelector('.quote')
    let rand_num = 0
    rand_num = Math.floor(Math.random() * 25)
    console.log(rand_num)

    let data = await fetch("https://raw.githubusercontent.com/Sciencewolf/Javascript-Projects/master/todoapp/quotes.json")
    let json = await data.json();
    let str = "Quote of the Day: ".concat(JSON.stringify(json["quotes"][`${rand_num}`][`${++rand_num}`]))

    tip_div.innerHTML = str.replaceAll('"', '')
}

function footer() {

}

function getPlatform() {
    const isMobile = /android|iphone|ipad|ipod/i.test(navigator.userAgent)
    return isMobile ? "mobile" : "desktop"
}

function mobileVersion() {

}

function desktopVersion() {

}