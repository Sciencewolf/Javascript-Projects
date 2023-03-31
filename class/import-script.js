class Import {
    footer() {
        const dev = document.querySelector('.dev')
        const date = new Date()

        dev.innerHTML = `Created By: Aron Marton \
        [<a href="https://github.com/Sciencewolf" target="_blank">GitHub</a>] ${date.getFullYear()}`
    }
}

const _Import = new Import()

_Import.footer()