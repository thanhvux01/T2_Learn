var homepageRoute = require('./homepage')
const express = require('express')
var coursesRoute = require('./courses')
var userRoute = require("./user")
var cors = require("cors")

function route(app) {
   app.use(cors({  
      origin: ["http://localhost:3000"],
      credentials: true }));
      app.use(express.json());
      app.use(express.urlencoded({ extended: false }));
   app.use('/',homepageRoute)
   app.use('/khoahoc',coursesRoute)
   app.use('/dangky',userRoute)
   /*goi den homepageroute , homepageroute se xuat ra 1 router */
   console.log("Routing Success")

}

module.exports = route;