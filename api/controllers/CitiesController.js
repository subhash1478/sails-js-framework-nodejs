 

module.exports = {
  async getCity(req,res){
    await Cities.find({}).limit(10)
         .exec(function (err, result) {

            if (err) {
                sails.log.debug(`Some error occured  ${err}`);
                return res.status(500).send({ error: `Some error occured ${err}` });
            }

            sails.log.debug('Success', JSON.stringify(result));
            return res.status(200).send({ success: 'Success',data:result });

        });
       
    },
    async addCity(req,res){
        var city = { name: 'west bengal', state_id: '1'  };

        await Cities.create(city)
        .exec(function (err, result) {

           if (err) {
               sails.log.debug('Some error occured ' + err);
               return res.status(500).send({ error:`Some error occured ${err}` });
           }

           sails.log.debug('Success', JSON.stringify(result));
           return res.status(200).send({ success: 'Success',data:result });

       });
      
   }
};

