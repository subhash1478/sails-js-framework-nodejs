/**
* Route Mappings
* (sails.config.routes)
*
* Your routes tell Sails what to do each time it receives a request.
*
* For more information on configuring custom routes, check out:
* https://sailsjs.com/anatomy/config/routes-js
*/

module.exports.routes = {
  
  
  '/': {
    view: 'pages/homepage',
    
  },
  
  //
  // ──────────────────────────────────────────────────────────── I ──────────
  //   :::::: U S E R   R O U T E : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  'POST /api/login': 'UsersController.login',
  'GET /api/get-user': 'EmployeeMasterController.getUser',
  'GET /api/get-assigned-project': 'AssignProjectsController.getAssignedProject',
  'POST /api/forget-password': 'EmployeeMasterController.forgetPassword',
  'POST /api/add-time-sheet': 'ProjectTimesheetPeriod.addTimeSheet',
  
  'POST /api/reset-password': 'UsersController.resetpassword',
  'POST /api/check-otp': 'UsersController.checkOtp',
  'POST /api/profile-update': 'UsersController.profileUpdate',
  'GET /api/get-inbox': 'MailMasterController.getInbox',
  'GET /api/get-senditem': 'MailMasterController.getSenditem',
  'POST /api/compose': 'MailMasterController.sendMail',
  
  'GET /api/get-project': 'ProjectMasterController.getProject',
  
  'GET /api/get-timesheet': 'ProjectTimesheetPeriodController.getTimeSheet',
  'GET /api/get-timesheet-interval': 'ProjectTimesheetMastController.getTimeSheetInterval',

  'GET /api/get-consultant-document': 'ConsultantDocumentController.getConsultantDocuments',
  'GET /api/get-internal-file': 'InternalFileController.getInternalFile',
  'POST /api/upload-document': 'ConsultantFileController.uploadDocument',
   

  // 'GET /api/city': 'CitiesController.getCity',
  // 'POST /api/addcity': 'CitiesController.addCity',
  
  
  
};
