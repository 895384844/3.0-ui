define([
    'angular',
    'locale/message'

], function(
    angular,
    locale
) {
    'use strict';
    angular.module('webApp.config', [])
        .constant('DEBUG', false)
        .constant('API_HOST', 'http://private-772b7c-895384844.apiary-mock.com')
        .constant('API_URL', 'rest/')
        .constant('localeText', {
            'en-US':locale.en_us
        })
        .value('localSession', {
            user:{},
            role:{},
            settings:{},
            token:""
        });

});