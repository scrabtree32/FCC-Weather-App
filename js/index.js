var lat, lon,
    tempUnit = "C",
    currentTempInC,
    weather;

//get location 
$( document ).ready(function(){
 if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    getWeather(lat, lon);
    });
  } else {console.log("Geolocation is not supported by this browser.")};




//get weather from FCC api
 function getWeather(lat, lon){
      $.ajax({
      url: 'https://fcc-weather-api.glitch.me/api/current?' + 'lon=' + lon + '&lat=' + lat, 
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        var currentTempInC = Math.round(data.main.temp * 10) / 10;
        var currentTempInF = Math.round((currentTempInC) * 9 / 5 + 32);
        var weather = data.weather[0].main;
        $(".temp").text(currentTempInC);
        $(".changeUnit").text(tempUnit);
        $(".city").text(data.name + ", ");
        $(".country").text(data.sys.country);
        $(".weather").text(data.weather[0].description);
        $(".wind").text(data.wind.speed + " knots");
        chooseImg(weather);
        
        
  //Change temp Unit when clicked
   $(".changeUnit").click(function(){
     if ($(this).text() === "C") {
       var currentTempInF = parseInt($(".temp").text())*1.8 + 32;
       $(".temp").text(currentTempInF);
       $(this).text("F");
     } else {
       $(".temp").text(currentTempInC);
       $(this).text(tempUnit);
     }   
  });
        
  //Change background depending on weather
   function chooseImg(weather) {
     var weather = weather.toLowerCase();
     switch (weather) {
       case 'thunderstorm':
         $(".container").addClass("thunderstorm");  
          break;
       case 'drizzle':
         $(".container").addClass("rain");  
          break;
       case 'rain':
         $(".container").addClass("rain"); 
          break;
       case 'snow':
         $(".container").addClass("snow");  
          break;
       case 'atmosphere':
         $(".container").addClass("mist");  
          break;
       case 'clear':
         $(".container").addClass("clear");  
          break;
       case 'clouds':
         $(".container").addClass("clouds");  
          break;
       case 'extreme':
         $(".container").addClass("thunderstorm");  
          break;
       case 'mist':
         $(".container").addClass("mist"); 
          break;
        default :
         $(".container").addClass("mist");
     };
   };     
      },
      error: function(err) { alert(err); }
      });
    };
 
getWeather();
    
});
