const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=0e462b9d8b8b28bf6c2437d54e464cc8&query=${latitude},${longitude}`;

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, ' It is currently ' + body.current.weather_descriptions[0] + ' and ' + body.current.temperature + ' degress out there.' + 'Current humidity is ' + body.current.humidity + '%')
        }
    })
}
module.exports = forecast