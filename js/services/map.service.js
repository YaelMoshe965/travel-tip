
import { locService } from './loc.service.js'


export const mapService = {
    initMap,
    addMarker,
    panTo,
    getLocationName,
    getMyLocation,
    getWeatherLocation
}


var map;


function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            map = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', map);
        })
}

function getMyLocation(lat, lng) {
    var pos = {
        lat,
        lng
    }
    panTo(pos.lat, pos.lng)
    addMarker(pos);
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    map.panTo(laLatLng);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyCVC9-UAU0nHyup7lFg9fcTBxZGV9J0x1g';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}


function getLocationName() {
    // var lat =  locService.getPosition().then(pos => { return pos.coords.latitude})
    // var long = locService.getPosition().then(pos => { return pos.coords.longitude})

    locService.getPosition()
        .then(pos => { 
           console.log(pos.coords.latitude);
           console.log(pos.coords.longitude);
        })


    const API_KEY = 'AIzaSyCVC9-UAU0nHyup7lFg9fcTBxZGV9J0x1g';
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${API_KEY}`)
        .then((res) => { return res.json(); })
        .catch((err) => { console.log('Had issues1:', err) })
        .then((res) => { return res.results[0].formatted_address })
}


const W_KEY = 'fe013b1934aedb8d8f18b3e7958a4db3';
function getWeatherLocation() {
    return new Promise(resolve => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=32.0749831&lon=34.9120554&APPID=${W_KEY}`)
            .then(result => {
                const weather = result.data
                console.log('result', result);

                resolve(weather);
            })
})
}
