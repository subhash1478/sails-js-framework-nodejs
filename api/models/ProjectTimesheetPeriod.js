module.exports = {
  tableName: 'vms_project_timesheet_period',
   attributes: {
    
  timesheet_id:{type:'string'},
  employee_id:{
    model: 'EmployeeMaster'
  },
  
  
  project_id:{
    model: 'ProjectMaster'
  },
    period:{type:'string',required:true},
  comment:{type:'string',required:true},
  sadmin_comment:{type:'string'},
  admin_comment:{type:'string'},
  approved_by_id:{type:'number'},
  approved_by:{type:'string'},
  entry_date:{type:'ref',autoCreatedAt: true,columnType:'datetime'},
  status:{type:'string',defaultsTo:'0', isIn: ['0','1','2','3']},
 
 
},
};
