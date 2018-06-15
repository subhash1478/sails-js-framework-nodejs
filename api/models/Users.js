module.exports = {
  tableName: 'vms_employee_login_details',
 
  attributes: {
     
    admin_id:{type:'number',required:true},
    vendor_id:{type:'number',required:true},
    employee_id:{type:'number',required:true},
    consultant_email:{ type: 'string',unique: true,required: true,isEmail: true},
    password:{type:'string',required:true},
    change_password:{type:'string',required:true},
    status:{type:'string',required:true},
    block_status:{type:'string',required:true},
    entry_date:{type:'ref', columnType:'datetime'},
    updated_date:{type:'ref', columnType:'datetime'},
    is_delete:{type:'string',required:true},
    
    userId: {
      collection: 'Users',
      
    }
  },
};
