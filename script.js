fetch("https://brunfoobar.herokuapp.com/")
        .then((response) => response.json())
        .then((data) => workData(data));

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

function workData(x) {  // x is the data got from the database
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

// Navigation Script

const navDashboard = document.querySelector("#dashboardNavElement");
const navProfile = document.querySelector("#profileNavElement");
const navCalendar = document.querySelector("#calendarNavElement");

navDashboard.addEventListener('click', function() {
    selectItem("dash");
});
navProfile.addEventListener('click', function() {
    selectItem("profile");
});
navCalendar.addEventListener('click', function() {
    selectItem("calendar");
})

function selectItem(x) {
    navDashboard.classList.remove("selectedNavItem");
    navProfile.classList.remove("selectedNavItem");
    navCalendar.classList.remove("selectedNavItem");
    console.log("it works");
    if(x=="dash") {
        navDashboard.classList.add("selectedNavItem");
    }
    else if(x=="profile") {
        navProfile.classList.add("selectedNavItem");
    }
    else {
        navCalendar.classList.add("selectedNavItem");
    }
}