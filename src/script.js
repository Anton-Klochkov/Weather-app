let tempBlock = document.querySelector('#temp')
let windBlock = document.querySelector('#wind')
let cityBlock = document.querySelector('#city')
let update_date = document.querySelector('#update-date')
let local_date = document.querySelector('#local-date')
let searchInp = document.querySelector('.search')
let city = 'Voronezh'


setInterval(() => {
    let date = new Date;
    local_date.textContent = `Local time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}, 1000)

document.addEventListener('keydown', e => {
    if(e.key === 'Enter') {
        let value = searchInp.value;
        if(!value) return false;
        city = value;
        init()
        searchInp.value = ''
    }
})



function init() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4d5da33ce1fab598a374d90406b02a76`)
        .then(resp => { return resp.json() })
        .then(data => {
            tempBlock.textContent = `t = ${temperature()}°`
            cityBlock.textContent = `City: ${data.name}`
            windBlock.textContent = `Wind speed ${wind()} m/s`

            function temperature() {
                let getTemp = data.main.temp
                let tempC = Math.floor(getTemp) - 273
                return tempC
            }
            function wind(){
                let getWind = data.wind.speed
                let speed = getWind
                return speed
            }
            
            let date = new Date;

            update_date.textContent = `Update time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

            console.log('replay')

        })
        .catch(() => {
            alert('This city not found')
            city = 'Voronezh';
            init()
            searchInp.value = ''

        })
}

init()

setInterval(() => {
    init()
}, 10000)//обновление информации 10с


