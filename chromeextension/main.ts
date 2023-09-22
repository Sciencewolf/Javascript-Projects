function changeBGColor() {
    const switch_label = document.getElementById('switch') as HTMLLabelElement | null
    const checkbox = document.getElementById('checkbox') as HTMLInputElement | null
    const body = document.querySelector('body') as HTMLBodyElement | null

    checkbox.addEventListener('input', (): void => {
        if(checkbox.checked) {
            body.style.backgroundColor = 'white'
            switch_label.innerHTML = 'ENABLED'
        }
        else if(!checkbox.checked) {
            body.style.backgroundColor = 'darkgrey'
            switch_label.innerHTML = 'DISABLED'
        }
    })
}