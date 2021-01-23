const openWeatherKey = 'd5b8808f5c8d447dee90e73a25974b6f';

/// Geolocation

document.querySelector('#findLocation').addEventListener('click', geoLookup, false);

function geoLookup () {

    const status = document.querySelector('#status');

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        status.textContent = `lat: ${latitude}, lon: ${longitude}`;
        setWeather(latitude,longitude);
    }

    function error(err) {
        status.textContent = `Unable to retrieve your location. Error: ${err.code}, ${err.message}`
    }

    if (!navigator.geolocation) {
        status.textContent = 'Your position dont have in your browser';
    } else {
        status.textContent = 'Loading ... '
        navigator.geolocation.getCurrentPosition(success, error);
    }
}
/// WeatherBug

  function setWeather(latitude,longitude) {
    const p = document.querySelector('#weatherbug p');

    let openWeatherData = {}
    let xhr = new XMLHttpRequest();
    
    xhr.open('GET', `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherKey}&units=imperial`);
    
    xhr.responseType = 'text';
    
    xhr.addEventListener('load', function() {
        if (xhr.status === 200) {
            p.textContent ="loading..."
            openWeatherData = JSON.parse(xhr.responseText)
            populateWeatherInfo()
        } else {
            p.textContent = "error: " + xhr.status
        }
    }, false)
    
    xhr.send()
  }
  function populateWeatherInfo() {

      const location = openWeatherData.name
      const temp = Math.round(openWeatherData.main.temp)
      const wind = Math.round(openWeatherData.wind.speed)
      const time = new Date(openWeatherData.dt * 1000)
      let hrs = time.getHours()
      let mins = time.getMinutes()

      console.log(location.longitude);
      console.log(location.latitude);
      const str = `${location}<br>${temp}&#0176;<br>wind: ${wind}mph <br> ${hrs}:${mins}`;
      p.innerHTML = str;
  }