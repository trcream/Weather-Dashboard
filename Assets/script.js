$(document).ready(function(){
    
    var cacheKey = 'KnownCities'
    var cities = JSON.parse(localStorage.getItem(cacheKey));
    var currentDate = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
     

    var searchButton = $('#searchBtn')
 

    searchButton.on('click',function(){
     
      var searchCity = $('.input').val();
      searchWeather(searchCity);
      displayUVData();
     


      
     // var cityInput= $('#cityInput').val();
  
        
    })

        
     if (! cities) {

        cities = [];
      
       
        

        
     }

     else{
    
      renderHistory(cities);

     }




     function renderHistory(cities){

      for (var i = 0; i < cities.length;i++ ){

        newDiv = $('<div>')
        newDiv.text(cities[i])
        $('#History').append(newDiv)
       // $('#History').append(cities[i]);
        console.log(cities[i])
   

      }

     }
  
     // starting point
     function searchWeather ( city ){

        addNewCity(city);      
        fetchWeather(city);
        fetchForecast(city);   
                  
      }


    // get weather data from the API
     function fetchWeather(city){

        var queryParams =$.param({
            q:city,
            appid: "7bb104f282f38f6d6a105af6428f8f9f"

        });

      // Here we are building the URL we need to query the database

      var queryURL = 'https://api.openweathermap.org/data/2.5/weather?' + queryParams




    
      // Here we run our AJAX call to the OpenWeatherMap API
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {
  
          // Log the queryURL
       
  
          // Log the resulting object
     

            fetchUV(response.coord);
            displayWeather(response);
            var cityData = response


        });

     }

     function displayWeather(cityData){

       // $(".city").html("<h1>" + response.name + " Weather Details</h1>");

       console.log(cityData)

       var currentDate = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

       varTemp0 = Math.round((cityData.main.temp -273.15) * 1.8 +32);

       var iconcode = cityData.weather[0].icon;
       var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
       $('#wicon').attr('src', iconurl);

       $(".cityName").text('Weather for: ' + cityData.name ); 
       $(".date").text('Date: '+ currentDate);
       $(".temp").text('Temperature: ' + varTemp0);
       $(".wind").text('Wind Speed: ' + cityData.wind.speed);
       $(".humidity").text('Humidity: ' + cityData.main.humidity);
  
    
    
     }
  

     function fetchUV(coords){

      
        var lattitude = coords.lat;
      
        var longitude = coords.lon;
  



        var queryParams =$.param({
          
           lon: coords.lon,
           lat: coords.lat,
           appid: "7bb104f282f38f6d6a105af6428f8f9f"
        });
 
    

      // Here we are building the URL we need to query the database

      var queryURL = 'https://api.openweathermap.org/data/2.5/uvi?' + queryParams
     

    
      // Here we run our AJAX call to the OpenWeatherMap API
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {
  
          // Log the queryURL
        


          displayUVData(response.value)
          

           // fetchUV(response.coord)

        });

    };

    function displayUVData( cityData){
  
        $(".uv").html( ' UV Score: ' + cityData);

        if( cityData > 8){

          $('.uv').css("background-color","red");
        }

        else if(cityData < 8 || cityData >  3 )

        $('.uv').css("background-color","yellow");

        else{

          $('.uv').css("background-color","green");
        }



    }
    
   

    function fetchForecast(city){

  
      var queryParams =$.param({
                q:city,
        appid: "7bb104f282f38f6d6a105af6428f8f9f"
      });

  

    // Here we are building the URL we need to query the database

    var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?' + queryParams
    console.log(queryURL)
  
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"

    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        console.log(queryURL)
      
        displayForecast(response);

      
        

      

      });
    }

    function displayForecast( response){
  
        //
      varTempF1 = Math.round((response.list[0].main.temp -273.15) * 1.8 +32);
      var newDate1 = moment().add(1,'days').format("MMMM Do");

      var iconcode1 = response.list[0].weather[0].icon;
       var iconurl1 = "http://openweathermap.org/img/w/" + iconcode1 + ".png";
       $('#wicon1').attr('src', iconurl1);

      $("#date-1").text('Date: '+ newDate1);
      $("#icon-1").text();
      $("#temp-1").text('Temp: ' + varTempF1);
      $("#humidity-1").text('Humidity: ' + response.list[0].main.humidity);
      //
      varTempF2 = Math.round((response.list[1].main.temp -273.15) * 1.8 +32);
      var newDate2 = moment().add(2,'days').format("MMMM Do");

      var iconcode2 = response.list[1].weather[0].icon;
      var iconurl2 = "http://openweathermap.org/img/w/" + iconcode2 + ".png";
      $('#wicon2').attr('src', iconurl2);


      $("#date-2").text('Date: '+ newDate2);
      $("#icon-2").text();
      $("#temp-2").text('Temp: ' + varTempF2);
      $("#humidity-2").text('Humidity: ' + response.list[1].main.humidity);
      //
      varTempF3 = Math.round((response.list[2].main.temp -273.15) * 1.8 +32);
      var newDate3 = moment().add(3,'days').format("MMMM Do");

      var iconcode3 = response.list[2].weather[0].icon;
      var iconurl3 = "http://openweathermap.org/img/w/" + iconcode3 + ".png";
      $('#wicon3').attr('src', iconurl3);

      $("#date-3").text('Date: '+ newDate3);
      $("#icon-3").text();
      $("#temp-3").text('Temp: ' + varTempF3);
      $("#humidity-3").text('Humidity: ' + response.list[2].main.humidity);
      //
      varTempF4 = Math.round((response.list[3].main.temp -273.15) * 1.8 +32);
      var newDate4 = moment().add(4,'days').format("MMMM Do");

      var iconcode4 = response.list[3].weather[0].icon;
      var iconurl4 = "http://openweathermap.org/img/w/" + iconcode4 + ".png";
      $('#wicon4').attr('src', iconurl4);

      $("#date-4").text('Date: '+ newDate4);
      $("#icon-4").text();
      $("#temp-4").text('Temp: ' + varTempF4);
      $("#humidity-4").text('Humidity: ' + response.list[3].main.humidity);
      //
      varTempF5 = Math.round((response.list[4].main.temp -273.15) * 1.8 +32);
      var newDate5 = moment().add(5,'days').format("MMMM Do");

      var iconcode5 = response.list[4].weather[0].icon;
      var iconurl5 = "http://openweathermap.org/img/w/" + iconcode5 + ".png";
      $('#wicon5').attr('src', iconurl5);

      $("#date-5").text('Date: '+ newDate4);
      $("#icon-5").text();
      $("#temp-5").text('Temp: ' + varTempF4);
      $("#humidity-5").text('Humidity: ' + response.list[4].main.humidity);
      



    }

    function addNewCity(city){

        console.log('Add new city')

        if(cities.indexOf(city) === -1 ){
            console.log('AddNewCity');

            cities.push(city);

            console.log(cities);
            console.log(cacheKey);

            localStorage.setItem(cacheKey, JSON.stringify(cities))

        }

    }

    

        });