function changeBGColor() {
    var switch_label = document.getElementById('switch');
    var checkbox = document.getElementById('checkbox');
    var body = document.querySelector('body');
    console.log('hfjdks');
    checkbox.addEventListener('input', function () {
        console.log('clicked');
        if (checkbox.checked) {
            body.style.backgroundColor = 'white';
            switch_label.innerHTML = 'ENABLED';
        }
        else if (!checkbox.checked) {
            body.style.backgroundColor = 'darkgrey';
            switch_label.innerHTML = 'DISABLED';
        }
    });
}
