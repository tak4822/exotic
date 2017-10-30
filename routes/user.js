const validation = require('../modules/validation');

module.exports = (app, passport) => {

  //GET login
  app.get('/login', (req,res) => {
    const errors = req.flash('error');
    res.render('admin/login',{messages: errors, hasErrors: errors.length > 0 });
  });

  //POST log in
  app.post('/login',validateLogin, passport.authenticate('local.login', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
  }));
  //GET sign up
  app.get('/signup', validation.isLoggedIn, (req, res) => {
    const errors = req.flash('error');
    const success = req.flash('success');
    res.render('admin/signup', {user: req.session.username, messages: errors, hasErrors: errors.length > 0, success: success, noErrors: success.length > 0 });
  });

  //POST sign up
  app.post('/signup', validate, passport.authenticate('local.signup', {
    //successRedirect: '/signup',
    failureRedirect: '/signup',
    failureFlash: true
  }), (req, res) => {
    req.flash('success', 'New user has been added.');
    res.redirect('/signup');
  });

  //GET logout
  app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy((err) => {
      res.redirect('/login');
    });
  });
}

//validation for sign up
function validate(req, res, next){
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();

  const errors = req.validationErrors();
  if(errors){
    const messages = [];
    errors.forEach((error)=>{
      messages.push(error.msg);
    });
    req.flash('error', messages);
    res.redirect('/signup');
  } else{
    return next();
  }
}

//validation for login
function validateLogin(req, res, next){
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();

  const errors = req.validationErrors();
  if(errors){
    const messages = [];
    errors.forEach((error)=>{
      messages.push(error.msg);
    });
    req.flash('error', messages);
    res.redirect('/login');
  } else{
    return next();
  }
}
