var obj = new Date();

var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thusday",
    "Friday",
    "Satuarday",
];
var day = days[obj.getDay()];

var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
];

var month = months[obj.getMonth()];

var date = obj.getDate();
var hour = obj.getHours();
var minute = obj.getMinutes();

if (date < 10) {
    date = `0${date}`;
}
if (hour < 11) {
    hour = hour;
    var data = "am";
} else {
    hour = hour - 12;
    var data = "pm";
}
if (hour < 10) {
    hour = `0${hour}`;
}
if (minute < 10) {
    minute = `0${minute}`;
} else {
    minute = minute;
}

document.getElementById(
    "result"
).children[0].innerHTML = `${day},${month} ${date}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${hour}:${minute}${data}`;

document.getElementById("searchButton").addEventListener("click", (event) => {
    event.preventDefault();
    var cityname = document.getElementById("cityname").value;
    if (cityname == "") {
        document.getElementById(
            "degree"
        ).innerHTML = `<p style="font-size: 25px; font-weight: bold; color:gray;">Please Enter Your City Name<p>`;
    } else {
        async function disp() {
            var readData = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=2fbd5393181d420976588afcd94f8826`
            );
            var res = await readData.json();
            return res;
        }

        disp().then((result) => {
            document.getElementById(
                "city"
            ).innerHTML = `${result.name},${result.sys.country}`;
            var tempmood = result.weather[0].main;
            var a = result.main.temp - 273.15;
            var fixe = a.toFixed(2);
            document.getElementById("degree").innerHTML = `${fixe}&degC`;
            var obj = new Date();
            var hour = obj.getHours();
            console.log(hour);

            if (hour >= 6 && hour <= 19) {
                document.getElementById(
                    "sunmoon"
                ).innerHTML = `<i class="fa-solid fa-sun" style='color:orange;'></i>`;
            } else if (hour >= 6 && hour <= 19) {
                document.getElementById(
                    "sunmoon"
                ).innerHTML = `<i class="fa-solid fa-cloud-sun"></i>`;
            } else if (hour >= 19 && hour <= 6) {
                document.getElementById(
                    "sunmoon"
                ).innerHTML = `<i class="fa-solid fa-moon"></i>`;
            } else if (hour >= 19 && hour <= 6) {
                document.getElementById(
                    "sunmoon"
                ).innerHTML = `<i class="fa-solid fa-cloud-moon"></i>`;
            } else if (tempmood == "Rain") {
                document.getElementById(
                    "sunmoon"
                ).innerHTML = `<i class="fa-solid fa-cloud-moon"></i>`;
            } else {
                document.getElementById(
                    "sunmoon"
                ).innerHTML = `<i class="fa-solid fa-cloud" style='color:blue';></i>`;
            }
        });

        disp.catch((err) => {
            console.log("File Not Found");
        });
    }
});