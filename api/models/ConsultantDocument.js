module.exports = {
  tableName: 'vms_consultant_documents',
  attributes: {
    document_name:{type:'string',required:true},
    file:{type:'string',required:true},
    required_for:{type:'string',required:true},
    status :{type:'string',isIn:['0','1']},
  },
};
