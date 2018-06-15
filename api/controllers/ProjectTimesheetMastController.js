 

module.exports = {
    //
    // ──────────────────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: G E T   T I M E S H E E T   I N T E R V A L : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────────────────────
    //

    
    async   getTimeSheetInterval(req,res){
        var loggedUserId=req.current_user.id
        var request_data=req.query;

        await ProjectTimesheetMast.find({
            timesheet_period_id:request_data.id,
            employee_id	:loggedUserId
        }).populate('employee_id')
        .then(function (user){
            if(user.length<1){
                return user
            }else{
                return ResponseService.json(200, res, "fetched", user)
            }
        })
        .catch(function(err){
            sails.log.debug(`Some error occured request_data.${err}`);
            return ResponseService.json(500, res, err)
        });
        
    }


};

