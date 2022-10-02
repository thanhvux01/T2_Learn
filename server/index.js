const express = require('express')
const morgan = require('morgan')
const path = require('path')
const app = express()
const cors = require('cors')
const port = 5000
const db = require('./config/db')
const route = require('./router')
const Course = require('./models/Course');


//connect
db.connect();



app.set('view engine', 'ejs');
//app.set('views',path.join(__dirname,'resource/views'))

app.use(morgan('tiny'))
app.use(express.static('public'))

console.log(path.join(__dirname,'public/'))


route(app);

app.listen(port, () => {
  console.log(` app listening on port ${port}`)
})

