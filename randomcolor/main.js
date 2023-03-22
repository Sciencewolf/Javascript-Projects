let count_for_pInfo = 0;

const onLoad = () => { 
    loadOneColor()
    reload()

    const curr_year = new Date()
    const dev = document.getElementById("dev")
    dev.innerHTML = `Created By: Aron Marton <a href="https://github.com/Sciencewolf">GitHub</a> ${curr_year.getFullYear()}`

	const pInfo_id = document.getElementById('pInfo')
	document.addEventListener('keyup', (event) => {
		if(event.code === "Space") { 
			reloadOnSpacebar()
			pInfo_id.style.display = "none" 
		}
	})
}

/* Choose Multiple Color */

function createHTMLElementMultiple() {
    const wrapper = document.querySelector('.wrapper')
    const [divLeft, divMiddleLeft, divMiddleRight, divRight] = 
    Array.from({ length: 4 }, () => document.createElement('div'))
    const [pLeft, pMiddleLeft, pMiddleRight, pRight] = 
    Array.from({ length: 4 }, () => document.createElement('p'));

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

    pLeft.innerHTML = hex_1.toUpperCase()
    pMiddleLeft.innerHTML = hex_2.toUpperCase()
    pMiddleRight.innerHTML = hex_3.toUpperCase()
    pRight.innerHTML = hex_4.toUpperCase()
}

function copyColorCodeMultiple() {
    const pLeft = document.querySelector("#pLeft");
    const pMiddleLeft = document.querySelector("#pMiddleLeft");
    const pMiddleRight = document.querySelector("#pMiddleRight");
    const pRight = document.querySelector("#pRight");

    copyToClipboard(pLeft);
    copyToClipboard(pMiddleLeft);
    copyToClipboard(pMiddleRight);
    copyToClipboard(pRight);
}

function remove_loadMultipleColor() {
	const wrapper = document.querySelector('.wrapper')
    const divLeft = document.querySelector(".left");
    const divMiddleLeft = document.querySelector(".middleLeft");
    const divMiddleRight = document.querySelector(".middleRight");
    const divRight = document.querySelector(".right");

	wrapper.removeChild(divLeft)
	wrapper.removeChild(divMiddleLeft)
	wrapper.removeChild(divMiddleRight)
	wrapper.removeChild(divRight)
}

function loadMultipleColor() {
    createHTMLElementMultiple()
    pasteColorIntoHTMLElementMultiple()
    settings()
}

/* Choose One Color*/

function createHTMLElementOne() {
    const wrapper = document.querySelector('.wrapper')

    const divMain = document.createElement('div')
    const pText = document.createElement('p')
	const pInfo = document.createElement('p')

    divMain.className = "div-main"
    pText.id = "pText"
	pInfo.id = "pInfo"
	pInfo.innerHTML = "Press [SPACEBAR] to change color"

    divMain.appendChild(pText)
	divMain.appendChild(pInfo)
	count_for_pInfo++;
	if(count_for_pInfo > 1) {
		clearTimeout(del_divMain)
		divMain.removeChild(pInfo)
	}
    wrapper.appendChild(divMain)

	var del_divMain = setTimeout(() => {
		if(divMain.childNodes.length === 2) divMain.removeChild(pInfo)
	}, 5900)
}

function pasteColorIntoHTMLElementOne() {
    const divMain = document.querySelector('.div-main')
    const pText = document.getElementById('pText')

    const [r, g, b] = randomizeColor()
    const hex = rgb_to_hex(r, g, b)
    const RGB = `${r}, ${g}, ${b}`

    divMain.style.backgroundColor = `rgb(${RGB})`
    pText.innerHTML = hex.toUpperCase()

	changeHeaderColor(r, g, b)
}

function remove_loadOneColor() {
	const wrapper = document.querySelector('.wrapper')
    const divMain = document.querySelector(".div-main");

    wrapper.removeChild(divMain)
}

function copyColorCodeOne() {
  const pOne = document.querySelector("#pText");
  copyToClipboard(pOne);
}

function loadOneColor() {
    createHTMLElementOne()
    pasteColorIntoHTMLElementOne()
    settings()
}

/* END */

function randomizeColor() {
  const color = {
    r: Math.floor(Math.random() * 256), // 0-255
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  };
  return [color.r, color.g, color.b];
}

function rgb_to_hex(r, g, b) {
  const hex =
    "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return hex;
}

function copyToClipboard(p_tag) {
  p_tag.addEventListener("click", () => {
    navigator.clipboard
      .writeText(p_tag.innerHTML)
      .then(() => console.log("OK COPY"))
      .catch((err) => console.log("ERROR ON COPY", err));
  });
}

function settings() {
  const checkbox_for_multiple_color_picking = document.getElementById(
    "checkbox-pick-multiple-color"
  );

  if (checkbox_for_multiple_color_picking.checked) {
    pasteColorIntoHTMLElementMultiple();
    copyColorCodeMultiple();
  } else {
    pasteColorIntoHTMLElementOne();
    copyColorCodeOne();
  }
}

function handleCheckbox(elem) {
	if (elem.checked) {
		loadMultipleColor();
		remove_loadOneColor();
	} else if (!elem.checked) {
		loadOneColor();
		remove_loadMultipleColor();
	}
	elem.blur()
}

function reload() {
    const button_reload = document.getElementById('btn-reload')
    const checkbox_for_multiple_color_picking = document.getElementById('checkbox-pick-multiple-color')

    button_reload.addEventListener('click', () => {
        if(checkbox_for_multiple_color_picking.checked) { 
            pasteColorIntoHTMLElementMultiple()
        }
        else {
            pasteColorIntoHTMLElementOne()
        }
    })
}

function reloadOnSpacebar() {
	const checkbox_for_multiple_color_picking = document.getElementById('checkbox-pick-multiple-color')

	if(checkbox_for_multiple_color_picking.checked) {
		pasteColorIntoHTMLElementMultiple()
	}
	else {
		pasteColorIntoHTMLElementOne()
	}
}

function changeHeaderColor(r, g, b) {
	const header = document.querySelector(".header h3")
	let _isColorDarkOrLight = isColorDarkOrLight(r, g, b)

	if (_isColorDarkOrLight === "dark") header.style.color = "white"
	else header.style.color = "Black"
}

function isColorDarkOrLight(r, g, b) {
	const hsp = Math.sqrt(
		0.299 * (r * r) +
		0.587 * (g * g) +
		0.114 * (b * b) )

    return hsp > 127.5 ? "light" : "dark"
}