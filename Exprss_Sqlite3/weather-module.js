module.exports = {
    apiKey: '9e9e4eefc93b5af91c70bd666c346dc8',
    apiURI: 'http://api.openweathermap.org/data/2.5/weather?q=Yongin,kr&units=metric&appid=',
    getWeather: function(callback) {
        var request = require('request');
        var miscView = require('./view5/misc');
        var weatherURI = this.apiURI + this.apiKey;
        request(weatherURI, function(error, response, data) {
            if (error) {
                throw error;
            }
            var result = JSON.parse(data);
            /* for (var item in result) {
                console.log(item.toString(), result[item]);
            } */
            var imgURL = `http://openweathermap.org/img/w/${result.weather[0].icon}.png`;
            //console.log(result.name, result.main.temp_min, result.main.temp_max, imgURL);
            var weather = miscView.weather(result.name, result.main.temp_min, result.main.temp_max, imgURL);
            callback(weather);
        });
    },
    weatherObj: function(callback) {
        var request = require('request');
        var miscView = require('./view5/misc');
        var weatherURI = this.apiURI + this.apiKey;
        request(weatherURI, function(error, response, data) {
            if (error) {
                throw error;
            }
            var result = JSON.parse(data);
            console.log(result);
            var table = miscView.weatherTable(result);
            var imgURL = `http://openweathermap.org/img/w/${result.weather[0].icon}.png`;
            var weather = miscView.weather(result.name, result.main.temp_min, result.main.temp_max, imgURL);
            callback(weather, table);
        });
    }
}