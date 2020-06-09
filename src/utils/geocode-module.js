const request = require('request')
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibmhhbnRkIiwiYSI6ImNrYjZkZTU5ZzFkeTUyc3A3dm5kNzJ6enQifQ.dyEEpI7_AobGpPw04hGHaw`
    request({url: url, json: true}, (error, response, body) => {
        if(error) {
            callback("Unable to connect to server", undefined)
        } else if(response.body.features.length === 0) {
            callback("Unable to find location. Try another search", undefined)
        } else {
            const lat = response.body.features[0].center[0]
            const long = response.body.features[0].center[1]
            const location = response.body.features[0].place_name
            callback(undefined, {lat, long, location})
        }
    })
}
module.exports = geocode