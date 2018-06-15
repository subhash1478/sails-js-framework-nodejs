 module.exports = {
    //
    // ──────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: A D D   T I M E   S H E E T : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────
    //
    async addTimeSheet(req,res){
        var loggedUserId=req.current_user.id
        console.log(loggedUserId);
        var request_data=req.body;
        var datetime=request_data.datetime
        var timevalue=[]
        for (let index = 0; index < datetime.length; index++) {
            timevalue.push(datetime[index].date);
        }
        console.log(timevalue);
        await ProjectTimesheetMast.find({
            project_date:[timevalue],
            employee_id:loggedUserId,
            project_id:request_data.project_id,
        }).select('project_date') 
        .then(function (user){
            if(user.length<1){
                return user
            }else{
                return ResponseService.json(200, res, "date already added fetched", user)
            }
        })
        .then(function (user){
            ProjectTimesheetPeriod.find({
                project_id:request_data.project_id,
                employee_id	:loggedUserId
            })
            .limit(1).sort('id DESC')
            .then(function(timesheet){
                return timesheet
            })
            .then(function(timesheet1){
                if(timesheet1.length<1){
                    r='000'
                }else{
                    var pro=request_data.project_code       
                    console.log(timesheet1[0].timesheet_id);
                    var s=timesheet1[0].timesheet_id
                    var r=s.substring(s.length,pro.length)
                }
                var value=parseInt(r)+1
                return new Array(3 + 1 - (value + '').length).join('0') + value;
            })
            .then(function(timesheetidvalue){
                timesheetidvalue=Math.floor(Math.random()*(999-100+1)+100)
                var lastindex=(timevalue.length)-1
                var data={
                    project_id: request_data.project_id,
                    employee_id: loggedUserId,
                    timesheet_id:request_data.project_code+timesheetidvalue,                    
                    period:timevalue[0]+'~'+timevalue[lastindex],
                    comment:request_data.comment,
                    entry_date: new Date()
                }
                ProjectTimesheetPeriod.create(data).fetch()
                .then(function(result){
                    async.each(datetime,function(item,cb){
                        var data={
                            timesheet_period_id:result.id,
                            project_id:request_data.project_id,
                            employee_id:loggedUserId,
                            project_date:item.date,
                            start_time:item.starttime,
                            end_time:item.endtime,
                            tot_time:'8.00',
                            over_time:'8.00',
                            entry_date:new Date(),
                        }
                        ProjectTimesheetMast.create(data)
                        .then(function(result){
                            cb()
                        })
                        console.log(data);
                    },function(){
                        var obj={
                            success:true,
                            result
                        }
                        return ResponseService.json(200, res, "added fetched", obj)
                        console.log('done');
                    })
                })
            })
        })
        .catch(function(err){
            sails.log.debug(`Some error occured request_data.${err}`);
            return ResponseService.json(500, res, err)
        });
    },
    //
    // ──────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: G E T   T I M E   S H E E T : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────
    //
    async getTimeSheet(req,res){
        var loggedUserId=req.current_user.id
        var request_data=req.query;
        await ProjectTimesheetPeriod.find({
            employee_id:loggedUserId,project_id:request_data.id
        }).populate('employee_id')
        .populate('project_id').sort('id DESC')
        .then(function (user){
            if(user.length<1){
                return ResponseService.json(200, res, "no data found", user)
            }else{
                return ResponseService.json(200, res, "fetched", user)
            }
        })
        .catch(function(err){
            sails.log.debug(`Some error occured request_data.${err}`);
            return ResponseService.json(500, res, err)
        });
    },
};
