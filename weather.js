window.onload = function(){
	// alert("To Convert Kelvin to Celcius or to fahrenheit, just click on each line")
	//  Getting longitude and latitude
	let long;
	let lat;
	let temperatureDes = document.querySelector(".temperature-description");
	let temperatureDegree = document.querySelector(".degree-value");
	let locationTime = document.querySelector(".location-timezone");
	let temperatureC = document.querySelector(".degree-value");
	let temperatureSpan = document.querySelector(".spanDiv span");
	let temperatureMax = document.querySelector(".degree-max-value");
	let temperatureMin = document.querySelector(".degree-min-value");
	let iconButton = document.querySelector(".imageIcon")
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition (position => {
			// console.log(position)

			long = position.coords.longitude;
			lat = position.coords.latitude;
		
			const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=5b49a35dd17e1db7508a0cca18c7511f`
			fetch(api)
				.then(response =>{
				return response.json(); //It is conventional to write
			})
				.then(data => {
				console.log(data);
				const {temp, humidity, temp_max, temp_min} = data.main; //if you write "const {} = data.currently;, this will get all the value from the currently folder.
				const { icon, description } = data.weather[0];

				locationTime.textContent = data.name; //Getting the City name
				
				temperatureDegree.textContent = temp; //Temperature details
				
				document.querySelector(".icon").src=`https://openweathermap.org/img/wn/${icon}.png`
				
				convertFToC(temp);

				maxTemp(temp_max);

				minTemp(temp_min);

				iconButton.onclick = function(){
						const str = description;
						const str2 = str.charAt(0).toUpperCase() + str.slice(1)						
						console.log(str2);
						alert(str2);
				}
			
			});
		});	
	
	}

	


	// Calling function to convert K to C starts here
	function convertFToC (temp) {
		temperatureDegree.textContent = "Temperature: " + temp + " K" 
		let celsius = Math.floor((temp -273.15));
		let fahrenheit = Math.floor((celsius * (9/5) + 32));
		temperatureC.addEventListener("click", () =>{
			if (temperatureSpan.textContent === "K") {

			temperatureSpan.textContent = "C"
			temperatureDegree.textContent = "Temperature: " + celsius + "\u00B0" + " C";

			}else if (temperatureSpan.textContent === "C") {

			temperatureSpan.textContent = "F"
			temperatureDegree.textContent = "Temperature: " + fahrenheit + "\u00B0" + " F";

			}else if (temperatureSpan.textContent === "F") {
				temperatureSpan.textContent = "K"
				temperatureDegree.textContent = "Temperature: " + temp + "\u00B0" + " K";
			}
		});
	}

	// Calling function to convert K to C ends here 


	// Calling function to get the Max temperature starts here
		function maxTemp (maximumTemp){
			temperatureMax.textContent = "Max Temperature Today: " + maximumTemp + " K"; 
			let celsius = Math.floor((maximumTemp -273.15));
			let fahrenheit = Math.floor((celsius * (9/5) + 32));
			temperatureMax.addEventListener("click", () =>{
			if (temperatureSpan.textContent === "K") {

			temperatureSpan.textContent = "C"
			temperatureMax.textContent = "Max Temperature Today: " + celsius + "\u00B0" + " C";

			}else if (temperatureSpan.textContent === "C") {

			temperatureSpan.textContent = "F"
			temperatureMax.textContent = "Max Temperature Today: " + fahrenheit + "\u00B0" + " F";

			}else if (temperatureSpan.textContent === "F") {
				temperatureSpan.textContent = "K"
				temperatureMax.textContent = "Max Temperature Today: " + maximumTemp + "\u00B0" + " K";
			}
		});
		}

	// Calling function to get the Max temperature ends here


	// Calling function to get the Min temperature starts here
		function minTemp (minimumTemp){
			temperatureMin.textContent = "Min Temperature Today: " + minimumTemp + " K"; 
			let celsius = Math.floor((minimumTemp -273.15));
			let fahrenheit = Math.floor((celsius * (9/5) + 32));
			temperatureMin.addEventListener("click", () =>{
			if (temperatureSpan.textContent === "K") {

			temperatureSpan.textContent = "C"
			temperatureMin.textContent = "Min Temperature Today: " + celsius + "\u00B0" + " C";

			}else if (temperatureSpan.textContent === "C") {

			temperatureSpan.textContent = "F"
			temperatureMin.textContent = "Min Temperature Today: " + fahrenheit + "\u00B0" + " F";

			}else if (temperatureSpan.textContent === "F") {
				temperatureSpan.textContent = "K"
				temperatureMin.textContent = "Min Temperature Today: " + minimumTemp + "\u00B0" + " K";
			}
		});
		}

	// Calling function to get the Min temperature ends here


}