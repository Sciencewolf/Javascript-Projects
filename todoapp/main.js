function onLoad() {
    if(getPlatform() === "mobile") mobileVersion()
    else if(getPlatform() === "desktop") desktopVersion()
    actions()
    
    const input_date = document.getElementById('input-date')
    input_date.value = setInputToToday()
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

    input_value.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') createTask()
    })

    createTaskWithButtonClick()

    function createTask() {
        input_date.value = setInputToToday()

        if (input_value.value === "") {
            input_value.style.border = "1px solid red"
        }
        else {
            input_value.style.border = "none"
            input_value.focus()

            const task = createTaskElement()

            list.appendChild(task)
            list_todo_div.style.display = "block"

            // reset all inputs to default
            input_value.value = ""
            select_.selectedIndex = 0
            input_date.value = ""

            removeTask()
            completeTask()
        }
    }

    function createTaskWithButtonClick() {
        add_button.addEventListener('click', () => {
            input_date.value = setInputToToday()

            if (input_value.value === "") {
                input_value.style.border = "1px solid red"
            }
            else {
                input_value.style.border = "none"
                input_value.focus()

                const task = createTaskElement()

                list.appendChild(task)
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

    function createTaskElement() {
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
        if (input_date.value === "" || input_date.value === setInputToToday()) p_date.innerHTML = "Today"
        else p_date.innerText = input_date.value

        const remove_button = document.createElement('button')
        remove_button.className = "btn-remove"

        const i_ = document.createElement('i')
        i_.className = "fa fa-close"
        remove_button.appendChild(i_)

        const complete_button = document.createElement('button')
        complete_button.className = "btn-complete"

        const i__ = document.createElement('i')
        i__.className = "fa-solid fa-check"
        i__.id = "complete"
        complete_button.appendChild(i__)

        span.appendChild(p_task)
        span.appendChild(p_type)
        span.appendChild(p_date)
        span.appendChild(remove_button)
        span.appendChild(complete_button)

        return span
    }
}


function removeTask() {
    const list = document.querySelector('.list')
    let remove_btn = document.getElementsByClassName("btn-remove")
    let count = 0

    for(let btn = 0;btn < remove_btn.length;btn++) {
        remove_btn[btn].addEventListener('click', () => {
            if (!remove_btn[btn].parentElement) {
                throw null
            }
            else {
                var parent_div = remove_btn[btn].parentElement
                parent_div.style.display = 'none'
                count++
            }

            if(count >= remove_btn.length) list.style.border = "none"   // need to fix when multiple times removed border is seen
            else list.style.border = "2px solid black"
        })
    }
}

function completeTask() {
    const remove_btn = document.getElementsByClassName("btn-remove")
    const complete_btn = document.querySelectorAll('.btn-complete')

    const p_task = document.querySelectorAll('#p-task')
    const p_type = document.querySelectorAll('#p-type')
    const p_date = document.querySelectorAll('#p-date')

    for(let i = 0;i < complete_btn.length;i++){
        complete_btn[i].addEventListener('click', () => {
            if(complete_btn[i].parentElement !== "undefined") {
                let parent_span_of_completebtn = complete_btn[i].parentElement
                parent_span_of_completebtn.style.backgroundColor = "lightslategrey"
                parent_span_of_completebtn.removeChild(complete_btn[i])
                if(getPlatform() === 'desktop') remove_btn[i].style.right = "5px"
                else if(getPlatform() === 'mobile') remove_btn[i].style.right = "20px"

                p_task[i].style.textDecoration = "line-through"
                p_task[i].style.color = "black"
                p_type[i].innerHTML = "Task Completed!"
                p_date[i].style.display = "none"

                const img = document.createElement('img')
                img.id = "img-complete"
                img.src = "https://img.icons8.com/parakeet/48/null/checked-checkbox.png"
                parent_span_of_completebtn.appendChild(img)
            }
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