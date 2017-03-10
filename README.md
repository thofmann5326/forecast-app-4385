# forecast-app-4385

This app is made to look up the weather at a location and display relivent info 
and a mpa of that place. It can also add Locations to it.

## Features

* Allow user to input a new city
* Allow user to select the from a list of cities
* Display map
* Display relivent info

## Code Example

```
<script src="angular.js"></script>
		<script src="app.js"></script>	 
		
		<div ng-controller="WeatherServiceController as wsc">
		    
		    <h1>Weather App</h1>
		    
		    <h2>Select City</h2>
            <select ng-model="wsc.selected_city"
                    ng-options="unit.name for unit in wsc.cities"
                    ng-change="wsc.selectTheCity()"
                    ng-init="wsc.selected_city"></select>
            <h2>Add City</h2>
            <div>        
                <input value="" type="text" placeholder="City Name" ng-model="wsc.cityname">
                <input value="" type="text" placeholder="Url Name(City name)" ng-model="wsc.cityurl">
                <input value="" type="text" placeholder="State name" ng-model="wsc.statename">
                <input value="" type="text" placeholder="Latitude" ng-model="wsc.citylat">
                <input value="" type="text" placeholder="Longitude" ng-model="wsc.citylon">
                
                <input type="button" value="update" ng-click="wsc.addCity(wsc.cityname,
                                                                          wsc.cityurl,
                                                                          wsc.statename,
                                                                          wsc.citylat,
                                                                          wsc.citylon)">
            </div>
            <!--
            <p>Time: {{wsc.observation_time}}</p>
            <p>Temperature: {{wsc.ds_temperature}}</p>
            <p>Dewpoint: {{wsc.ds_dewpoint}}</p>
            <p>Wind Direction: {{wsc.ds_windBearing}}</p>
            <p>Wind Speed: {{wsc.ds_windSpeed}}</p>
            -->
            

            <my-conditions-special></my-conditions-special>
            
            <p><img src="{{wsc.summaryIcon}}" height="100" width="100"/></p>
```