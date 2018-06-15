module.exports = {
  tableName: 'vms_consultant_files',
  attributes: {
    consultant_id:{type:'number',required:true},
    form_no:{type:'number',required:true},
    form_name:{type:'string',required:true},
    form_data :{type:'string'},
    file :{type:'string'},
    form_status :{type:'string',isIn:['0','1']},
    admin_form_status :{type:'string',isIn:['0','1']},
    sa_admin_ucsic_approval :{type:'string',isIn:['0','1']},
    admin_ucsic_approval :{type:'string',isIn:['0','1']},
    is_superadmin_view :{type:'string',isIn:['0','1']},
 
  },
};
