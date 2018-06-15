 

module.exports = {
  
    async uploadDocument (req, res) {

        req.file('docfile').upload({
          // don't allow the total upload size to exceed ~10MB
          dirname: require('path').resolve(sails.config.appPath, 'assets/images'),

          maxBytes: 10000000
        },function whenDone(err, uploadedFiles) {
          if (err) {
            return res.serverError(err);
          }
      
          // If no files were uploaded, respond with an error.
          if (uploadedFiles.length === 0){
            return res.badRequest('No file was uploaded');
          }

          console.log(uploadedFiles);
          
      
          // Get the base URL for our deployed application from our custom config
          // (e.g. this might be "http://foobar.example.com:1339" or "https://example.com")
       
        
        });
      },
};

