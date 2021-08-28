// Cache the DOM (Document Object Model)
const barName = document.getElementById("BarName");
// Bartender IDs
const bartenderContainer = document.getElementById("bartenderContainer");
const seeMoreBartenders = document.getElementById("bartendersButton");
const photoImg1 = document.getElementById("photo1");
const photoImg2 = document.getElementById("photo2");
const photoImg3 = document.getElementById("photo3");
// Storage IDs
const storageContainer = document.getElementById("storageContainer");
const seeMoreStorage = document.getElementById("storageButton");
const product0 = document.getElementById("product0");
const quantity0 = document.getElementById("quantity0");
const status0 = document.getElementById("status0");
const product1 = document.getElementById("product1");
const quantity1 = document.getElementById("quantity1");
const status1 = document.getElementById("status1");
const product2 = document.getElementById("product2");
const quantity2 = document.getElementById("quantity2");
const status2 = document.getElementById("status2");
const product3 = document.getElementById("product3");
const quantity3 = document.getElementById("quantity3");
const status3 = document.getElementById("status3");
// Remaining Tap IDs
const remainingTapContainer = document.getElementById("remainingTapContainer");
const progress0 = document.getElementById("progress0");
const progress1 = document.getElementById("progress1");
const progress2 = document.getElementById("progress2");
const progress3 = document.getElementById("progress3");
const progress4 = document.getElementById("progress4");
const progress5 = document.getElementById("progress5");
const progress6 = document.getElementById("progress6");
// Order IDs
const ordersContainer = document.getElementById("ordersContainer");
const seeMoreOrders = document.getElementById("ordersButton");
const timeCircle1 = document.getElementById("clock1Time");
const numberCircle1 = document.getElementById("clock1Number");
const timeCircle2 = document.getElementById("clock2Time");
const numberCircle2 = document.getElementById("clock2Number");
const objTemplate = document.getElementById("objTemplate");

// window.addEventListener('load', function () {
//     let fetchInterval = 1000;

//     setInterval(fetchFct, fetchInterval);
//   });

// function fetchFct() {
//     fetch("https://brunfoobar.herokuapp.com/")
//         .then((response) => response.json())
//         .then((data) => updateData(data));
// }

let i = 0; // number to count the bartenders and give them an id

// function updateData(x) {    // x is the data got from the database
//     i=0;
//     x.bartenders.forEach(el => {
//         document.querySelector("#worker" + i + " .objText").textContent = el.status;
//         document.querySelector("#worker" + i + " .objStatus").textContent = el.statusDetail;
//         if(el.usingTap != null) {
//             document.querySelector("#worker" + i + " .objTapUsed").textContent = "Using Tap: " + el.usingTap;
//         }
//         if(el.servingCustomer != null)
//             document.querySelector("#worker" + i + " .objCustomer").textContent = "Serving Customer: " + el.servingCustomer;
//         else {
//             document.querySelector("#worker" + i + " .objCustomer").textContent = "";
//         }
//         i++;
//     })
// }

function workData(x) { // x is the data got from the database
  console.log(x);
  // document.getElementById("barName").textContent = x.bar.name;
  x.bartenders.forEach(el => {
    let tempBody = document.getElementById("bartenderContainer");
    let template = document.getElementById("objTemplate");
    let clone = template.content.cloneNode(true);
    i++;
    tempBody.appendChild(clone);
  });
}



fetch("https://brunfoobar.herokuapp.com/")
  .then((response) => response.json())
  .then((data) => workData(data));
