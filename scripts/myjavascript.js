
//create map
const map = L.map('mapa', {
    center: [10, -84],
    zoom: 10
});


//set center map with geolocation of the device
map.locate({setView: true, maxZoom: 15});

//geolocation
function onLocationFound(evento){
    const radius = evento.accuracy;

    L.marker(evento.latlng).addTo(map)
        .bindPopup(`Usted se encuentra en un radio de ${radius} metros`).openPopup();

    L.circle(evento.latlng, radius).addTo(map);
}
map.on('locationfound', onLocationFound);

//in case user dont active location
function onLocationError(e){
    alert("Por favor acepte la petición de localización para facilitarle las cosas (debe recargar la página)");
}
map.on('locationerror', onLocationError);

//base layer
const capaOSM = L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const satelliteOSM = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");

//LAYERS
const capaAreasPotencialInundacion = L.tileLayer.wms('http://mapas.cne.go.cr/servicios/cne/wms', {
    layers: 'inundaciones',
    format: 'image/png',
    //opacity: 0.5,
    transparent: true
});

const capaSINAC = L.tileLayer.wms('http://geos1pne.sirefor.go.cr/wms?', {
    layers: 'areas_silvestres_protegidas',
    format: 'image/png',
    transparent: true
});


const aforos = L.tileLayer.wms('http://mapas.da.go.cr/geopc.php?request=GetCapabilities&version=1.1.1&',{
    layers: 'Aguas:DA_AFOROS_1',
    format: 'image/png',
    transparent: true
});

const concesiones = L.tileLayer.wms("http://mapas.da.go.cr/geopc.php?request=GetCapabilities&version=1.1.1&",{
    layers: 'Aguas:DA_Concesiones',
    format: 'image/png',
    transparent: true
});
//END LAYERS


//choices for base layer
const baseMaps = {
    "Normal": capaOSM,
    "Satelite": satelliteOSM
};

//layers to switch
const overlayMaps = {
    "Aforos": aforos,
    "Conseciones": concesiones,
    "Areas Silvestres Protegidas": capaSINAC,
    "Potencial Inundación": capaAreasPotencialInundacion
};

//add the base layer and switch layers
L.control.layers(baseMaps, overlayMaps).addTo(map);


//add geocoder
L.Control.geocoder().addTo(map);

//add ruler
L.control.ruler().addTo(map);
