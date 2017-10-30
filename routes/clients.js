const formidable = require('formidable');
const fs = require('fs');

const Typo = require('../modules/typo');

module.exports = (app, path, async) => {

  //post Clients
  app.post('/insert/clients/:id', function(req, res){
    async.waterfall([
      //uplod to files
      function(callback){
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
        form.on('end', function(err) {
          console.log('done');
          callback(err, files[0][1]["name"]);
        });
        form.parse(req);
      },
      //insert to database
      function(files, callback){
        Typo.update({
          '_id': req.params.id,
        },
        {
          $push: {clients: files}
        }, (err, count) => {

          if(err){
            return next(err);
          }
          callback(err, count);

          }
        );
      },
      function(callback){
        res.send({redirect: '/clients/'+ req.params.id});
      }
    ]);
  });

  //GET delete clients
  app.get('/delete/clients/:id/:name', (req, res) => {
    Typo.update({
      '_id': req.params.id,
    },{
      $pull: {clients: req.params.name}
    }, (err, result) => {
      if(err){
        console.log(err);
      }
      res.redirect('/clients/'+req.params.id);
    });
  });
}
