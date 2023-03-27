function onLoad() {
    if(getPlatform() === "mobile") mobileVersion()
    else if(getPlatform() === "desktop") desktopVersion()
    quotes()
    actions()
}

function actions() {
    const [addtask_fn] = addTask()
    addtask_fn()
    removeTask()
    dropdown()
    footer()
}

function addTask() {

    const map_of_tasks = new Map() // to store tasks, -- for delete and complete tasks
    let count = 0

    function create_div() {
        const list_todo_div = document.querySelector('.list-todo')
        const add_button = document.getElementById("btn-add")
        const list = document.querySelector('.list')
        const select_ = document.querySelector('.dropdown')

        add_button.addEventListener('click', () => {
            const input_value = document.getElementById('input-task')

            const span = document.createElement('span')
            span.className = "span-task"

            const p = document.createElement('p')
            p.id = "p-task"
            p.innerHTML = input_value.value

            const p_type = document.createElement('p')
            p_type.id = "p-type"
            p_type.innerHTML = select_.options[select_.selectedIndex].text

            const remove_button = document.createElement('button')
            remove_button.className = "btn-remove"
            remove_button.innerText = "Delete"
            const i_ = document.createElement('i')
            i_.className = "fa fa-close"
            remove_button.appendChild(i_)

            const complete_button = document.createElement('button')
            complete_button.className = "btn-complete"
            complete_button.innerText = "Complete"
            const i__ = document.createElement('i')
            i__.className = "fa-solid fa-check"
            complete_button.appendChild(i__)

            span.appendChild(p)
            span.appendChild(p_type)
            span.appendChild(remove_button)
            span.appendChild(complete_button)

            list.appendChild(span)
            list_todo_div.style.display = "block"

            map_of_tasks.set(++count, list)
            // console.log(map_of_tasks.entries())
        })
    }
    return [create_div, map_of_tasks]
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

    let data = await fetch("https://raw.githubusercontent.com/Sciencewolf/Javascript-Projects/master/todoapp/quotes.json")
    let json = await data.json();
    let str = "Quote of the Day: ".concat(JSON.stringify(json["quotes"][`${rand_num}`][`${++rand_num}`]))

    tip_div.innerHTML = str.replaceAll('"', '')

    setTimeout(() => {
        tip_div.style.display = "none"
    }, 2000)
}

function footer() {
    const dev = document.querySelector('.dev')
    const date = new Date()
    
    dev.innerHTML = `Created By: Aron Marton \
    <a href="https://github.com/Sciencewolf/Javascript-Projects/tree/master/todoapp" target="_blank">[Source Code]</a> ${date.getFullYear()}`
}

function getPlatform() {
    const isMobile = /android|iphone|ipad|ipod/i.test(navigator.userAgent)
    return isMobile ? "mobile" : "desktop"
}

function mobileVersion() {

}

function desktopVersion() {

}