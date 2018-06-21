module.exports = {
    //
    // ──────────────────────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: G E T   C O N S U L T A N T   D O C U M E N T S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────────────────────────
    //
    async getConsultantDocuments(req,res){
        var loggedUserId=req.current_user.id;


        var type=(req.current_user.vendor_id===0)?'E':'C';
        await ConsultantDocument.find({
            required_for: { 'like' : `%${type}%` }
        }).sort('id ASC')
        .then(function (user){
            var result=[]
            async.each(user,function(item,cb){
                console.log('item.id',item.id);
                
                ConsultantFile.findOne({consultant_id:loggedUserId,form_no:item.id})
                .then(function(response){
                    var newval={}

                     if(response){
                        newval['doc_details']= item;
                        newval['userfiles']= response;
                        newval['file']= `${sails.config.custom.webapiurl}/uploads/${item.file}`;
                     }else{
                        newval['doc_details']= item;
                        newval['userfiles']= null;
                        
                        

                    }
                    result.push(newval)
                    cb()
                    //   item.consultantfile=`${sails.config.custom.webapiurl}/uploads/${item.file}`
                  
                })


            
            },function(){
                return ResponseService.json(200, res, "record fetched", result)
            })
        })
        .catch(function(err){
            return ResponseService.json(500, res, err)
        });
    },
};
