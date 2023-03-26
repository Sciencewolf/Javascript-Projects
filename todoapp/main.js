const onLoad = () => {
    if(getPlatform() === "mobile") mobileVersion()
    else if(getPlatform() === "desktop") desktopVersion()
    quotes()
    actions()
}

function actions() {
    addTask()
    removeTask()
    dropdown()
}

function addTask() {
    const add_button = document.getElementById("btn-add")
    const list = document.querySelector('.list')

    add_button.addEventListener('click', () => {
        const input_value = document.getElementById('input-task')

        const span = document.createElement('span')
        span.className = "span-task"
        const p = document.createElement('p')
        p.id = "p-task"
        p.innerHTML = input_value.value
        const p_type = document.createElement('p')
        p_type.id = "p-type"
        p_type.innerHTML = 

        span.appendChild(p)
        span.appendChild(p_type)

        list.appendChild(span)
    })
}

function removeTask() {
    
}

function cookies() {

}

function dropdown() {
    const dropdown_div = document.querySelector('.dropdown')

    dropdown_div.addEventListener('click', () => {
        
    })
}

async function quotes() {
    const tip_div = document.querySelector('.quote')
    let rand_num = 0
    rand_num = Math.floor(Math.random() * 25)
    console.log(rand_num)

    let data = await fetch("quotes.json")
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