let count_for_pInfo = 0;

const onLoad = () => { 
    if(detectPlatform() === 'mobile') mobileVersion()
    else if(detectPlatform() === 'desktop') desktopVersion()
}

function detectPlatform() {
    const isMobile = /Android|iPhone/i.test(navigator.userAgent)
    return isMobile ? "mobile" : "desktop"
}

function mobileVersion() {
    loadOneColor()
    aboutDev()

    const checkbox = document.querySelector('footer .checkbox')
    const about_dev = document.getElementById('dev')
    const gen_new_color_button = document.querySelector('.btn')
    const p_info = document.getElementById('pInfo')
    const div_main = document.querySelector('.wrapper div.div-one')

    checkbox.style.display = "none"
    about_dev.style.fontSize = "15px"
    gen_new_color_button.style.display = "none"
    p_info.innerText = "Tap Here"
    setTimeout(() => {
        p_info.style.display = "none"
    }, 2900)

    div_main.addEventListener('touchend', () => {
        pasteColorIntoHTMLElementOne()
        p_info.style.display = "none"
    })
}

function desktopVersion() {
    loadOneColor()
    reload()
    aboutDev()
    alertOnCopy_desktopplatform()
    const pInfo_id = document.getElementById('pInfo')

    document.addEventListener('keyup', (event) => {
        if (event.code === "Space") {
            reloadOnSpacebar()
            pInfo_id.style.display = "none"
        }
    })
}

/* Choose Multiple Color */

function createHTMLElementMultiple() {
    const wrapper = document.querySelector('.wrapper')
    const wrapper_p = document.querySelector('.wrapper p#pText')
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

    wrapper.removeChild(wrapper_p)

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

    const header = document.querySelector('.header h3')
    header.style.color = 'black'

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
    checkbox_for_multcolpick()
}

/* Choose One Color*/

function createHTMLElementOne() {
    const wrapper = document.querySelector('.wrapper')

    const divMain = document.createElement('div')
    const pText = document.createElement('p')
	const pInfo = document.createElement('p')

    divMain.className = "div-one"
    pText.id = "pText"
	pInfo.id = "pInfo"
	pInfo.innerHTML = "Press [SPACEBAR] to change color"

	divMain.appendChild(pInfo)
	count_for_pInfo++;
	if(count_for_pInfo > 1) {
		clearTimeout(del_divMain)
		divMain.removeChild(pInfo)
	}
    wrapper.appendChild(divMain)
    wrapper.appendChild(pText)

	var del_divMain = setTimeout(() => {
		if(divMain.childNodes.length === 1) divMain.removeChild(pInfo)
	}, 5900)
}

function pasteColorIntoHTMLElementOne() {
    const divMain = document.querySelector('.div-one')
    const pText = document.getElementById('pText')

    const [r, g, b] = randomizeColor()
    const hex = rgb_to_hex(r, g, b)
    const RGB = `${r}, ${g}, ${b}`

    divMain.style.backgroundColor = `rgb(${RGB})`
    pText.innerHTML = hex.toUpperCase()

	changeTextColor(r, g, b)
    changeThemeColorForWebbrowsers(rgb_to_hex(r, g, b))
}

function remove_loadOneColor() {
	const wrapper = document.querySelector('.wrapper')
    const divMain = document.querySelector(".div-one");

    wrapper.removeChild(divMain)
}

function copyColorCodeOne() {
  const pOne = document.querySelector("#pText");
  copyToClipboard(pOne);
}

function loadOneColor() {
    createHTMLElementOne()
    pasteColorIntoHTMLElementOne()
    checkbox_for_multcolpick()
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

function checkbox_for_multcolpick() {
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

function changeTextColor(r, g, b) {
	const header = document.querySelector(".header h3")
    const hint_pInfo = document.getElementById('pInfo')
    const p_text = document.getElementById('pText')

	let _isColorDarkOrLight = isColorDarkOrLight(r, g, b)

	if (_isColorDarkOrLight === "dark") {
        p_text.style.backgroundColor = "white"
        p_text.style.color = "black"
        header.style.color = "white"
        if (typeof (hint_pInfo) != 'undefined' && hint_pInfo != null) hint_pInfo.style.color = "white"
    }
	else {
        p_text.style.backgroundColor = "black"
        p_text.style.color = "white"
        header.style.color = "black"
        if (typeof (hint_pInfo) != 'undefined' && hint_pInfo != null)hint_pInfo.style.color = "black"
    }
}

function isColorDarkOrLight(r, g, b) {
	const hsp = Math.sqrt(
		0.299 * (r * r) +
		0.587 * (g * g) +
		0.114 * (b * b) )

    return hsp > 127.5 ? "light" : "dark"
}

function aboutDev() {
    const curr_year = new Date()
    const dev = document.getElementById("dev")
    dev.innerHTML = `Created By: Aron Marton <a href="https://github.com/Sciencewolf">[GitHub]</a> ${curr_year.getFullYear()}`
}

function changeThemeColorForWebbrowsers(hex) {
    const meta = document.getElementById('meta-themecolor')
    meta.content = hex
}

function alertOnCopy_desktopplatform() {
    const alert_on_copy = document.createElement('span')
    const img_on_copy = document.createElement('img')
    const text_on_copy = document.createElement('p')

    const body = document.querySelector('body')
    const p_text = document.getElementById('pText')

    alert_on_copy.className = "alert-copy-desktop"
    img_on_copy.src = "https://img.icons8.com/color/48/null/ok--v1.png"
    text_on_copy.innerText = "Copied!"

    alert_on_copy.appendChild(img_on_copy)
    alert_on_copy.appendChild(text_on_copy)

    p_text.addEventListener('click', () => {
        body.appendChild(alert_on_copy)
        setTimeout(() => {
            body.removeChild(alert_on_copy)
        }, 2500);
    })
}

// Maintenance for glitch 
function showMaintenanceWindow() {
    const html = document.querySelector('html')
    const body = document.querySelector('body')

    const body_new = document.createElement('body')
    const div = document.createElement('div')
    const img = document.createElement('img')
    const span_new = document.createElement('span')

    body_new.className = "body-maintenance"
    div.innerHTML = "Maintenance"
    div.className = "div-maintenance"
    img.src = "https://img.icons8.com/ios/100/null/online-maintenance-portal.png"
    img.id = "img-maintenance"
    span_new.className = "span-return_later"
    span_new.innerHTML = 'Come Back Later'

    body.innerHTML = ""
    body.style.width = 0
    body.style.height = 0
    
    body_new.appendChild(div)
    body_new.appendChild(img)
    body_new.appendChild(span_new)
    html.appendChild(body_new)
}