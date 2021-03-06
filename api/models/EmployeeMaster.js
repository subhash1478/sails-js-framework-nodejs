module.exports = {
  tableName: 'vms_employee_master',
  datastore: 'default',

  primaryKey:'id',
  attributes: {
    id:{type:'number', autoIncrement: true,columnName:'employee_id'
  },
    vendor_id:{type:'number',required:true},
    admin_id:{type:'number',required:true},
    client_id:{type:'number',required:true},
    employee_email:{type:'string',required:true},
    employee_code:{type:'string',required:true},
    name_prefix:{type:'string',required:true},
    first_name:{type:'string',required:true},
    last_name:{type:'string',required:true},
    employee_type:{type:'string',required:true},
    employee_designation :{type:'string',required:true},
    employee_category:{type:'string',required:true},
    phone_ext:{type:'string',required:true},
    phone_no:{type:'number',required:true},
    fax_no:{type:'string',required:true},
    address:{type:'string',required:true},
    resume_file:{type:'string',required:true},
    file:{type:'string',required:true},
    pay_staff_file:{type:'string',required:true},
    w2_file:{type:'string',required:true},
    date_of_joining:{type:'string',required:true},
    employee_bill_rate:{type:'string',required:true},
    employee_pay_rate:{type:'string',required:true},
    emp_bill_rate_type:{type:'string',required:true},
    emp_pay_rate_type:{type:'string',required:true},
    employee_ot_rate:{type:'string',required:true},
    v_employee_bill_rate:{type:'string',required:true},
    status:{type:'string',required:true},
    block_status:{type:'string',required:true},
    entry_date:{type:'ref',required:true,columnType:'datetime'},
    updated_date:{type:'ref',required:true,columnType:'datetime'},
    forgot_password_otp:{type:'string'},
    is_delete:{type:'string',required:true},
    ProjectTimesheetPeriods:{
      collection: 'ProjectTimesheetPeriod',
      via: 'employee_id'
    },
    
   
  },
};
