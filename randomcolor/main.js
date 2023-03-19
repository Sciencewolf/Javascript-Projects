const onLoad = () => {
    const checkbox_for_multiple_color_picking = document.getElementById('checkbox-pick-multiple-color')
    if(checkbox_for_multiple_color_picking.checked) loadMultipleColor()
    else loadOneColor()

    settings()
}

function createHTMLElementMultiple() {
    const wrapper = document.querySelector('.wrapper')

    const [divLeft, divMiddleLeft, divMiddleRight, divRight] = 
    Array.from({ length: 4 }, () => document.createElement('div'))

    const [pLeft, pMiddleLeft, pMiddleRight, pRight] = 
    Array.from({ length: 8 }, () => document.createElement('p'));

    // div tags
    divLeft.className = "left"
    divMiddleLeft.className = "middleLeft"
    divMiddleRight.className = "middleRight"
    divRight.className = "right"

    // p tags
    pLeft.id = "pLeft"
    pMiddleLeft.id = "pMiddleLeft"
    pMiddleRight.id = "pMiddleRight"
    pRight.id = "pRight"

    divLeft.appendChild(pLeft)
    divMiddleLeft.appendChild(pMiddleLeft)
    divMiddleRight.appendChild(pMiddleRight)
    divRight.appendChild(pRight)

    wrapper.appendChild(divLeft)
    wrapper.appendChild(divMiddleLeft)
    wrapper.appendChild(divMiddleRight)
    wrapper.appendChild(divRight)
}

function randomizeColor() {
    const color = {
        r: Math.floor(Math.random() * 256), // 0-255
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256),
    }
    return [color.r, color.g, color.b]
}

function rgb_to_hex(r, g, b) {
    const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
    return hex
}

function pasteColorIntoHTMLElementMultiple() {
    const divLeft = document.querySelector('.left')
    const divMiddleLeft = document.querySelector('.middleLeft')
    const divMiddleRight = document.querySelector('.middleRight')
    const divRight = document.querySelector('.right')

    const pLeft = document.querySelector('#pLeft')
    const pMiddleLeft = document.querySelector('#pMiddleLeft')
    const pMiddleRight = document.querySelector('#pMiddleRight')
    const pRight = document.querySelector('#pRight')

    const [r1, g1, b1] = randomizeColor()
    const hex_1 = rgb_to_hex(r1, g1, b1)

    const [r2, g2, b2] = randomizeColor()
    const hex_2 = rgb_to_hex(r2, g2, b2)

    const [r3, g3, b3] = randomizeColor()
    const hex_3 = rgb_to_hex(r3, g3, b3)

    const [r4, g4, b4] = randomizeColor()
    const hex_4 = rgb_to_hex(r4, g4, b4)

    const RGB_1 = `${r1}, ${g1}, ${b1}`
    const RGB_2 = `${r2}, ${g2}, ${b2}`
    const RGB_3 = `${r3}, ${g3}, ${b3}`
    const RGB_4 = `${r4}, ${g4}, ${b4}`

    divLeft.style.backgroundColor = `rgb(${RGB_1})`
    divMiddleLeft.style.backgroundColor = `rgb(${RGB_2})`
    divMiddleRight.style.backgroundColor = `rgb(${RGB_3})`
    divRight.style.backgroundColor = `rgb(${RGB_4})`

    pLeft.innerHTML = hex_1
    pMiddleLeft.innerHTML = hex_2
    pMiddleRight.innerHTML = hex_3
    pRight.innerHTML = hex_4
}

function copyColorCode() {
    const pLeft = document.querySelector("#pLeft");
    const pMiddleLeft = document.querySelector("#pMiddleLeft");
    const pMiddleRight = document.querySelector("#pMiddleRight");
    const pRight = document.querySelector("#pRight");

    copyToClipboard(pLeft)
    copyToClipboard(pMiddleLeft)
    copyToClipboard(pMiddleRight)
    copyToClipboard(pRight)
}

function copyToClipboard(p_tag) {
    p_tag.addEventListener('click', () => {
      navigator.clipboard.writeText(p_tag.innerHTML)
      .then(() => console.log("OK COPY"))
      .catch(err => console.log("ERROR ON COPY", err))
    })
}

function settings() {
    const settings = document.querySelector('.settings')

    const button_tag = document.createElement('button')
    button_tag.id = "btn-reload"
    button_tag.innerHTML = "Pick New Color"

    button_tag.addEventListener('click', () => pasteColorIntoHTMLElementMultiple() )

    copyColorCode()
    settings.appendChild(button_tag)
}

function loadMultipleColor() {
    createHTMLElementMultiple()
    pasteColorIntoHTMLElementMultiple()
}

function createHTMLElementOne() {
    const wrapper = document.querySelector('.wrapper')

    const divMain = document.createElement('div')
    const pText = document.createElement('p')

    divMain.className = "div-main"
    pText.id = "pText"

    divMain.appendChild(pText)
    wrapper.appendChild(divMain)
}

function pasteColorIntoHTMLElementOne() {
    const divMain = document.querySelector('.div-main')
    const pText = document.getElementById('pText')

    const [r, g, b] = randomizeColor()
    const hex = rgb_to_hex(r, g, b)
    const RGB = `${r}, ${g}, ${b}`

    divMain.style.backgroundColor = `rgb(${RGB})`
    pText.innerHTML = hex
}


function loadOneColor() {
    createHTMLElementOne()
    pasteColorIntoHTMLElementOne()
    settings()
}