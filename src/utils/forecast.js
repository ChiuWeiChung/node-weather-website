const axios = require('axios');

const forecast = (latitude, longitude, callback) => {
    const weatherStackUrl = 'http://api.weatherstack.com/current';
    axios.get(weatherStackUrl, {
        params: {
            "access_key": 'c9d89ca32d34db3c489afad6f551383c',
            "query": latitude, longitude
        }
    }).then(({ data }) => {
        if (data.error) {
            callback(data.error)
        } else {
            const temperature = data.current;
            callback(null, temperature);
        }
    });
};


module.exports = forecast