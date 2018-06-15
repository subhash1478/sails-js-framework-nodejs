module.exports = {
  tableName: 'vms_consultant_internal_files',
  attributes: {
    employee_id:{type:'string',required:true},
    docs_name:{type:'string',required:true},
    file:{type:'string',required:true},
    employee_internal_files:{type:'string',required:true},   
    status :{type:'string',isIn:['0','1']},
  },
};
