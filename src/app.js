const express = require('express')
const path = require('path')
const hbs = require("hbs");
const geocode = require('./utils/geocode-module')
const forecast = require('./utils/forecast-module')

const app = express()

console.log(__dirname,"\n",__filename)

// Define path for the Express config
const publicDirPath = path.join(__dirname, "../public")
const viewHbsPath = path.join(__dirname,'../views/pages')
const partialsPath = path.join(__dirname, '../views/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewHbsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve  
app.use(express.static(publicDirPath))  

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        author: 'NhanTD'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        author:'NhanTD',
        imgTag : `<img src="./img/hoanho.png"/>`,
        people: [
            "Yehuda Katz",
            "Alan Johnson",
            "Charles Jolley",
        ],
        data : {
            url: './img/hoanho.png'
        },
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        helpMess : 'Do you have any question?',
        author: 'NhanTD'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404error', {
        title: '404',
        message : 'Help acticle not found',
        author: 'NhanTD'
    })
})

// app.get('/', (req, res) => {
//     // {text}
//     //res.send("Hello express !!!")

//     // {html}
//     res.send("<h1>Hello express!</h1>")
// })

// app.get('/about', (req, res) => {
//     res.send("<h1>This is about page !!!</h1>")
// })

// app.get('/help', (req, res) => {
//    // res.send("This is help page !!!")
//    res.send({
//        name : 'Tran Dai Nhan',
//        age : 25,
//        job: 'SE'
//    })
// })

app.get('/weather', (req, res) => {
    const {address} = req.query
    if( address == undefined || address.trim() == '' ) {
        res.send({
            error: 'You must provide a valid address'
        })
    } else {
        geocode(address, (err, resultGeocoded) => {
            if (err) {
                res.send({
                    error: err
                })
            } else {
                forecast(resultGeocoded, (err, resultForecast) => {
                    console.log('data ' + resultForecast)
                    if(err) {
                        res.send({
                            error: err
                        })
                    } else {
                        res.send({
                            location: resultGeocoded.location,
                            forecast: resultForecast,
                            address: address,
                            error: err
                        })
                    }
                })
            }
        })
    }
})

app.get('*', (req, res) => {
    res.render('404error', {
        title: '404',
        message : 'Error not found',
        author: 'NhanTD'
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000")
})