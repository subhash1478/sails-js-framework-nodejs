 
module.exports = {
  tableName: 'vms_project_timesheet_mast',
 
  attributes: {
    
    timesheet_period_id:{type:'number',required:true},
    employee_id:{
      model: 'EmployeeMaster'
    },

    project_id:{
      model: 'ProjectMaster'
    },
    project_date:{type:'ref',columnType:'datetime'},
    start_time:{type:'string',required:true},
    end_time:{type:'string',required:true},
    tot_time:{type:'string',required:true},
    over_time:{type:'string',required:true},
    entry_date:{type:'ref',autoCreatedAt: true,columnType:'datetime'},
    updated_date:{type:'ref',autoCreatedAt: true,columnType:'datetime'},
    status:{type:'string',defaultsTo:'0', isIn: ['0','1','2','3']},
    approved_by_status:{type:'string',isIn: ['0','1','2']},
    is_view:{type:'string',isIn: ['0','1']},
    is_vendor_view:{type:'string',isIn: ['0','1']},
  
  },
};
