var md5 = require('md5');
module.exports = {
  
    //
    // ──────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: E M P L O Y E E   L O G I N : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────
    //

    
    async login(req,res){
        var request_data=req.body;
        if(!request_data.email || !request_data.password){
            return ResponseService.json(400 , res, "please enter email and password")
        }
        await Users.findOne({consultant_email:request_data.email,password:md5(request_data.password)})
        .then(function (user){
            if(!user) {
                return ResponseService.json(400  , res, "Invalid email or password")
            }
            if(user.status==="0"){
                return ResponseService.json(400  , res, "Account not activated",)
            }
            if(user.block_status==="0" || user.is_delete==="1"){
                return ResponseService.json(400  , res, "Account has been suspended",)
            }
            var responseData = {
                user: user,
                token: JwtService.issue({email:user.consultant_email,employee_id:user.employee_id})
            }
            return ResponseService.json(200, res, "Login Successful", responseData)
        })
        .catch(function(err){
            return ResponseService.json(500, res, err)
        });
    },
 
    //
    // ──────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: R E S E T   P A S S W O R D : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────
    //

    
    async resetpassword(req,res){
        var request_data=req.body;
        //return ResponseService.json(200, res, "Login Successful", request_data)
        if(!request_data.email || !request_data.password ){
            return ResponseService.json(403 , res, request_data+"please enter your password and confirm password")
        }        
//console.log(request_data.password);

        if(request_data.password != request_data.confirm_password){
            return ResponseService.json(403 , res, "Your password and Confirm password not matched")
        }

        await Users.update({consultant_email:request_data.email})
        .set({password:md5(request_data.password)}).fetch()

        .then(function(result){

            return ResponseService.json(200, res, "Your password updated successfully", result)
        })

        .catch(function(err){
            return ResponseService.json(500, res, err)
        });


        
    },
    //
    // ────────────────────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: E M P L O Y E E   P R O F I L E   U P D A T E : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────────────────────────
    //

    

    async profileUpdate(req,res){
        var request_data=req.body;
        var loggedUserId=req.current_user.id
        var data={
            first_name:request_data.first_name,
            last_name:request_data.last_name,
            employee_designation:request_data.employee_designation,
            phone_ext:request_data.phone_ext,
            phone_no:request_data.phone_no,
            fax_no:request_data.fax_no,
            address:request_data.address
        
        }  

        await EmployeeMaster.update({id:loggedUserId})
        .set(data).fetch()

        .then(function(result){

            return ResponseService.json(200, res, "Your profile updated successfully", result)
        })

        .catch(function(err){
            return ResponseService.json(500, res, err)
        });


        
    },

   
    //
    // ────────────────────────────────────────────────────────── I ──────────
    //   :::::: C H E C K   O T P : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────
    //

    
    async checkOtp(req,res){
        var request_data=req.body;
        if(!request_data.email || !request_data.otp){
            return ResponseService.json(403 , res, "please enter your correct otp")
        }
        await EmployeeMaster.findOne({employee_email:request_data.email,forgot_password_otp:request_data.otp})
        .then(function (user){
            if(!user){
                return ResponseService.json(200, res, "OTP not matched", user)
            }

            return ResponseService.json(200, res, "OTP check Successful", user)
        })
        .catch(function(err){
            return ResponseService.json(500, res, err)
        });
    },

    
    
  
};
