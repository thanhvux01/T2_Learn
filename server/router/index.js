
const express = require('express')
const coursesRoute = require('./courses')
const userRoute = require("./user")
const wordRoute = require("./word")
const cors = require("cors")

function route(app) {
   
   app.use('/api/khoahoc',coursesRoute)
   app.use('/api/auth',userRoute)
   app.use('/api/tuvung',wordRoute)
   /*goi den homepageroute , homepageroute se xuat ra 1 router */
   console.log("Routing Success")

}

module.exports = route;