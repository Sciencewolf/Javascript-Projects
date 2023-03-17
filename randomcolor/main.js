const onLoad = () => {
    createHTMLElement()
    pasteColorIntoHTMLElement()
    settings()
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

function pasteColorIntoHTMLElement() {
    const divLeft = document.querySelector('.left')
    const divMiddleLeft = document.querySelector('.middleLeft')
    const divMiddleRight = document.querySelector('.middleRight')
    const divRight = document.querySelector('.right')

    const pLeft = document.querySelector('#pLeft')
    const pMiddleLeft = document.querySelector('#pMiddleLeft')
    const pMiddleRight = document.querySelector('#pMiddleRight')
    const pRight = document.querySelector('#pRight')

    const [r1, g1, b1] = randomizeColor()
    const [r2, g2, b2] = randomizeColor()
    const [r3, g3, b3] = randomizeColor()
    const [r4, g4, b4] = randomizeColor()

    const RGB_1 = `${r1}, ${g1}, ${b1}`
    const RGB_2 = `${r2}, ${g2}, ${b2}`
    const RGB_3 = `${r3}, ${g3}, ${b3}`
    const RGB_4 = `${r4}, ${g4}, ${b4}`

    divLeft.style.backgroundColor = `rgb(${r1}, ${g1}, ${b1})`
    divMiddleLeft.style.backgroundColor = `rgb(${r2}, ${g2}, ${b2})`
    divMiddleRight.style.backgroundColor = `rgb(${r3}, ${g3}, ${b3})`
    divRight.style.backgroundColor = `rgb(${r4}, ${g4}, ${b4})`

    pLeft.innerHTML = RGB_1
    pMiddleLeft.innerHTML = RGB_2
    pMiddleRight.innerHTML = RGB_3
    pRight.innerHTML = RGB_4
}

function copyColorCode() {
    const pLeft = document.querySelector("#pLeft");
    const pMiddleLeft = document.querySelector("#pMiddleLeft");
    const pMiddleRight = document.querySelector("#pMiddleRight");
    const pRight = document.querySelector("#pRight");

    pLeft.addEventListener("click", () => {
      navigator.clipboard
        .writeText(pLeft.innerHTML)
        .then(() => console.log("OK COPY"))
        .catch((err) => {
          console.log(err);
        });
    });
    pMiddleLeft.addEventListener("click", () => {
      navigator.clipboard
        .writeText(pMiddleLeft.innerHTML)
        .then(() => console.log("OK COPY"))
        .catch((err) => {
          console.log(err);
        });
    });
    pMiddleRight.addEventListener("click", () => {
      navigator.clipboard
        .writeText(pMiddleRight.innerHTML)
        .then(() => console.log("OK COPY"))
        .catch((err) => {
          console.log(err);
        });
    });
    pRight.addEventListener("click", () => {
      navigator.clipboard
        .writeText(pRight.innerHTML)
        .then(() => console.log("OK COPY"))
        .catch((err) => {
          console.log(err);
        });
    });
}

function settings() {
    const settings = document.querySelector('.settings')

    const button_tag = document.createElement('button')
    button_tag.id = "btn-reload"
    button_tag.innerHTML = "Pick New Color"

    button_tag.addEventListener('click', () => {
        pasteColorIntoHTMLElement()
    })
    copyColorCode()
    settings.appendChild(button_tag)
}