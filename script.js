// Cache the DOM (Document Object Model)
const barName = document.getElementById("BarName");
// Navigation IDs
const navDashboard = document.getElementById("dashboardNavElement");
const navList = document.getElementById("navList");
const navProfile = document.getElementById("profileNavElement");
const navCalendar = document.getElementById("calendarNavElement");
const navBGMobile = document.getElementById("navBackgroundMobile");
const navBurgerButton = document.getElementById("burgerNavButton");
// Bartender IDs
const bartenderContainer = document.getElementById("bartenderContainer");
const seeMoreBartenders = document.getElementById("bartendersButton");
const photoImg1 = document.getElementById("photo1");
const photoImg2 = document.getElementById("photo2");
const photoImg3 = document.getElementById("photo3");
// Storage IDs
const storageContainer = document.getElementById("storageContainer");
const storageBeerContainer = document.getElementById("storageBeerContainer");
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
const remainingTapContainer = document.getElementById("remainingTapBeerContainer");
const beerBar = document.querySelector(".beerBar");
// Order IDs
const ordersContainer = document.getElementById("ordersContainer");
const clockContainer = document.getElementById("clockContainer");
const seeMoreOrders = document.getElementById("ordersButton");
const timeCircle1 = document.getElementById("clock1Time");
const numberCircle1 = document.getElementById("clock1Number");
const timeCircle2 = document.getElementById("clock2Time");
const numberCircle2 = document.getElementById("clock2Number");
const bartenderTemplate = document.getElementById("bartenderTemplate");
const storageBeerTemplate = document.getElementById("storageBeerTemplate");
const tapBeerTemplate = document.getElementById("tapBeerTemplate");
const clockTemplate = document.getElementById("clockTemplate");

//Event Listeners
navBurgerButton.addEventListener('click', expandRetractNav);
profileNavElement.addEventListener('click', expandRetractNav);
calendarNavElement.addEventListener('click', expandRetractNav);
dashboardNavElement.addEventListener('click', expandRetractNav);

window.onresize = reportWindowSize;

window.addEventListener('load', function () {
    let fetchInterval = 1000;

    setInterval(fetchFct, fetchInterval);
  });

function fetchFct() {
    fetch("https://brunfoobar.herokuapp.com/")
        .then((response) => response.json())
        .then((data) => updateData(data));
}

let i = 0, barSize = 0, navExpand = 0; // number to count the bartenders and give them an id
let time = 0; //number to count the time elapsed from when the order was taken
let beersArray = []; //arrays

function updateData(x) {    // x is the data got from the database
    i=0;
    x.bartenders.forEach(el => {
        if(el.status == "WORKING")
          document.querySelector("#bartender" + i + " .action").textContent = bartenderStatus(el.statusDetail);
        else
          document.querySelector("#bartender" + i + " .action").textContent = "waiting for orders";
        i++;
    })
    beersArray = [];
    x.storage.forEach(el => {
      beersArray.push(el);
    })
    while (storageBeerContainer.firstChild) {
      storageBeerContainer.removeChild(storageBeerContainer.lastChild);
    }
    showBeersInStorage();
    i=0;
    x.taps.forEach(el => {
      barSize = el.level / el.capacity * 100;
      document.getElementById("progress" + i).style.height = barSize + "%";
      document.getElementById("progress" + i).textContent = Math.floor(barSize) + "%";
    i++;
    })
    while (clockContainer.firstChild) {
      clockContainer.removeChild(clockContainer.lastChild);
    }
    i=0;
    x.queue.forEach(el => {
      let clone = clockTemplate.content.cloneNode(true);
    time = (x.timestamp - el.startTime)/1000;
    time = Math.floor(time);
    if(time>=720)
        clone.querySelector(".circleBar").background = "red";
    if(time<=360)
    clone.querySelector(".leftCircle .circleProgress").style.transform = "rotate(" + time/2 + "deg)";
    else if(time>360 && time <=720) {
      clone.querySelector(".leftCircle .circleProgress").style.transform = "rotate(180deg)";
      clone.querySelector(".rightCircle .circleProgress").style.transform = "rotate(" + (time-360)/2 + "deg)";
    }
    else {
      clone.querySelector(".leftCircle .circleProgress").style.transform = "rotate(180deg)";
      clone.querySelector(".rightCircle .circleProgress").style.transform = "rotate(180deg)";
    }
    if(time%60>9)
      clone.getElementById("clockTime").textContent = Math.floor(time/60) + ":" + time%60;
    else
      clone.getElementById("clockTime").textContent = Math.floor(time/60) + ":0" + time%60;
    i++;
    clone.getElementById("clock").classList.add("clock" + i);
    clone.getElementById("clockNumber").textContent = "#" + el.id;
    if(i >= 3)
      clone.getElementById("clock").style.display = "none";
    clockContainer.appendChild(clone);
    })
}

function workData(x) { // x is the data got from the database
  console.log(x);
  // document.getElementById("barName").textContent = x.bar.name;
  x.bartenders.forEach(el => {
    let clone = bartenderTemplate.content.cloneNode(true);
    clone.querySelector(".bartendersRow").id = "bartender" + i;
    clone.querySelector(".name").textContent = el.name;
    if(el.status == "WORKING")
      clone.querySelector(".action").textContent = bartenderStatus(el.statusDetail);
    else
      clone.querySelector(".action").textContent = "waiting for orders";
    i++;
    clone.querySelector(".bartenderNumber").textContent = "#" + i;
    clone.querySelector(".photoBartender").src = "bartenderPics/bartender" + i + ".jpg";
    bartenderContainer.appendChild(clone);
  });
  x.storage.forEach(el => {
    beersArray.push(el);
  })
  showBeersInStorage();
  i=0;
  x.taps.forEach(el => {
    let clone = tapBeerTemplate.content.cloneNode(true);
    clone.querySelector(".beerName").textContent = '"' + el.beer + '"';
    clone.querySelector(".beerBarProgress").id = "progress" + i;
    if(i==0) {
      clone.querySelector(".barAndName").classList.add("firstBeer");
    }
    barSize = el.level / el.capacity * 100;
    clone.querySelector(".beerBarProgress").style.height = barSize + "%";
    clone.querySelector(".beerBarProgress").textContent = Math.floor(barSize) + "%";
    i++;
    remainingTapContainer.appendChild(clone);
  })
  i=0;
  x.queue.forEach(el => {
    let clone = clockTemplate.content.cloneNode(true);
    time = (x.timestamp - el.startTime)/1000;
    time = Math.floor(time);
    if(time%60>9)
      clone.getElementById("clockTime").textContent = Math.floor(time/60) + ":" + time%60;
    else
      clone.getElementById("clockTime").textContent = Math.floor(time/60) + ":0" + time%60;
    i++;
    clone.getElementById("clock").classList.add("clock" + i);
    clone.getElementById("clockNumber").textContent = "#" + el.id;
    if(i >= 3)
      clone.getElementById("clock").style.display = "none";
    clockContainer.appendChild(clone);
  })
  
}

fetch("https://brunfoobar.herokuapp.com/")
  .then((response) => response.json())
  .then((data) => workData(data));

// Bartenders Scripts

function bartenderStatus(stat) {
  if(stat == "pourBeer")
    return "is pouring beer";
  if(stat == "startServing")
    return "starts serving";
  if(stat == "receivePayment")
    return "receives the payment"
  if(stat == "releaseTap")
    return "releases the tap"
  if(stat == "reserveTap")
    return "reserves the tap"
  if(stat == "replaceKeg")
    return "replaces the keg"
}

// Storage Scripts 

function compareNumbers(a, b) {
  return a.amount-b.amount;
}

function showBeersInStorage() {
  beersArray.sort(compareNumbers);
  i=0;
  beersArray.forEach(el => {
    let clone = storageBeerTemplate.content.cloneNode(true);
    clone.querySelector("tr").id = "row" + i;
    clone.querySelector(".productClass").textContent = '"' + el.name + '"';
    clone.querySelector(".quantityClass").textContent = el.amount;
    if(el.amount >= 6) {
      clone.querySelector(".statusArea").textContent = "In stock";
      clone.querySelector(".statusArea").classList.add("onStock");
    }
    else if(el.amount >= 3) {
      clone.querySelector(".statusArea").textContent = "Low stock";
      clone.querySelector(".statusArea").classList.add("lowStock");
    }
    else {
      clone.querySelector(".statusArea").textContent = "Critically low";
      clone.querySelector(".statusArea").classList.add("criticallyLow");
    }
    if(i>=5) {
      clone.getElementById("row" + i).style.display = "none";
    }
    i++;
    storageBeerContainer.appendChild(clone);
  })
}

// Navigation Script


navDashboard.addEventListener('click', function () {
  selectItem("dash");
});
navProfile.addEventListener('click', function () {
  selectItem("profile");
});
navCalendar.addEventListener('click', function () {
  selectItem("calendar");
})

function selectItem(x) {
  navDashboard.classList.remove("selectedNavItem");
  navProfile.classList.remove("selectedNavItem");
  navCalendar.classList.remove("selectedNavItem");
  if (x == "dash") {
    navDashboard.classList.add("selectedNavItem");
  }
  else if (x == "profile") {
    navProfile.classList.add("selectedNavItem");
  }
  else {
    navCalendar.classList.add("selectedNavItem");
  }
}

function reportWindowSize() {
  if(window.innerWidth >= 768) {
    navList.style.display = "block";
    navBGMobile.style.height = "100px";
  }
  else if(!navExpand) {
    navList.style.display = "none";
  }
}

function expandRetractNav() {
  
  if(!navExpand && window.innerWidth <= 768) {
    navBGMobile.style.height = "100vh";
    navList.style.display = "block";
    navExpand=1;
  }
  else if(navExpand && window.innerWidth <= 768) {
    navBGMobile.style.height = "100px";
    navList.style.display = "none";
    navExpand=0;
  }
}
