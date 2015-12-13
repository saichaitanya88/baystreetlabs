var bayStreetApp = angular.module('bayStreetApp', [
  'ngRoute','bayStreetControllers', 'bayStreetServices'
]);

bayStreetApp.config(['$routeProvider',
function($routeProvider) {
  $routeProvider.
  when('/', {
      templateUrl: '/assets/partials/index.html',
      controller: 'HomeCtrl',
      title: "Welcome"
    }).
  when('/users/', {
      templateUrl: '/assets/partials/users/index.html',
      controller: 'UsersCtrl',
      title: "Users"
    }).
  when('/user/update/:id', {
      templateUrl: '/assets/partials/users/edit.html',
      controller: 'UsersCtrl',
      title: "Users"
    }).
  when('/user/create', {
      templateUrl: '/assets/partials/users/edit.html',
      controller: 'UsersCtrl',
      title: "Users"
    }).
  when('/businesses', {
      templateUrl: '/assets/partials/businesses/index.html',
      controller: 'BusinessCtrl',
      title: "Businesses"
    }).
  when('/business/update/:id', {
      templateUrl: '/assets/partials/businesses/edit.html',
      controller: 'BusinessCtrl',
      title: "Users"
    }).
  when('/business/create', {
      templateUrl: '/assets/partials/businesses/edit.html',
      controller: 'BusinessCtrl',
      title: "Users"
    }).
  when('/tasks', {
      templateUrl: '/assets/partials/tasks/index.html',
      controller: 'TasksCtrl',
      title: "Tasks"
    }).
  when('/task/update/:id', {
      templateUrl: '/assets/partials/tasks/edit.html',
      controller: 'TasksCtrl',
      title: "Users"
    }).
  when('/task/create', {
      templateUrl: '/assets/partials/tasks/edit.html',
      controller: 'TasksCtrl',
      title: "Users"
    }).
  // when('/application/account/:accountId', {
  //     templateUrl: 'partials/accounts/get.html',
  //     controller: 'AccountCtrl',
  //     title: "Edit Account"
  //   }).
  // when('/application/account/:accountId/customObjects', {
  //     templateUrl: 'partials/customObjects/search.html',
  //     controller: 'CustomObjectsCtrl',
  //     title: "Search CustomObjects"
  //   }).
  // when('/application/account/:accountId/customObject', {
  //     templateUrl: 'partials/customObjects/new.html',
  //     controller: 'CustomObjectsCtrl',
  //     title: "New CustomObject"
  //   }).
  // when('/application/account/:accountId/customObject/:customObjectId', {
  //     templateUrl: 'partials/customObjects/get.html',
  //     controller: 'CustomObjectsCtrl',
  //     title: "Edit CustomObject"
  //   }).
  // when('/application/account/:accountId/customObject/:customObjectId/modelDefinition', {
  //     templateUrl: 'partials/customObjects/modelDefinitions/new.html',
  //     controller: 'CustomObjectModelDefinitionCtrl',
  //     title: "New CustomObject ModelDefinition"
  //   }).
  // when('/application/account/:accountId/customObject/:customObjectId/modelDefinition/:customObjectModelDefinitionId', {
  //     templateUrl: 'partials/customObjects/modelDefinitions/get.html',
  //     controller: 'CustomObjectModelDefinitionCtrl',
  //     title: "Edit CustomObject ModelDefinition"
  //   }).
  // when('/application/account/:accountId/customObject/:customObjectId/data/search', {
  //     templateUrl: 'partials/customObjects/data/search.html',
  //     controller: 'CustomObjectDataCtrl',
  //     title: "Search CustomObject Data"
  //   }).
  // when('/application/account/:accountId/customObject/:customObjectId/data', {
  //     templateUrl: 'partials/customObjects/data/new.html',
  //     controller: 'CustomObjectDataCtrl',
  //     title: "New CustomObject Data"
  //   }).
  // when('/application/account/:accountId/customObject/:customObjectId/data/:customObjectDataId', {
  //     templateUrl: 'partials/customObjects/data/get.html',
  //     controller: 'CustomObjectDataCtrl',
  //     title: "Edit CustomObject Data"
  //   }).
    when('/static/404', {
      templateUrl: '/assets/partials/static/404.html',
      controller: 'StaticCtrl',
      title: "Page Not Found"
    }).
    otherwise({
      redirectTo: '/static/404'
    });
}]);