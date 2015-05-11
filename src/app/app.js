import angular from 'angular';
import LmaController from './homePage/controllers/LmaController';

var appModule = angular.module('app',[]);

appModule.controller('lmaController',LmaController);

angular.element(document).ready(() => {
	angular.bootstrap(document,['app']);

});
