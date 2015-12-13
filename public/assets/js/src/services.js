var bayStreetServices = angular.module('bayStreetServices', ['ngResource']);


bayStreetServices.factory('AppHelper', function($http) {
	var Serialize = function (obj){
		var query = "?";
		for(var i = 0; i< Object.keys(obj).length; i++){
			if (obj[Object.keys(obj)[i]])
				query = query + Object.keys(obj)[i] + "=" + obj[Object.keys(obj)[i]] + "&";
		}
		return query;
	}
  return { Serialize: Serialize };
});

bayStreetServices.factory('UserService', function($http) {
	var Get = function (query, successFunction, errorFunction){
		$http.get("/user" + query).then(successFunction, errorFunction);
	}
	var Upsert = function (user, successFunction, errorFunction){
		$http.post("/user", user).then(successFunction, errorFunction);
	}
	var Create = function (user, successFunction, errorFunction){
		$http.post("/api/user/create", user).then(successFunction, errorFunction);
	}
	var Delete = function (user, successFunction, errorFunction){
		$http.post("/api/user/delete", user).then(successFunction, errorFunction);
	}
	var Update = function (user, successFunction, errorFunction){
		$http.post("/api/user/update", user).then(successFunction, errorFunction);
	}
  return { Get: Get, Upsert: Upsert, Create: Create, Delete: Delete, Update: Update };
});

bayStreetServices.factory('BusinessService', function($http) {
	var Get = function (query, successFunction, errorFunction){
		$http.get("/business" + query).then(successFunction, errorFunction);
	}
	var Upsert = function (business, successFunction, errorFunction){
		$http.post("/business", business).then(successFunction, errorFunction);
	}
	var Create = function (business, successFunction, errorFunction){
		$http.post("/api/business/create", business).then(successFunction, errorFunction);
	}
	var Delete = function (business, successFunction, errorFunction){
		$http.post("/api/business/delete", business).then(successFunction, errorFunction);
	}
	var Update = function (business, successFunction, errorFunction){
		$http.post("/api/business/update", business).then(successFunction, errorFunction);
	}
  return { Get: Get, Upsert: Upsert, Create: Create, Delete: Delete, Update: Update };
});

bayStreetServices.factory('TasksService', function($http) {
	var Get = function (query, successFunction, errorFunction){
		$http.get("/tasks" + query).then(successFunction, errorFunction);
	}
	var Upsert = function (task, successFunction, errorFunction){
		$http.post("/task", task).then(successFunction, errorFunction);
	}
	var Create = function (task, successFunction, errorFunction){
		$http.post("/api/task/create", task).then(successFunction, errorFunction);
	}
	var Delete = function (task, successFunction, errorFunction){
		$http.post("/api/task/delete", task).then(successFunction, errorFunction);
	}
	var Update = function (task, successFunction, errorFunction){
		$http.post("/api/task/update", task).then(successFunction, errorFunction);
	}
  return { Get: Get, Upsert: Upsert, Create: Create, Delete: Delete, Update: Update };
});

bayStreetServices.factory('AppService', function($http) {
	var Top10UsersTaskCompleted = function (successFunction, errorFunction){
		$http.get("api/tasks/Top10UsersTaskCompleted").then(successFunction, errorFunction);
	}
	var Top10UsersTaskIncomplete = function (successFunction, errorFunction){
		$http.get("api/tasks/Top10UsersTaskInComplete").then(successFunction, errorFunction);
	}
	var TaskStatus = function(successFunction, errorFunction){
		$http.get("api/tasks/status").then(successFunction, errorFunction);	
	}
	var Top10UsersWithMostBusinesses = function (successFunction, errorFunction){
		$http.get("/api/business/Top10UsersWithMostBusinesses").then(successFunction, errorFunction);	
	}
  return { Top10UsersTaskCompleted: Top10UsersTaskCompleted, Top10UsersTaskIncomplete: Top10UsersTaskIncomplete, 
  	TaskStatus: TaskStatus, Top10UsersWithMostBusinesses: Top10UsersWithMostBusinesses };
});