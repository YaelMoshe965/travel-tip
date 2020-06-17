console.log('Main!');

import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'


locService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {
    mapService.initMap()
        .then(() => {

            locService.getPosition()
                .then(pos => {
                    mapService.getMyLocation(pos.coords.latitude, pos.coords.longitude);
                    console.log('User position is:', pos.coords);
                })
                .catch(err => {
                    console.log('err!!!', err);
                })
        })
        .catch(console.log('INIT MAP ERROR'));

        renderLocationName()
        renderWeather()
}

document.querySelector('.btn').addEventListener('click', (ev) => {
    console.log('Aha!', ev.target);
    locService.getPosition()
        .then(pos => {
            mapService.getMyLocation(pos.coords.latitude, pos.coords.longitude);
        })
})

function renderLocationName() {
    locService.getPosition()
        .then(pos => {
            mapService.getLocationName(pos.coords.latitude, pos.coords.longitude)
                .then(res => { document.querySelector('p').innerHTML = '<span>Location:</span> ' + res })
        })
}

function renderWeather() {
    locService.getPosition()
        .then(pos => {
            mapService.getWeatherLocation(pos.coords.latitude, pos.coords.longitude)
                .then(res => { document.querySelector('#weather').innerText = `Weather Today: ${res} c`})
        })
}
