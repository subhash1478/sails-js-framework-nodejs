  module.exports = {
    //
    // ──────────────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: G E T   A S S I G N E D   P R O J E C T : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────────────────
    //

    
    async getAssignedProject(req,res){
        var loggedUserId=req.current_user.id
        //console.log(loggedUserId);
        var projectdata=[]
        await AssignProjects.find({employee_id:loggedUserId}).select('project_id') 
        .then(function (result){
            if(!result) {
                return ResponseService.json(200, res, "no data found")
            }
            return result
        })
        .then(function (result){

            async.each(result,function(item,cb){
                ProjectMaster.findOne({id:item.project_id},function(err,Projectmasterresult){
                    console.log(Projectmasterresult);
                    if(Projectmasterresult){
                        projectdata.push(Projectmasterresult)

                        
                    }
                    cb()
                })
            },function(){
                //console.log('done');
                return ResponseService.json(200, res, "record fetch" ,projectdata)
            })
        })
        .catch(function(err){
            return ResponseService.json(500, res, err)
        });
    },
};
