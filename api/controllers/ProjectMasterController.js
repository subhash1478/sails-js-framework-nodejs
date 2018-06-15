 
module.exports = {
    //
    // ──────────────────────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: G E T   P R O J E C T   F O R   E M P L O Y E E : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────────────────────────
    //

    
    async getProject(req,res){
        var request_data=req.query;
        if(!request_data.id ){
            return ResponseService.json(400 , res, "please enter project id")
        }
        await ProjectMaster.findOne({id:request_data.id})
        .then(function (result){
            if(!result) {
                return ResponseService.json(400  , res, "Project not found")
            }
           
           
            return ResponseService.json(200, res, "Record fetch ", result)
        })
        .catch(function(err){
            return ResponseService.json(500, res, err)
        });
    },

};

