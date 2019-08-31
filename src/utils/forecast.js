const request = require('request')

const forecast = (longitude, latitude,callback) => {

    url = 'https://api.darksky.net/forecast/3376c46325cc169169b2d5b39752758a/' + encodeURIComponent(latitude)
             + ',' + encodeURIComponent(longitude);

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect to Web services')
        } else if (body.error) {
            callback('unable to find location')
        } else {
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature
                + ' out.There is ' + body.currently.precipProbability + '% chance of rain'
            )
        }
    })
}

module.exports = forecast