function onLoad() {
    if(getPlatform() === "mobile") mobileVersion()
    else if(getPlatform() === "desktop") desktopVersion()
    actions()
}

function actions() {
    addTask()
    footer()
}

function setInputToToday() {
    const date = new Date()
    let _date = date.toISOString().substring(0, 10)
    return _date
}

function addTask() {
    const list_todo_div = document.querySelector('.list-todo')
    const add_button = document.getElementById("btn-add")
    const list = document.querySelector('.list')
    const select_ = document.querySelector('.dropdown')
    const input_date = document.getElementById('input-date')
    const input_value = document.getElementById('input-task')

    add_button.addEventListener('click', () => {
        if(input_value.value === "") {
            input_value.style.border = "1px solid red"
        }
        else {
            input_value.style.border = "none"
            const span = document.createElement('span')
            span.className = "span-task"

            const p_task = document.createElement('p')
            p_task.id = "p-task"
            p_task.innerHTML = input_value.value

            const p_type = document.createElement('p')
            p_type.id = "p-type"
            if (select_.options[select_.selectedIndex].text === "-- Select --") {
                p_type.innerText = "Other"
            }
            else {
                p_type.innerText = select_.options[select_.selectedIndex].text
            }

            const p_date = document.createElement('p')
            p_date.id = "p-date"
            if(input_date.value === "") {
                p_date.innerHTML = setInputToToday()
            }
            else p_date.innerText = input_date.value

            const remove_button = document.createElement('button')
            remove_button.className = "btn-remove"
            remove_button.innerText = "Remove"
            // remove_button.addEventListener('click', removeTask()) // 

            const i_ = document.createElement('i')
            i_.className = "fa fa-close"
            remove_button.appendChild(i_)

            const complete_button = document.createElement('button')
            complete_button.className = "btn-complete"
            complete_button.innerText = "Complete"
            // completeTask.addEventListener('click', completeTask()) // 

            const i__ = document.createElement('i')
            i__.className = "fa-solid fa-check"
            complete_button.appendChild(i__)

            span.appendChild(p_task)
            span.appendChild(p_type)
            span.appendChild(p_date)
            span.appendChild(remove_button)
            span.appendChild(complete_button)

            list.appendChild(span)
            list_todo_div.style.display = "block"

            // reset all inputs to default
            input_value.value = ""
            select_.selectedIndex = 0
            input_date.value = ""
        }
    })
}

function removeTask() {
    const remove_btn = document.querySelector('.btn-remove')
    const list = document.querySelector('.list')

    let parent_span_of_removebtn = remove_btn.parentElement
    list.removeChild(parent_span_of_removebtn)
}

function completeTask() {
    const complete_btn = document.querySelector('.btn-complete')
    let parent_span_of_completebtn = complete_btn.parentElement
    parent_span_of_completebtn.style.backgroundColor = "lightslategrey"
    complete_btn.style.curson = "default"
}

async function quotes() {
    const quote_div = document.querySelector('.quote')
    let rand_num = Math.floor(Math.random() * 25)

    let data = await fetch("https://raw.githubusercontent.com/Sciencewolf/Javascript-Projects/master/todoapp/quotes.json")
    let json = await data.json();
    let str = `<span id='span-qouteoftheday'>Quote of the Day:</span>   ${JSON.stringify(json["quotes"][`${rand_num}`][`${++rand_num}`]) }`

    let wordsIn_str = str.split(" ")
    let count_words = (wordsIn_str.length - 4) * 700

    quote_div.innerHTML = str.replaceAll('"', '')

    setTimeout(() => {
        quote_div.style.display = "none"
    }, count_words)
}

function footer() {
    const dev = document.querySelector('.dev')
    const date = new Date()
    
    dev.innerHTML = `Created By: Aron Marton \
    [<a href="https://github.com/Sciencewolf" target="_blank">GitHub</a>] ${date.getFullYear()}`
}

function getPlatform() {
    const isMobile = /android|iphone|ipad|ipod/i.test(navigator.userAgent)
    return isMobile ? "mobile" : "desktop"
}

async function mobileVersion() {

    async function quote() {
        const quote_div = document.querySelector('.quote')
        let rand_num = Math.floor(Math.random() * 10)

        let data = await fetch("https://raw.githubusercontent.com/Sciencewolf/Javascript-Projects/master/todoapp/short-quotes.json")
        let json = await data.json();
        let quote_from_json = JSON.stringify(json["quotes"][`${rand_num}`][`${++rand_num}`])
        let words_len = (quote_from_json.split(' ').length)

        let str = `<span id='span-qouteoftheday'>Quote of the Day:</span> ${quote_from_json}`
        quote_div.innerHTML = str.replaceAll('"', '')

        setTimeout(() => {
            quote_div.style.display = "none"
        }, words_len * 900)
    }
    quote()
}

function desktopVersion() {
    quotes()
}

function cookies() {

}