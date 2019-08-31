const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

console.log(__dirname)
console.log(path.join(__dirname + '/../public'))

const publicDirPath = path.join(__dirname + '/../public')
const viewsPath = path.join(__dirname + '/../templates/views')
const partialsPath = path.join(__dirname + '/../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirPath))

hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nagesh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Nagesh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'You will find help here',
        name: 'Nagesh'
    })
})


app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error:'you must provide address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,place}={})=>{

        if(error){
           return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{

            if(error){
                return res.send({error})
            }

            return res.send({
                address: req.query.address,
                place,
                forecast: forecastData
            })
        })
    })
})


// 404 pages
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'ERROR 404',
        name: 'Nagesh',
        errorMessage: 'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'ERROR 404',
        name: 'Nagesh',
        errorMessage: 'Page not found'
    })
})



// // app.com
// app.get('',(req,res)=>{
//     res.send('<h1>Weather</h1>')
// })

// // app.com/help
// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'Nagesh',
//         age:26
//     },{
//         name:'Shrad',
//         age:25
//     }])
// })

// // app.com/about
// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1>')
// })

// // app.com/weather
// app.get('/weather',(req,res)=>{
//     res.send({
//         location: 'Bengulru',
//         forecast:'25 degree out there.'
//     })
// })

app.listen(3000, () => {
    console.log("App webserver is up on port 3000")
})