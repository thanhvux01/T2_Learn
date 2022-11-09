const jwt = require('jsonwebtoken');

 const verifyToken = (req,res,next) => {
      const token = req.cookies.access_ticket;
      if(!token){

        return res.status(401).json({error:"not authenticated"})     
      }
      jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err)
        return res.status(403),json({error:"your token is not valid"})
        req.user = user;
        next();
      })
}


module.exports = {verifyToken}