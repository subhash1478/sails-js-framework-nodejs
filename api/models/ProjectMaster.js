module.exports = {
  tableName: 'vms_project_master',
   attributes: {
   
  project_code:{type:'number',required:true},
  admin_id:{type:'number',required:true},
  vendor_id:{type:'number',required:true},
  project_type:{type:'string',required:true},
  project_name:{type:'string',required:true},
  project_details:{type:'string',required:true},
  client_name:{type:'string',required:true},
  start_date:{type:'ref',columnType:'datetime'},
  end_date:{type:'ref',columnType:'datetime'},
  approx_total_time:{type:'string'},
  monthly_payment:{type:'number'},
  entry_date:{type:'ref',columnType:'datetime'},
  updated_date:{type:'ref',columnType:'datetime'},
  status:{type:'string'},
  is_deleted:{type:'string'},
  is_vendor_view:{type:'string'},
  
  ProjectTimesheetPeriods:{
    collection: 'ProjectTimesheetPeriod',
    via: 'project_id'
  }
},
};
