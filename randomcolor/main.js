const onLoad = () => {
    createHTMLElement()
    pasteColorIntoHTMLElement()
}

function createHTMLElement() {
    const wrapper = document.querySelector('.wrapper')
    const divLeft = document.createElement('div')
    const divMiddleLeft = document.createElement('div')
    const divMiddleRight = document.createElement('div')
    const divRight = document.createElement('div')

    const pLeft = document.createElement('p')
    const pMiddleLeft = document.createElement('p')
    const pMiddleRight = document.createElement('p')
    const pRight = document.createElement('p')

    // div tags
    divLeft.className = "left"
    divLeft.style.width = "40em"
    divLeft.style.height = "20em"

    divMiddleLeft.className = "middleLeft"
    divMiddleLeft.style.width = '40em'
    divMiddleLeft.style.height = '20em'

    divMiddleRight.className = "middleRight"
    divMiddleRight.style.width = '40em'
    divMiddleRight.style.height = '20em'

    divRight.className = "right"
    divRight.style.width = '40em'
    divRight.style.height= '20em'

    // p tags
    pLeft.id = "pLeft"
    pLeft.innerHTML = 'Hi'
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

function pasteColorIntoHTMLElement() {
    const divLeft = document.querySelector('.left')
    const divMiddleLeft = document.querySelector('.middleLeft')
    const divMiddleRight = document.querySelector('.middleRight')
    const divRight = document.querySelector('.right')

    const [r1, g1, b1] = randomizeColor()
    const [r2, g2, b2] = randomizeColor()
    const [r3, g3, b3] = randomizeColor()
    const [r4, g4, b4] = randomizeColor()

    divLeft.style.backgroundColor = `rgb(${r1}, ${g1}, ${b1})`
    divMiddleLeft.style.backgroundColor = `rgb(${r2}, ${g2}, ${b2})`
    divMiddleRight.style.backgroundColor = `rgb(${r3}, ${g3}, ${b3})`
    divRight.style.backgroundColor = `rgb(${r4}, ${g4}, ${b4})`
}