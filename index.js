const express   =require('express')
const bodyParser  = require('body-parser')
const expressEdge = require('express-edge')
const mongoose    = require('mongoose')
const connectMongo = require('connect-mongo')
const expressSession = require('express-session')
const bcrypt = require('bcrypt')


const registerUser = require('./controllers/registerUsers')
//const User         = require('./database/models/User')
const loginUser    = require('./controllers/loginUsers')

const MongoStore = connectMongo(expressSession)

const app = express()

app.use(expressSession({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true}))

mongoose.connect('mongodb://localhost/travelBlog', { useNewUrlParser : true});

app.use(express.static('public'))

app.use(expressEdge)
app.set('views', `${__dirname}/pages`)

const auth = (req, res, next)=> {
    if (req.session.user){
        return next()
    } 
    return res.redirect('/login')
}

const redirectIfAuth = (req, res, next) => {
    if (!req.session.user){
       return next(); 
    }
    return res.redirect('/profile')
}
app.get('/',  (req, res)=> {
    res.render('home')
})

app.get('/register', redirectIfAuth, (req, res)=>{
    res.render('signup')
})


app.get('/profile', auth, (req, res)=>{
    res.render('profile', req.session.user)
})

app.post('/register', registerUser, (req, res)=> {
    console.log(req.body)
    res.redirect('/login')
})
//     
// })

app.get('/login', (req,res)=>{
    res.render('login')
})
app.post('/login', loginUser)

app.get('/profile', auth, (req, res)=>{
    res.render('profile', req.session.user)
})

app.get('/logout', auth, (req, res)=>{
    delete req.session.user
    res.redirect('login')
})


app.get('*', (req, res)=>{
    res.status(404).send('Sorry your requested page was not found')
})



app.listen(5000, () => console.log('Server listening on port 5000'))