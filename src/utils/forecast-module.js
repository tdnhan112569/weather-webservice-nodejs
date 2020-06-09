const request = require('request')
const forecast = ( {lat, long, location}, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=3bff8a2895817b7d9824df8fc1e60f97&query=${lat},${long}&units=f`
    //console.log(url)
    request({url: url, json: true}, (error, response, body) => {
        if(error) {
            callback("Unable to connect to server", undefined)
        } else if (body.error) {
            callback("Unable toParam is not valid", undefined)
        } else {
            const {temperature , feelslike, weather_descriptions} = response.body.current
            let mess = ''
            if(weather_descriptions[0]) {
                mess = `${weather_descriptions[0]}. It is currently ${temperature} degress out. It feels like ${feelslike} degress out.`
            } else {
                mess = `It is currently ${temperature} degress out. It feels like ${feelslike} degress out.`
            }
           callback(undefined,mess)
        }
    })
}
module.exports = forecast