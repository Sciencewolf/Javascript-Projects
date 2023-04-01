function onLoad() {
    if(getPlatform() === "mobile") mobileVersion()
    else if(getPlatform() === "desktop") desktopVersion()
    actions()
}

function actions() {
    add_remove_completeTask()
}

function add_remove_completeTask() {
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

            const i_ = document.createElement('i')
            i_.className = "fa fa-close"
            remove_button.appendChild(i_)

            const complete_button = document.createElement('button')
            complete_button.className = "btn-complete"
            complete_button.innerText = "Complete"

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

            removeTask()
            completeTask()
            // styling()
        }
    })
}

function removeTask() {
    let remove_btn = document.getElementsByClassName("btn-remove")

    for(let btn = 0;btn < remove_btn.length;btn++) {
        remove_btn[btn].addEventListener('click', () => {
            let div = remove_btn[btn].parentElement
            div.style.display = "none"
        })
    }
}

function completeTask() {
    const complete_btn = document.querySelectorAll('.btn-complete')
    const p_task = document.getElementById('p-task')
    const p_type = document.getElementById('p-type')
    const p_date = document.getElementById('p-date')

    const elements = [p_type, p_date];

    for(let i = 0;i< complete_btn.length;i++){
        complete_btn[i].addEventListener('click', () => {
            let parent_span_of_completebtn = complete_btn[i].parentElement
            parent_span_of_completebtn.style.backgroundColor = "lightslategrey"
            complete_btn[i].style.curson = "default"

            let parent = complete_btn[i].parentElement
            parent.removeChild(complete_btn[i])
            for (let elem of elements) elem.style.textDecoration = "line-through"

            p_task.innerHTML = "Task Completed" // first child, need to fix 
            // image <img src="https://img.icons8.com/parakeet/48/null/checked-checkbox.png"/>
        })
    }
}

async function mobileVersion() {
    quotes("https://raw.githubusercontent.com/Sciencewolf/Javascript-Projects/master/todoapp/short-quotes.json", 10)
}

function desktopVersion() {
    quotes("https://raw.githubusercontent.com/Sciencewolf/Javascript-Projects/master/todoapp/quotes.json", 25)
}

function cookies() {

}

async function quotes(url, times) {
    const quote_div = document.querySelector('.quote')
    let rand_num = Math.floor(Math.random() * times)

    let data = await fetch(url)
    let json = await data.json();
    let str = `<span id='span-qouteoftheday'>Quote of the Day:</span>   ${JSON.stringify(json["quotes"][`${rand_num}`][`${++rand_num}`])}`

    let wordsIn_str = str.split(" ")
    let count_words = (wordsIn_str.length - 4) * 750

    quote_div.innerHTML = str.replaceAll('"', '')

    setTimeout(() => {
        quote_div.style.display = "none"
    }, count_words)
}

function getPlatform() {
    const isMobile = /android|iphone|ipad|ipod/i.test(navigator.userAgent)
    return isMobile ? "mobile" : "desktop"
}

function setInputToToday() {
    const date = new Date()
    let _date = date.toISOString().substring(0, 10)
    return _date
}

function styling() {
    const span_task = document.querySelector('.span-task')
    const p_task = document.getElementById('p-task')
    const p_type = document.getElementById('p-type')
    const p_date = document.getElementById('p-date')

    const elements = [p_task, p_type, p_date];

    if (p_type.innerHTML === "Other") {
        span_task.style.backgroundColor = "green"
        for (const element of elements) element.style.color = "black"
    }
    else if (p_type.innerHTML === "Walk") {
        span_task.style.backgroundColor = "grey"
        for (const element of elements) element.style.color = "black"
    }
}