module.exports = {

 
  tableName: 'vms_assign_projects_to_employee',
   attributes: {
 
  vendor_id:{type:'number',required:true},
  employee_id:{
    model: 'EmployeeMaster'
  },
   project_id:{
    model: 'ProjectMaster'    
    },
  status:{type:'string'},
  is_view:{type:'string',required:true},
  is_vendor_view:{type:'string',required:true},
  is_employee_view:{type:'string',required:true},
  is_assigned:{type:'string',required:true},
  entry_date:{type:'ref', columnType:'datetime'},
  updated_date:{type:'ref', columnType:'datetime'},
   
},
};
