//let now = new Date();
//console.log(now);

/*(5)//here`s axios function to recieve response and
 get real data or the hole object and information we are seacrhing*/
function searhRealData(response) {
  //console.log(response.data);
  let number = document.querySelector("#number-degree");

  let nub = Math.round(response.data.temperature.current);
  let hmd = document.querySelector(".humi");
  let wind = document.querySelector(".wini");
  let cloud = document.querySelector(".cloud");
  let spann = document.querySelector(".spann");
  let time = document.querySelector(".time");

  /*here am putting e date and timestamp formular into valiable
  let date = new Date(response.data.time * 1000);
  here am adding e date func from numb(6) to the timestamp formular
  to the selected HTML id to display e days and time on the selected page*/
  let date = new Date(response.data.time * 1000);
  let dateline = document.querySelector("#date-line");
  dateline.innerHTML = formatdate(date);

  /* i remove this from numb(2) to here becos if u mistype 
  the city name, becos of real data in here it will still going
   to gv me the real name of e city.*/
  let revci = document.querySelector("#h4");
  revci.innerHTML = response.data.city;

  hmd.innerHTML = `${response.data.temperature.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed}km/h`;
  cloud.innerHTML = response.data.condition.description;
  number.innerHTML = nub;

  //the joining of icon from response to e html img spot
  let url = response.data.condition.icon_url;
  let icon = document.querySelector("#iconsurl");
  //here am replacing e HTML element img to e response img url into it
  icon.innerHTML = `<div class="degree" id="degree-main">
          <img src="${url}" alt="" class="img">
        </div>`;
  /*lastly you call this func here to work or 
  function the current api display then this func also continue*/
  getforcast(response.data.city);
}

//(6) here creating a function for days,date and hours to connect to the real data form
function formatdate(date) {
  let minutes = date.getMinutes();
  let hour = date.getHours();
  let allDay = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  //here i added the allday valiable into the getday valiable
  let day = allDay[date.getDay()];

  /* am adding if stetment becos when the minutes is less than 10 
  it add 0 numb infront of number */
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  /* here am return the valiables of all e date or 
  formatdate function so that we can recieve it */
  return `${day} ${hour}:${minutes}`;
}
//(4)//here`s the apiUrl and apiKey element function
function intoTheProject(city) {
  let apiKey = "d8629b2a0231f4b2b7t6f9cd82o33b14";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  //here am sending the apiUrl throug axios with func(searchRealData) to create function(searchRealData) to fetch a real data
  axios.get(apiUrl).then(searhRealData);
}
//(2)// here`s the form function to operate the form elements
function heading(event) {
  event.preventDefault();
  let text = document.querySelector("#search-them");

  //let revci = document.querySelector("#h4");
  // revci.innerHTML = text.value;

  //let now = new Date();
  //let mouth = document.querySelector(".spann");
  //let dataa = document.querySelector(".time");
  //let dy = now.getDay();
  //let dat = now.getDate();
  //let daysss = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  //let them = daysss.dy;

  //mouth.innerHTML = them;
  //dataa.innerHTML = dat;

  /*(3)//here i conect/sending city value to the city 
  parimeter in the (intoTheProject)and help the apiUrl
   and apiKey function to get real data value of the city 
   we will type in our search input*/
  intoTheProject(text.value);
}
// (1) here i select the hole form element to gv it function
let form = document.querySelector("#fomm");
form.addEventListener("submit", heading);

/* (9) here am creating new func of days in it and timestamp method
 to get real date or days and connect it to numb(7) function */
function format(timestamp) {
  let datee = new Date(timestamp * 1000);
  let day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return day[datee.getDay()];
}

//8 here you joining e apiurl from this func into cast func to get e forcast
function getforcast(city) {
  let apiKey = "d8629b2a0231f4b2b7t6f9cd82o33b14";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(cast);
  //console.log(apiUrl);
}

/* (7) here`s the day loop functon.. to loop throug the days 
and concatenat with html forcast element */
function cast(response) {
  console.log(response.data);

  //here`s empty valaible to put the html element in through looping
  let cat = "";
  /* here am loopin through with response.data.daily 
  from e cast apiurl from axios in line (8) */
  response.data.daily.forEach(function (date, index) {
    if (index < 5) {
      //here put the html element now into the empty valiable (cat)
      cat =
        cat +
        //here e plus sign mean to add itself continuesly until the loop finish
        //and i put e (city paremeter into e html div to fitch e days in through looping)
        //and e same through de div,it gonna loop itself amoun
        `<div id="over">
        <div id="dayss">${format(date.time)}</div> 
        <div class="cloudme" id="cloud">
        <img src="${date.condition.icon_url}">
        </div>
        <div id="figure" class=""><span class="max">${Math.round(
          date.temperature.maximum
        )}°</span> <span class="min">${Math.round(
          date.temperature.minimum
        )}°</span></div>
      </div>
      `;
    }
  });

  // here`s the selected forcast element
  let weather = document.querySelector("#forcast");
  weather.innerHTML = cat;
}

/* here i took e func(intoTheProject) from numb3 becos there he recieve
 the value of the city input from e form..so down here am giving it a special city
  like placeholder so whenever e page reload is still gonna maintain the input value here*/
intoTheProject("berlin");

cast();

/*this is the first approach using (days.forEach method) to loop throug in

(7)here`s the day loop functon.. to loop throug the day and
 concatenat with html forcast element
function cast() {
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  //here`s empty valaible to put the html element in through looping
  let cat = "";
  days.forEach(function (city) {
    //here put the html element now into the empty valiable (cat)
    cat =
      cat +
      //here e plus sign mean to add itself continuesly until the loop finish
      //and i put e (city paremeter into e html div to fitch e days in through looping)
      //and e same through de div,it gonna loop itself amoun
      `<div id="over">
        <div id="dayss">${city}</div> 
        <div class="cloudme" id="cloud">//🌤</div>
        //<div id="figure" class=""><span class="max">22°</span> <span class="min">9°</span></div>
      //</div>
    //  `;
  //});

  // here`s the selected forcast element
  //let weather = document.querySelector("#forcast");
  //weather.innerHTML = cat;
//}*/
