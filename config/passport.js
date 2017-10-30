const passport = require('passport');
const User = require('../modules/user');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use('local.signup' , new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done) => {
    User.findOne({'username':username}, (err, user) => {
        if(err){
            return done(err);
        }
        if(user){
            return done(null, false, req.flash('error', 'The User Already Exist.'));
        }
        const newUser = new User();
        newUser.username = req.body.username;
        newUser.password = newUser.encryptPassword(req.body.password);

        newUser.save((err) => {
            return done(null, newUser);
        });
    })
}));


passport.use('local.login' , new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done) => {
    User.findOne({'username':username}, (err, user) => {
        if(err){
          return done(err);
        }
        const messages = [];
        if(!user) {
          messages.push('User name is invalid');
          return done(null, false, req.flash('error', messages));
        }
        if(!user.validPassword(password)) {
            messages.push('Password is invalid');
            return done(null, false, req.flash('error', messages));
        }
        req.session.username = user.username;
        return done(null, user);
    })
}));
