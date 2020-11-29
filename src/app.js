const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');



const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rick Chiu'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Rick Chiu"
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Rick Chiu'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'Please provde a address' })
    }

    const address = req.query.address;
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, { temperature, feelslike } = {}) => {
            if (error) {
                return res.send(error);
            }
            res.send({
                forecast: `It is currently ${temperature} out, It feels like ${feelslike} degress out`,
                location,
                address
            })
        })
    });
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: "Rick Chiu"
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: "Rick Chiu"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})