angular.module("ForecastApp", [])
    .controller("WeatherServiceController", ["$scope", "$http", "$sce",
        "GoogleGeolocationService", "DarkSkyWeatherService",
        function($scope, $http, $sce,
                 GoogleGeolocationService,
                 DarkSkyWeatherService){
	   
            var wsc = this;

            
            wsc.selected_lat = 0;
            wsc.selected_lon = 0;
        
            //key: sdfgsde5dfgsdfg34tsdfg

            //App name    
            wsc.app_name = "Weather App";
        
            wsc.cities = 
            [
                {
                    name: "Amarillo",
                    url_name: "Amarillo",
                    state: "TX",
                    lat: 0,
                    lon: 0
                }, 
                {
                    name: "Anchorage",
                    url_name: "Anchorage",
                    state: "AK",
                    lat: 0,
                    lon: 0
                },
                {
                    name: "Denver",
                    url_name: "Denver",
                    state: "CO",
                    lat: 0,
                    lon: 0
                }
            ];
            
            wsc.addCity = function(cityname, cityurl, statename, citylat, citylon)
            {
                wsc.cities.push({
                    name: wsc.cityname,
                    url_name: wsc.cityurl,
                    state: wsc.statename,
                    lat: wsc.citylat,
                    lon: wsc.citylon
                    
                });
                wsc.cityname = wsc.cities;
                wsc.cityurl = wsc.cities.url_name;
                wsc.statename = wsc.cities.state;
                wsc.citylat = wsc.selected_lat;
                wsc.citylon = wsc.selected_lon;
                
            }
            
            wsc.selectTheCity = function()
            {
                wsc.getLatLonForSelected();  
            };
            
            wsc.getLatLonForSelected = function(){
                GoogleGeolocationService.geoLocate(wsc.selected_city)
                    .then(function(res){
                        wsc.selected_lat = res.data.results[0].geometry.location.lat;
                        wsc.selected_lon = res.data.results[0].geometry.location.lng;
                        
                        wsc.selected_city.lat = wsc.selected_lat;
                        wsc.selected_city.lon = wsc.selected_lon;
                        
                        //var google_static_maps_key = "AIzaSyDTKNGn7vPeeAoQMHMganaXtmChClxxPX4";
                        var google_static_maps_key = "AIzaSyDTKNGn7vPeeAoQMHMganaXtmChClxxPX4";
                        
                        wsc.google_static_maps_url = "https://maps.googleapis.com/maps/api/staticmap?center=" +
                                                     wsc.selected_lat + "," +
                                                     wsc.selected_lon + 
                                                     "&zoom=10&size=600x300&key=" +
                                                     google_static_maps_key;
                                                     
                        console.log("Google Static Map API URL");
                        console.log(wsc.google_static_maps_url);                        
                        
                        //console.log(res);
                        
                        
                        wsc.getCurrentConditions();        
                        
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            };
            wsc.get
            wsc.getCurrentConditions = function(){
                DarkSkyWeatherService.getCurrentConditions(wsc.selected_city)
                    .then(function(res){
                        console.log(res);
                        
                        //get the weather stuff from the Dark Sky service here
                        wsc.observation_time = new Date(res.data.currently.time * 1000);
                        wsc.temperature      = res.data.currently.temperature;
                        wsc.tempC            = Math.round((wsc.temperature - 32) * (5/9));
                        wsc.dewpoint         = res.data.currently.dewPoint;
                        wsc.windBearing      = res.data.currently.windBearing;
                        wsc.windSpeed        = res.data.currently.windSpeed;
                        wsc.summary          = res.data.currently.summary;
                        wsc.darkIcon         = res.data.currently.icon;
                        
                        if (wsc.darkIcon == "cloudy")
                        {
                            wsc.Icon = "https://image.flaticon.com/icons/svg/131/131043.svg";
                           
                        };
                        if (wsc.darkIcon == "clear-day")
                        {
                            wsc.Icon = "https://image.flaticon.com/icons/svg/136/136723.svg";
                           
                        };
                        if (wsc.darkIcon == "clear-night")
                        {
                            wsc.Icon = "https://image.flaticon.com/icons/svg/348/348040.svg";
                           
                        };
                        if (wsc.darkIcon == "rain")
                        {
                            wsc.Icon = "https://image.flaticon.com/icons/svg/131/131041.svg";
                           
                        };
                        if (wsc.darkIcon == "snow")
                        {
                            wsc.Icon = "https://image.flaticon.com/icons/svg/152/152032.svg";
                           
                        };
                        if (wsc.darkIcon == "sleet")
                        {
                            wsc.Icon = "https://image.flaticon.com/icons/svg/1/1756.svg";
                           
                        };
                        if (wsc.darkIcon == "wind")
                        {
                            wsc.Icon = "https://image.flaticon.com/icons/svg/136/136570.svg";
                           
                        };
                        if (wsc.darkIcon == "fog")
                        {
                            wsc.Icon = "https://image.flaticon.com/icons/svg/182/182264.svg";
                           
                        };
                        if (wsc.darkIcon == "partly-cloudy-day")
                        {
                            wsc.Icon = "https://image.flaticon.com/icons/svg/131/131046.svg";
                           
                        };
                        if (wsc.darkIcon == "partly-cloudy-night")
                        {
                            wsc.Icon = "https://image.flaticon.com/icons/svg/18/18049.svg";
                           
                        };
                        /*
                        clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night
                        */
                        wsc.summaryIcon = $sce.trustAsResourceUrl(wsc.Icon);
                    })
                    .catch(function(err){
                        
                    });
            };
            
            wsc.selected_city = wsc.cities[0];
            wsc.getLatLonForSelected();
            //wsc.getCurrentConditions();            

            
    }])
    .directive('myConditionsSpecial', ['$sce', function($sce){
        
        //a reminder on naming conventions for directives: 
        //https://medium.com/@cironunesdev/angularjs-how-to-name-directives-118ac44b81d4#.idz35zby4

        /* https://docs.angularjs.org/guide/directive
        The restrict option is typically set to:

        'A' - only matches attribute name
        'E' - only matches element name
        'C' - only matches class name
        'M' - only matches comment
        */
        
        return{
            restrict: 'E',
            scope: true,
            templateUrl: $sce.trustAsResourceUrl('currentConditions.html')
        };
    }])
    /*.directive('cloudy', ['$sce', function($sce){
        
        //a reminder on naming conventions for directives: 
        //https://medium.com/@cironunesdev/angularjs-how-to-name-directives-118ac44b81d4#.idz35zby4

        /* https://docs.angularjs.org/guide/directive
        The restrict option is typically set to:

        'A' - only matches attribute name
        'E' - only matches element name
        'C' - only matches class name
        'M' - only matches comment
        
        
        return{
            restrict: 'E',
            scope: true,
            templateUrl: $sce.trustAsResourceUrl('Overcast.html')
        };
    }])
    .directive('clear', ['$sce', function($sce){
        
        //a reminder on naming conventions for directives: 
        //https://medium.com/@cironunesdev/angularjs-how-to-name-directives-118ac44b81d4#.idz35zby4

        /* https://docs.angularjs.org/guide/directive
        The restrict option is typically set to:

        'A' - only matches attribute name
        'E' - only matches element name
        'C' - only matches class name
        'M' - only matches comment
        
        
        return{
            restrict: 'E',
            scope: true,
            templateUrl: $sce.trustAsResourceUrl('Clear.html')
        };
    }])*/
    .factory('GoogleGeolocationService', ['$sce', '$http', 
        function($sce, $http){
            //https://docs.angularjs.org/api/ng/service/$sce
            
            //create an empty object
            var geolocationService = {};
            
            //Google Maps Geocoding API key   
            var key = "AIzaSyBfuZSjHb-7oj3kURf1-jBIb7Ay_jmIN_c";
            
            geolocationService.geoLocate = function(location){

                var address = "+" + location.name + ",+" + location.state;
                var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" +
                          address + "&key=" + key;

                var trustedurl = $sce.trustAsResourceUrl(url);
                return $http.get(trustedurl);
            };
            
            return geolocationService;            
            
        }])
    .factory('DarkSkyWeatherService',['$sce', '$http', 
        function($sce, $http){
            //work happens here
            
            var darkSkyWeatherService = {};
            
            //DarkSky API key
            var key = "9f86ba437f1f5657930e2a1b76a733cb";
            
            darkSkyWeatherService.getCurrentConditions = function(location){
                
                var url = "https://api.darksky.net/forecast/" +
                          key + "/" + location.lat + "," + location.lon;
                          
                console.log("DarkSky API URL:");
                console.log(url);
                
                var trustedurl = $sce.trustAsResourceUrl(url);
                return $http.jsonp(trustedurl, {jsonpCallbackParam: 'callback'});
                
            };
            
            return darkSkyWeatherService;
        }
    ]);
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    