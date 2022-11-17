
const express = require('express');
const coursesRoute = require('./courses');
const userRoute = require("./user");
const wordRoute = require("./word");
const storyRoute = require("./story");
const cors = require("cors")

function route(app) {
   
   app.use('/api/khoahoc',coursesRoute);
   app.use('/api/auth',userRoute);
   app.use('/api/tuvung',wordRoute);
   app.use('/api/stories',storyRoute);
   /*goi den homepageroute , homepageroute se xuat ra 1 router */
   console.log("Routing Success")

}

module.exports = route;