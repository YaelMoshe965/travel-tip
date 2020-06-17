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
            // mapService.addMarker();
        })
        .catch(console.log('INIT MAP ERROR'));
}

document.querySelector('.btn').addEventListener('click', (ev) => {
    console.log('Aha!', ev.target);
    locService.getPosition() 
    .then(pos => {
        mapService.getMyLocation(pos.coords.latitude, pos.coords.longitude);
    })    
})

renderLocationName()

function renderLocationName(){
mapService.getLocationName()
.then(res =>{document.querySelector('p').innerText = 'Location: ' + res})
}
