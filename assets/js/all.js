"use strict";

//map desktop
var map_desktop = L.map('map_desktop').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //your.mapbox.access.token

}).addTo(map_desktop); //location pin

var marker = L.marker([51.5, -0.09]).addTo(map_desktop); //circle

var circle = L.circle([51.508, -0.11], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 500
}).addTo(map_desktop); //polygon 多邊形

var polygon = L.polygon([[51.509, -0.08], [51.503, -0.06], [51.51, -0.047]]).addTo(map_desktop); //彈出小視窗

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon."); //點擊顯示 alert 座標

function onMapDesktopClick(e) {
  alert("You clicked the map at " + e.latlng);
}

map_desktop.on('click', onMapDesktopClick); //點擊顯示 popup 座標 
// var popup = L.popup();
// function onMapDesktopClick2(e) {
//   popup
//     .setLatLng(e.latlng)
//     .setContent("You clicked the map at " + e.latlng.toString())
//     .openOn(map_desktop);
// }
// map_desktop.on('click', onMapDesktopClick2);
//----------------------------------------------------------------
//map mobile

var map_mobile = L.map('map_mobile').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //your.mapbox.access.token

}).addTo(map_mobile); //location pin

var marker = L.marker([51.5, -0.09]).addTo(map_mobile); //circle

var circle = L.circle([51.508, -0.11], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 500
}).addTo(map_mobile); //polygon 多邊形

var polygon = L.polygon([[51.509, -0.08], [51.503, -0.06], [51.51, -0.047]]).addTo(map_mobile); //彈出小視窗

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon."); //點擊顯示 alert 座標

function onMapMobileClick(e) {
  alert("You clicked the map at " + e.latlng);
}

map_mobile.on('click', onMapMobileClick); //點擊顯示 popup 座標 
// var popup = L.popup();
// function onMapMobileClick2(e) {
//   popup
//     .setLatLng(e.latlng)
//     .setContent("You clicked the map at " + e.latlng.toString())
//     .openOn(map_mobile);
// }
// map_mobile.on('click', onMapMobileClick2);
//# sourceMappingURL=all.js.map
