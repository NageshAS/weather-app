const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmFnZXNoYXMiLCJhIjoiY2p6dTNhcTdjMGIxOTNobXh5MmM3eHduNyJ9.m6R3tYY67zCpGRMoj8-CNg&limit=1'

    request({ url, json: true}, (error, {body}) =>{
        if (error) {
            callback('unable to connect to Web services',undefined)
        } else if (body.features.length === 0) {
            callback('unable to find location',undefined)
        } else {
            callback(undefined,{
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                place : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode