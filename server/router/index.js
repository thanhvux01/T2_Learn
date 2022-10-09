const homepageRoute = require('./homepage')
const express = require('express')
const coursesRoute = require('./courses')
const userRoute = require("./user")
const cors = require("cors")

function route(app) {
   
   app.use('/api',homepageRoute)
   app.use('/api/khoahoc',coursesRoute)
   app.use('/api/auth',userRoute)
   /*goi den homepageroute , homepageroute se xuat ra 1 router */
   console.log("Routing Success")

}

module.exports = route;