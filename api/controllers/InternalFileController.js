 
module.exports = {
 
    //
    // ────────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: G E T   I N T E R N A L   F I L E : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────────────
    //

    


    async getInternalFile(req,res){

        var loggedUserId=req.current_user.id

        await InternalFile.find({employee_id:loggedUserId}) 
        .then(function(result){
            if(!result || result.length<1){
                return ResponseService.json(200, res, 'No data found', result)  
            }


            return ResponseService.json(200, res,' Record Fetched', result)
        })
        .catch(function(err){
            return ResponseService.json(500, res, err)
        });
    },


};

