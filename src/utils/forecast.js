const request = require('request')

const forecast = (longitude, latitude,callback) => {

    url = 'https://api.darksky.net/forecast/3376c46325cc169169b2d5b39752758a/' + encodeURIComponent(latitude)
             + ',' + encodeURIComponent(longitude)+'?lang=kn&units=si';

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect to Web services')
        } else if (body.error) {
            callback('unable to find location')
        } else {
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature
                + ' degree out there.There is ' + body.currently.precipProbability + '% chance of rain'
                + '\n Highest Temperature: ' + body.daily.data[0].temperatureHigh + 'degree'
                + '\n Lowest Temperature: ' + body.daily.data[0].temperatureLow + 'degree'
            )
        }
    })
}

module.exports = forecast