const axios = require('axios');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?`;
    axios(url, {
        params: {
            "access_token": "pk.eyJ1Ijoicmljay1jaGl1IiwiYSI6ImNraGlwMmdjcjFkcXAyenBmdmdzNWtvaWYifQ.GTlVPETD3Riv8M3aaZhevA",
            "limit": "1"
        }
    }).then(({data}) => {
        if (data.features.length === 0) {
            // console.log(`This place doesn't exist!`)
            const errorMessage = "This place doesn't exist!"
            callback(errorMessage)
        } else {
            // console.log(res.data.features[0].place_name)
            callback(null,{
                longitude: data.features[0].center[0],
                latitude: data.features[0].center[1],
                location: data.features[0].place_name
            })
            // const location = res.data.features[0].place_name;
            // callback(latitude,longitude.location)
        }
    })
}


module.exports = geocode