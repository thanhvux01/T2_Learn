class HomeController {

      index(req,res) {
         res.send("Hi")
               
      }

}

const HomeControllerObject = {
    index : (req,res) => {res.render('pages/home')}
    /*mac dinh tu nhan thu muc views */
}

module.exports = HomeControllerObject