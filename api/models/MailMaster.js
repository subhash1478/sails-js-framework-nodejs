module.exports = {
  tableName: 'vms_mail_master',
 
  attributes: {
    
    recipient_id:{model:'EmployeeMaster'},
    recipient_type:{type:'string',required:true},
    sender_id:{model:'EmployeeMaster'},
    sender_type:{type:'string',required:true},
    reply_id:{type:'string'},
    subject:{type:'string',required:true},
    message:{type:'string',required:true},
    entry_date:{type:'ref',required:true,columnType:'datetime'},
    is_deleted:{type:'string', isIn:['0','1']},
    status :{type:'string',isIn:['0','1']},
    is_view:{type:'string',isIn:['0','1']},
    
  },
};
