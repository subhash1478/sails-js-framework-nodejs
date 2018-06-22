 module.exports = {
    //
    // ────────────────────────────────────────────────────────── I ──────────
    //   :::::: E M A I L  L I S T : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────
    //

    


    async emailList(req,res){
          await EmployeeMaster.find({}) 
        .then(function (user){
            return ResponseService.json(200, res, "record fetched", user)
        })
        .catch(function(err){
            sails.log.debug(`Some error occured  ${err}`);
            // return ResponseService.json(500, res, err)
        });
    },











    //
    // ──────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: G E T   U S E R   D E T A I L S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────────
    //

    
    async getUser(req,res){
        console.log(req.current_user)
        var loggedUserId=req.current_user.id
        await EmployeeMaster.findOne({id:loggedUserId}) 
        .then(function (user){
            return ResponseService.json(200, res, "record fetched", user)
        })
        .catch(function(err){
            sails.log.debug(`Some error occured  ${err}`);
            // return ResponseService.json(500, res, err)
        });
    },
    //
    // ──────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: F O R G E T  P A S S W O R D : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────
    //
    async forgetPassword(req,res){
        var request_data=req.body;
        if(!request_data.email){
            return ResponseService.json(400 , res, "Please enter email")
        }
        await EmployeeMaster.findOne({employee_email:request_data.email})
        .then(function (user){
            if(!user) {
                return ResponseService.json(400  , res, "Invalid email")
            }
            return user
        })
        .then(function (userdetails){
            var forgot_password_otp=  Math.random().toString(36).substring(2).toUpperCase();
            console.log(forgot_password_otp);
            EmployeeMaster.update({employee_email:request_data.email})
            .set({forgot_password_otp:forgot_password_otp
            }).exec(function(err,result){
                console.log(err);
    return ResponseService.json(200  , res,`OTP sent successfuly.Please check your email address.
                `,result)
            })  
        })
        .catch(function(err){
            return ResponseService.json(500, res, err)
        });
    }
};
