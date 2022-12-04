
const express = require('express');
const coursesRoute = require('./courses');
const authRoute = require("./auth");
const userRoute = require("./user")
const wordRoute = require("./word");
const storyRoute = require("./story");
const transferRoute = require("./transfer");

const cors = require("cors")

function route(app) {
   
   app.use('/api/khoahoc',coursesRoute);
   app.use('/api/auth',authRoute);
   app.use('/api/tuvung',wordRoute);
   app.use('/api/stories',storyRoute);
   app.use('/api/user',userRoute);
   app.use('/api/transfer',transferRoute);

   /*goi den homepageroute , homepageroute se xuat ra 1 router */
  

}

module.exports = route;