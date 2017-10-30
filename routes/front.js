const Typo = require('../modules/typo');

module.exports = (app) => {

  //GET index
  app.get('/', (req, res) => {
    res.render('front/home');
  });

  //GET packages
  app.get('/packages', (req, res) => {
    res.render('front/packages');
  });

  //GET contact
  app.get('/contact', (req, res) => {
    res.render('front/contact');
  });

  //GET portfolio
  app.get('/portfolio', (req, res) => {
    Typo.find({}, (err, result) => {
      res.render('front/portfolio', {data: result});
    });
  });

  //GET portfolio with id to go to detail
  app.get('/detail/:id', (req, res) => {
    Typo.findOne({"_id": req.params.id}, (err, result) => {
      res.render('front/detail', {data: result});
    })
  });

}
