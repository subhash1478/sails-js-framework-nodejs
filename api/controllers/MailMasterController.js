 
module.exports = {

    //
    // ──────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: G E T   I N B O X   R E C O R D : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────────
    //

    
    async getInbox(req,res){
        var request_data=req.body;
        var loggedUserId=req.current_user.id
        var recipienttype='employee'
        await MailMaster.find({recipient_id:loggedUserId,recipient_type:recipienttype}).sort('entry_date DESC')
        .then(function(result){
            if(!result){
                return ResponseService.json(200, res, 'No data found', result)  
            }
            return ResponseService.json(200, res,' Record Fatched', result)
        })
        .catch(function(err){
            return ResponseService.json(500, res, err)
        });
    },

    //
    // ──────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: G E T   S E N D   M E S S A G E : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────────
    //

    
    async getSenditem(req,res){
        var request_data=req.body;
        var loggedUserId=req.current_user.id
        var recipienttype='employee'
        await MailMaster.find({sender_id:loggedUserId}).sort('entry_date DESC')
        .then(function(result){
            if(!result){
                return ResponseService.json(200, res, 'No data found', result)  
            }
            return ResponseService.json(200, res, 'Send Record Fatched', result)
        })
        .catch(function(err){
            return ResponseService.json(500, res, err)
        });
    },


    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: C O M P O S E   M A I L : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //

    
    async sendMail(req,res){
        var request_data=req.body;
        var loggedUserId=req.current_user.id
        var data={
            recipient_id:loggedUserId,
            recipient_type:request_data.recipient_type,
            sender_id:loggedUserId,
            sender_type:'employee',
            subject:request_data.subject,
            message:request_data.message,
            entry_date : new Date(),
            is_deleted : '0',
            status : '0'
        }
console.log(data);


        await MailMaster.create(data).fetch() 
        .then(function(result){
            return ResponseService.json(200, res, 'Send success', result)
        })
        .catch(function(err){
            return ResponseService.json(500, res, err)
        });
    }
};
