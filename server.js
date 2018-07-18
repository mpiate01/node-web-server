const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000
const app = express()

hbs.registerPartials(__dirname + '/views/partials')
//handlebars inizialisation
app.set('view engine','hbs')




//middleware - Esempio per salvare accessi al sito
app.use((req, res, next) => {
    const now = new Date().toString()
    const log =`${now}: ${req.method} ${req.url}`

    console.log(log)
    fs.appendFile('server-log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log')
        }
    })

    next()
})

//middleware maintenance mode
// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// })

//middleware    PER STATIC directory
app.use(express.static(__dirname + '/public'))    


hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear()  
})

hbs.registerHelper('screamIt', (text)=> {
    return text.toUpperCase()
})

//http route handler
app.get('/',(req, res) => {             // '/'  is route of the folder  ---  (req, res)=>{}  cosa mandi all user   --- req= request, res=response
    // res.send('<h1>Hello Express!</h1>')
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMsg: 'Ciao a tutti'
        //currentYear: new Date().getFullYear()        
    })  
})

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
        //currentYear: new Date().getFullYear()
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errMsg:'An error has occured'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})                        //set up port