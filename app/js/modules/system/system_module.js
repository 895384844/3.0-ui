define([
    'angular',
    './controllers/SystemScopeCtrl',
    './controllers/SystemUserCtrl',
    './controllers/SystemUserEditCtrl',
    './controllers/SystemRoleCtrl',
    './controllers/SystemRoleEditCtrl',
    './controllers/SystemConfigureCtrl',
    './controllers/SystemLogCtrl',
    './controllers/SystemLicenseCtrl',
    './controllers/SystemEditCtrl',
    './controllers/SystemUserRoleCtrl',
    './controllers/SystemResetPwdCtrl',
    './controllers/SystemDownloadCtrl',
    './controllers/SystemRolePowerCtrl',
    './controllers/SystemRoleMenuCtrl',
    './controllers/SystemLicenseImportCtrl',
    './controllers/SystemConfigureEditCtrl',
    './controllers/SystemConfigureFormCtrl',
    './controllers/SetMsgCtrl',
    './controllers/SetMapCtrl',
    './controllers/SetResidenCtrl',
    //'./controllers/ShowMapCtrl',
    './services/SystemService'
], function(
    angular,
    SystemScopeCtrl,
    SystemUserCtrl,
    SystemUserEditCtrl,
    SystemRoleCtrl,
    SystemRoleEditCtrl,
    SystemConfigureCtrl,
    SystemLogCtrl,
    SystemLicenseCtrl,
    SystemEditCtrl,
    SystemUserRoleCtrl,
    SystemResetPwdCtrl,
    SystemDownloadCtrl,
    SystemRolePowerCtrl,
    SystemRoleMenuCtrl,
    SystemLicenseImportCtrl,
    SystemConfigureEditCtrl,
    SystemConfigureFormCtrl,
    SetMsgCtrl,
    SetMapCtrl,
    SetResidenCtrl,
   // ShowMapCtrl,
    SystemService
){
    var module = angular.module('webApp.system', []);

    module.controller({
        SystemScopeCtrl:SystemScopeCtrl,
        SystemUserCtrl: SystemUserCtrl,
        SystemUserEditCtrl:SystemUserEditCtrl,
        SystemRoleCtrl: SystemRoleCtrl,
        SystemRoleEditCtrl:SystemRoleEditCtrl,
        SystemConfigureCtrl: SystemConfigureCtrl,
        SystemLicenseCtrl:SystemLicenseCtrl,
        SystemEditCtrl: SystemEditCtrl,
        SystemUserRoleCtrl: SystemUserRoleCtrl,
        SystemResetPwdCtrl: SystemResetPwdCtrl,
        SystemDownloadCtrl:SystemDownloadCtrl,
        SystemRolePowerCtrl: SystemRolePowerCtrl,
        SystemRoleMenuCtrl: SystemRoleMenuCtrl,
        SystemLicenseImportCtrl: SystemLicenseImportCtrl,
        SystemConfigureEditCtrl: SystemConfigureEditCtrl,
        SystemConfigureFormCtrl: SystemConfigureFormCtrl,
        SetMsgCtrl: SetMsgCtrl,
        SetMapCtrl: SetMapCtrl,
        SetResidenCtrl: SetResidenCtrl,
        SystemLogCtrl:SystemLogCtrl
    });

    module.factory({
        SystemService: SystemService
    });
});
