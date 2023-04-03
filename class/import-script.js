class Import {
    footer() {
        const footer = document.querySelector('footer')
        const new_span_tweet = document.createElement('span')
        const a = document.createElement('a')
        const img = document.createElement('img')
        const date = new Date()

        let tweet_text = footer.innerHTML.split(',')
        footer.innerHTML = ""

        a.id = 'tweet-link'
        a.href = `https://twitter.com/intent/tweet?text=${tweet_text[0].trim()}%20by%20@aronmarton_%20${tweet_text[1]}`
        a.target = "_blank"

        img.src = "https://img.icons8.com/tiny-color/16/null/twitter.png"
        a.appendChild(img)

        new_span_tweet.id = "tweet"
        new_span_tweet.className = 'tweet'

        a.innerHTML += "Tweet"
        new_span_tweet.appendChild(a)

        let dev_span = `<span class='dev' id='dev'>Created By: Aron Marton \
        [<a href="https://github.com/Sciencewolf" target="_blank">GitHub</a>] ${date.getFullYear()}</span>`

        footer.appendChild(new_span_tweet)
        footer.innerHTML += dev_span
    }

    // Maintenance for glitch 
    showMaintenanceWindow() {
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
}

const _Import = new Import()
console.log("Import success from =>", "https://raw.githack.com/Sciencewolf/Javascript-Projects/master/class/import-script.js")

_Import.footer()

const body = document.querySelector('body#maintenance-glitch')
if(body !== null) {
    console.log('Maintenance in on')
    _Import.showMaintenanceWindow()
}else {
    console.log("Maintenance if off")
}