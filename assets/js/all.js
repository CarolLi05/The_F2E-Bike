"use strict";

//main map
var main_map = L.map('main_map').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //your.mapbox.access.token

}).addTo(main_map); //使用 navigator web api 獲取當下位置（經緯度）
// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(
//     function (position) {
//       const longitude = position.coords.longitude;  // 經度
//       const latitude = position.coords.latitude;  // 緯度
//       console.log(longitude);
//       console.log(latitude);
//       // 重新設定 view 的位置
//       main_map.setView([latitude, longitude], 13);
//       // 將經緯度當作參數傳給 getData 執行
//       // getStationData(longitude, latitude);
//     },
//     // 錯誤訊息
//     function (e) {
//       const msg = e.code;
//       const dd = e.message;
//       console.error(msg);
//       console.error(dd);
//     }
//   )
// }
// // 串接附近的自行車租借站位資料
// let data = [];
// function getStationData(longitude, latitude) {
//   axios({
//     method: 'get',
//     // url: 'https://ptx.transportdata.tw/MOTC/v2/Bike/Station/Kaohsiung',
//     url: `https://ptx.transportdata.tw/MOTC/v2/Bike/Station/NearBy?$spatialFilter=nearby(${latitude},${longitude},500)`,
//     headers: GetAuthorizationHeader()
//   })
//     .then((response) => {
//       console.log('租借站位資料',response)
//       data = response.data;
//       getAvailableData(longitude, latitude);
//     })
//     .catch((error) => console.log('error', error))
// }
// // 串接附近的即時車位資料
// let filterData = [];
// function getAvailableData(longitude, latitude) {
//   axios({
//     method: 'get',
//     // url: 'https://ptx.transportdata.tw/MOTC/v2/Bike/Availability/Kaohsiung',
//     url: `https://ptx.transportdata.tw/MOTC/v2/Bike/Availability/NearBy?$spatialFilter=nearby(${latitude},${longitude},500)`,
//     headers: GetAuthorizationHeader()
//   })
//     .then((response) => {
//       console.log('車位資料',response)
//       const availableData = response.data;
//       // 比對
//       availableData.forEach((availableItem) => {
//         data.forEach((stationItem) => {
//           if (availableItem.StationUID === stationItem.StationUID) {
//             availableItem.StationName = stationItem.StationName
//             availableItem.StationAddress = stationItem.StationAddress
//             availableItem.StationPosition = stationItem.StationPosition
//             filterData.push(availableItem)
//           }
//         })
//       })
//       console.log('filterData', filterData)
//       setMarker();
//     })
//     .catch((error) => console.log('error', error))
// }
// // API 驗證用
// function GetAuthorizationHeader() {
//   var AppID = 'f39a6c1c7f8e472d900fbd5e1b7d3154';
//   var AppKey = 'd6Yw7er2vMOTmuvf7wrmpwf9Chs';
//   var GMTString = new Date().toGMTString();
//   var ShaObj = new jsSHA('SHA-1', 'TEXT');
//   ShaObj.setHMACKey(AppKey, 'TEXT');
//   ShaObj.update('x-date: ' + GMTString);
//   var HMAC = ShaObj.getHMAC('B64');
//   var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
//   return { 'Authorization': Authorization, 'X-Date': GMTString /*,'Accept-Encoding': 'gzip'*/ }; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
// }
// // 標記 icon
// function setMarker() {
//   filterData.forEach((item) => {
//     // console.log(item.StationPosition.PositionLon, item.StationPosition.PositionLat)
//     L.marker([item.StationPosition.PositionLat, item.StationPosition.PositionLon]).addTo(main_map).bindPopup(
//       `<div class="card">
//     <div class="card-body">
//       <h5 class="card-title">${item.StationName.Zh_tw}</h5>
//       <h6 class="card-subtitle mb-2 text-muted">${item.StationAddress.Zh_tw}</h6>
//       <p class="card-text mb-0">可租借車數：${item.AvailableRentBikes}</p>
//       <p class="card-text mt-0">可歸還車數：${item.AvailableReturnBikes}</p>
//     </div>
//   </div>`
//     )
//   })
// }
// // 選取自行車的路線
// const bikeRoute = document.querySelector('#bikeRoute');
// function getRoutesData() {
//   axios({
//     method: 'get',
//     url: 'https://ptx.transportdata.tw/MOTC/v2/Cycling/Shape/Kaohsiung',
//     headers: GetAuthorizationHeader()
//   })
//     .then((response) => {
//       console.log('自行車的路線',response)
//       const routeData = response.data;
//       let str = '';
//       routeData.forEach((item) => {
//         str += `<option value="${item.RouteName}">${item.RouteName}</option>`
//       })
//       bikeRoute.innerHTML = str;
//       bikeRoute.addEventListener('change', (e) => {
//         const value = e.target.value;
//         // console.log(value)
//         if(myLayer) {
//           // console.log(myLayer);
//           main_map.removeLayer(myLayer);
//         }
//         routeData.forEach((item) => {
//           // console.log(item)
//           if (item.RouteName === value) {
//             geo = item.Geometry;
//             // console.log(geo)
//             // 畫線的方法
//             polyLine(geo);
//           }
//         })
//       })
//     })
//     .catch((error) => console.log('error', error))
// }
// getRoutesData();
// // 畫出自行車的路線
// let myLayer = null;
// function polyLine(geo) {
//   // 建立一個 wkt 的實體
//   const wicket = new Wkt.Wkt();
//   const geojsonFeature = wicket.read(geo).toJson()
//   // 預設樣式
//   // myLayer = L.geoJSON(geojsonFeature).addTo(main_map);
//   const myStyle = {
//     "color": "#ff0000",
//     "weight": 5,
//     "opacity": 0.65
//   };
//   const myLayer = L.geoJSON(geojsonFeature, {
//     style: myStyle
//   }).addTo(main_map);
//   myLayer.addData(geojsonFeature);
//   // zoom the map to the layer
//   main_map.fitBounds(myLayer.getBounds());
// }
//# sourceMappingURL=all.js.map
