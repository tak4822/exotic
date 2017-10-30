const Typo = require('../modules/typo');
const validate = require('../modules/validation');

module.exports = (app) => {
  //GET home
  app.get('/home', validate.isLoggedIn, (req, res) => {
    Typo.find({}, (err, result) => {
      res.render('admin/home', {user: req.session.username, data: result});
    });
  });

  //GET portfolio
  app.get('/typo/:id', validate.isLoggedIn, (req, res) => {
    Typo.findOne({"_id": req.params.id}, (err, result) => {
      res.render('admin/typo', {user: req.session.username, data: result});
    });
  });

  //GET  text contents
  app.get('/contents/:id', validate.isLoggedIn, (req, res) => {
    Typo.findOne({"_id": req.params.id}, (err, result) => {
      res.render('admin/contents', {user: req.session.username, data: result});
    })
  });

  //post contents
  app.post('/edit/contents/:id', (req, res, next) => {
    Typo.findOne({'_id': req.params.id}, (err, result) => {
      result.title = req.body.title;
      result.desctiption = req.body.desc;
      result.category = req.body.category;

      result.save((err) => {
        res.redirect('/typo/' + req.params.id);
      });
    });
  });

  //GET images
  app.get('/images/:id', validate.isLoggedIn, (req, res) => {
    Typo.findOne({"_id": req.params.id}, (err, result) => {
      res.render('admin/images', {user: req.session.username, data: result});
    });
  });

  //GET Clients
  app.get('/clients/:id', validate.isLoggedIn, (req, res) => {
    Typo.findOne({"_id": req.params.id}, (err, result) => {
      res.render('admin/clients', {user: req.session.username, data: result});
    });
  });

  //GET image upload
  app.get('/upload', validate.isLoggedIn, (req, res) => {
    res.render('admin/upload', {user: req.session.username})
  });
}
