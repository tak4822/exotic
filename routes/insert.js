const formidable = require('formidable');
const fs = require('fs');
const Typo = require('../modules/typo');
const validate = require('../modules/validation');

module.exports = (app, path) => {

  //GET  insert
  app.get('/insert', validate.isLoggedIn, (req, res) => {
    res.render('admin/insert', {user: req.session.username});
  });

  //POST insert
  app.post('/insert', (req, res) => {
    const newTypo = new Typo();
    newTypo.title = req.body.title,
    newTypo.category = req.body.category,
    newTypo.description = req.body.desc,
    newTypo.clients = req.body.clients,
    newTypo.thumb = req.body.thumb,
    newTypo.images = req.body.images,
    newTypo.files = req.body.fontFile,

    newTypo.save((err) => {
      if(err) {
        console.log(err);
      }
      console.log(newTypo);
      res.redirect('/home');
    });
  });

  app.post('/upload', function(req, res){
    const form = new formidable.IncomingForm(),
    files = [],
    fields = [];

    form.uploadDir = path.join(__dirname,'../public/uploads');

    form.on('field', function(field, value) {
      fields.push([field, value]);
    })
    form.on('file', function(field, file) {
      files.push([field, file]);
      fs.rename(file.path, path.join(form.uploadDir, file.name), (err) => {
        if(err){
            throw err
        }
        console.log('File has been renamed');
      });
    })
    form.on('error', (err) => {
      console.log('AN error occured', err);
    })
    form.on('end', function() {
        console.log('done');
    });
    form.parse(req);
  });
}
