const express = require('express')
const morgan = require('morgan')
const path = require('path')
const app = express()
const cors = require('cors')
const port = 5000
const db = require('./config/db')
const route = require('./router')
const io = require("socket.io")(5050,{cors:{
  origin: ["http://localhost:3000"]
}});
const cookieParser = require('cookie-parser');
const { Socket } = require('socket.io')
require("dotenv").config();
//connect
db.connect();
app.use(cookieParser())
app.use(cors({  
  origin: ["http://localhost:3000"],
  credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false,limit: '50mb',parameterLimit: 1000000}));

app.set('view engine', 'ejs');
//app.set('views',path.join(__dirname,'resource/views'))

app.use(morgan('tiny'))
app.use(express.static('public'))
console.log(path.join(__dirname,'public/'))

io.on("connection",socket => {
    console.log(socket.id);
    socket.on("send-message",message=>{
      io.emit("receive-message",message);
      console.log(message);
    })
})

route(app);
app.listen(port, () => {
  console.log(` app listening on port ${port}`)
})

