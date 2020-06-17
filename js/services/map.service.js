
export const mapService = {
    initMap,
    addMarker,
    panTo,
    getLocationName,
    getMyLocation
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


function getLocationName(){
const API_KEY = 'AIzaSyCVC9-UAU0nHyup7lFg9fcTBxZGV9J0x1g';
fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=${API_KEY}`)
    .then((res) => { return res.json(); })
    .catch((err) => { console.log('Had issues1:', err)})
    .then((res) => { console.log('res:', res) })
}

