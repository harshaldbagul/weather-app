const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const PORT = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Harshal'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Harshal',
        message: 'This is some helpful text'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About ',
        name: 'Harshal'
    })
})

app.get('/home', (req, res) => {
    res.send('Welcome to Home!')
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'address is missing'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        } else {
            forecast(latitude, longitude, (error, forecastdata) => {
                if (error) {
                    return res.send({ error })
                }
                else {
                    return res.send({
                        forecast: forecastdata,
                        location,
                        address: req.query.address
                    })
                }
            })
        }
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Harshal'
    })
})

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT)
})

