module.exports = {
  ensureAuthenticated: function(req,res,next){
    if (req.isAuthenticated()) {
      return next();
    }
    //req.flash('error_msg','Please log in to view the website');
    res.redirect('/admin');
  }
}
