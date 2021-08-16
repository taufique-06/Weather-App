
document.getElementById("plus").onclick = function (){

	document.querySelector(".search-box").style.display = "initial";	
	let weather = {
  apiKey: "5b49a35dd17e1db7508a0cca18c7511f",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".mySearch").value);
  },
};

document.querySelector(".example button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".mySearch")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Dartford");


}
