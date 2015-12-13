var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var UserModel = require("../models/user").UserModel;
var BusinessModel = require("../models/business").BusinessModel;
var TaskModel = require("../models/task").TaskModel;
var UserDataAccess = require("../data_access/user").UserDataAccess;
var BusinessDataAccess = require("../data_access/business").BusinessDataAccess;
var TasksDataAccess = require("../data_access/tasks").TasksDataAccess;
var logger = new Logger();
var appModes = new ApplicationModes();
var ObjectId = require('mongodb').ObjectId;

function API () {
  "use strict";
  var userDataAccess = new UserDataAccess();
  var businessDataAccess = new BusinessDataAccess();
  var tasksDataAccess = new TasksDataAccess();

  var models = ['task', 'user', 'business'];

  this.GetHomePage = function GetHomePage(req,res){
    logger.log("API.GetHomePage", appModes.DEBUG);
    res.sendfile('views/index.html');
  };
  this.GetUser = function GetUser(req, res){
    logger.log("API.GetUser", appModes.DEBUG);
    var query = {}; // req.query;
    if (req.query.email) query.email = { '$regex' : new RegExp(".*" + req.query.email.toLowerCase() + ".*", "i") };
    if (req.query.firstName) query.firstName = { '$regex' : new RegExp(".*" + req.query.firstName.toLowerCase() + ".*", "i") };
    if (req.query.lastName) query.lastName = { '$regex' : new RegExp(".*" + req.query.lastName.toLowerCase() + ".*", "i") };
    if (req.query._id) 
    {
      if (ObjectId.isValid(req.query._id)){
       query._id = new ObjectId(req.query._id); 
      }
    }
    userDataAccess.GetUser(query, GetUserSuccess, GetUserFailed);
    function GetUserSuccess(data){
      logger.log("API.GetUser.GetUserSuccess", appModes.DEBUG);
      res.status(200).send(data);  
    }
    function GetUserFailed(error){
      logger.log("API.GetUser.GetUserFailed", appModes.DEBUG);
      res.status(500).send(error);  
    }
  };
  this.UpdateUser = function UpdateUser(req, res){
    logger.log("API.UpdateUser", appModes.DEBUG);
    var data = req.body;
    var user = new UserModel(data);
    userDataAccess.UpsertUser(user, UpdateUserSuccess, UpdateUserFailed);
    function UpdateUserSuccess(data, inserted){
      logger.log("API.UpdateUser.UpdateUserSuccess", appModes.DEBUG);
      if (inserted)
        res.status(201).send(data);
      else
        res.status(200).send(data);
    }
    function UpdateUserFailed(error){
      logger.log("API.UpdateUser.UpdateUserFailed", appModes.DEBUG);
      res.status(500).send(error);  
    }
  };
  this.GetBusiness = function GetBusiness(req, res){
    logger.log("API.GetBusiness", appModes.DEBUG);
    var query = {}; // req.query;
    if (req.query.name) query.name = { '$regex' : new RegExp(".*" + req.query.name.toLowerCase() + ".*", "i") };
    if (req.query.address) query.address = { '$regex' : new RegExp(".*" + req.query.address.toLowerCase() + ".*", "i") };
    if (req.query.phone) query.phone = { '$regex' : new RegExp(".*" + req.query.phone.toLowerCase() + ".*", "i") };
    if (req.query.owner) {
      if (ObjectId.isValid(req.query.owner)){
       query.owner = new ObjectId(req.query.owner); 
      }
    }
    if (req.query._id) 
    {
      if (ObjectId.isValid(req.query._id)){
       query._id = new ObjectId(req.query._id); 
      }
    }
    businessDataAccess.GetBusiness(query, GetBusinessSuccess, GetBusinessFailed);
    function GetBusinessSuccess(data){
      logger.log("API.GetBusiness.GetBusinessSuccess", appModes.DEBUG);
      res.status(200).send(data);  
    }
    function GetBusinessFailed(error){
      logger.log("API.GetBusiness.GetBusinessFailed", appModes.DEBUG);
      res.status(500).send(error);  
    }
  };
  this.UpdateBusiness = function UpdateBusiness(req, res){
    logger.log("API.UpdateBusiness", appModes.DEBUG);
    var data = req.body;
    var business = new BusinessModel(data);
    businessDataAccess.UpsertBusiness(business, UpsertBusinessSuccess, UpsertBusinessFailed);
    function UpsertBusinessSuccess(data, inserted){
      logger.log("API.UpdateBusiness.UpsertBusinessSuccess", appModes.DEBUG);
      if (inserted)
        res.status(201).send(data);
      else
        res.status(200).send(data);
    }
    function UpsertBusinessFailed(error){
      logger.log("API.UpdateBusiness.UpsertBusinessFailed", appModes.DEBUG);
      res.status(500).send(error);  
    }
  };
  this.GetTasks = function GetTasks(req, res){
    logger.log("API.GetTasks", appModes.DEBUG);
    var query = {}; // req.query;
    if (req.query._id) 
    {
      if (ObjectId.isValid(req.query._id)){
       query._id = new ObjectId(req.query._id); 
      }
    }
    tasksDataAccess.GetTasks(query, GetTasksSuccess, GetTasksFailed);
    function GetTasksSuccess(data){
      logger.log("API.GetBusiness.GetTasksSuccess", appModes.DEBUG);
      res.status(200).send(data);  
    }
    function GetTasksFailed(error){
      logger.log("API.GetBusiness.GetTasksFailed", appModes.DEBUG);
      res.status(500).send(error);  
    }
  };
  this.UpdateTask = function UpdateTask(req, res){
    logger.log("API.UpdateTask", appModes.DEBUG);
    var data = req.body;
    var task = new TaskModel(data);
    tasksDataAccess.UpsertTask(task, UpsertTaskSuccess, UpsertTaskFailed);
    function UpsertTaskSuccess(data, inserted){
      logger.log("API.UpdateBusiness.UpsertBusinessSuccess", appModes.DEBUG);
      if (inserted)
        res.status(201).send(data);
      else
        res.status(200).send(data);
    }
    function UpsertTaskFailed(error){
      logger.log("API.UpdateBusiness.UpsertBusinessFailed", appModes.DEBUG);
      res.status(500).send(error);  
    }
  };
  this.CreateModel = function CreateModel(req, res){
    logger.log("API.CreateModel", appModes.DEBUG);
    var data = req.body;
    if (req.params.model == 'user'){
      var user = new UserModel(data);
      userDataAccess.InsertUser(user, OnSuccess, OnFailed);
    }
    else if (req.params.model == 'business'){
      var business = new BusinessModel(data);
      businessDataAccess.InsertBusiness(business, OnSuccess, OnFailed);
    }
    else if (req.params.model == 'task'){
      var task = new TaskModel(data);
      tasksDataAccess.InsertTask(task, OnSuccess, OnFailed);
    }
    else 
      res.status(400).send("Model Not Found!");

    function OnSuccess(data, inserted){
      logger.log("API.CreateModel.OnSuccess", appModes.DEBUG);
      if (inserted)
        res.status(201).send(data);
      else
        res.status(200).send(data);
    }
    function OnFailed(error){
      logger.log("API.CreateModel.OnFailed", appModes.DEBUG);
      res.status(500).send(error);  
    }
  };
  this.UpdateModel = function UpdateModel(req, res){
    logger.log("API.UpdateModel", appModes.DEBUG);
    var data = req.body;
    if (req.params.model == 'user'){
      var user = new UserModel(data);
      userDataAccess.UpsertUser(user, OnSuccess, OnFailed);
    }
    else if (req.params.model == 'business'){
      var business = new BusinessModel(data);
      businessDataAccess.UpsertBusiness(business, OnSuccess, OnFailed);
    }
    else if (req.params.model == 'task'){
      var task = new TaskModel(data);
      tasksDataAccess.UpsertTask(task, OnSuccess, OnFailed);
    }
    else 
      res.status(400).send("Model Not Found!");

    function OnSuccess(data, inserted){
      logger.log("API.UpdateModel.OnSuccess", appModes.DEBUG);
      if (inserted)
        res.status(201).send(data);
      else
        res.status(200).send(data);
    }
    function OnFailed(error){
      logger.log("API.UpdateModel.OnFailed", appModes.DEBUG);
      res.status(500).send(error);  
    }
  };
  this.DeleteModel = function DeleteModel(req, res){
    logger.log("API.DeleteModel", appModes.DEBUG);
    var data = req.body;
    if (req.params.model == 'user'){
      logger.log("API.DeleteModel.User", appModes.DEBUG);
      var user = new UserModel(data);
      userDataAccess.DeleteUser(user, OnSuccess, OnFailed);
    }
    else if (req.params.model == 'business'){
      logger.log("API.DeleteModel.Business", appModes.DEBUG);
      var business = new BusinessModel(data);
      businessDataAccess.DeleteBusiness(business, OnSuccess, OnFailed);
    }
    else if (req.params.model == 'task'){
      logger.log("API.DeleteModel.Task", appModes.DEBUG);
      var task = new TaskModel(data);
      tasksDataAccess.DeleteTask(task, OnSuccess, OnFailed);
    }
    else 
      res.status(400).send("Model Not Found!");

    function OnSuccess(data){
      logger.log("API.DeleteModel.OnSuccess", appModes.DEBUG);
      res.status(204).send(data);
    }
    function OnFailed(error){
      logger.log("API.DeleteModel.OnFailed", appModes.DEBUG);
      res.status(500).send(error);  
    }
  };

  /* This is for the home page
     Additional Functionality
  */
  this.TasksStatus = function TasksStatus(req, res){
    logger.log("API.TasksStatus", appModes.DEBUG);
    var data = req.body;
    tasksDataAccess.GetTaskCount({}, function(taskCount){
      tasksDataAccess.GetTaskCount({completed: true}, 
        function(completedTaskCount){ 
          OnSuccess({ taskCount: taskCount, completedTaskCount : completedTaskCount });
        }, 
        function(error){OnFailed(error)});
    }, function(error){ OnFailed(error)});
    function OnSuccess(data){
      logger.log("API.TasksStatus.OnSuccess", appModes.DEBUG);
      res.status(200).send(data);
    }
    function OnFailed(error){
      logger.log("API.TasksStatus.OnFailed", appModes.DEBUG);
      res.status(500).send();  
    }
  };

  this.Top10UsersWithMostBusinesses = function Top10UsersWithMostBusinesses(req, res){
    logger.log("API.Top10UsersWithMostBusinesses", appModes.DEBUG);
    var data = req.body;
    businessDataAccess.GetTop10Users({}, OnSuccess, OnFailed);
    function OnSuccess(data){
      logger.log("API.Top10UsersWithMostBusinesses.OnSuccess", appModes.DEBUG);
      res.status(200).send(data);
    }
    function OnFailed(error){
      logger.log("API.Top10UsersWithMostBusinesses.OnFailed", appModes.DEBUG);
      res.status(500).send();  
    }
  };

  this.Top10UsersTaskCompleted = function Top10UsersTaskCompleted(req, res){
    logger.log("API.Top10UsersTaskCompleted", appModes.DEBUG);
    var data = req.body;
    tasksDataAccess.Top10UsersTaskCompleted({completed: true}, OnSuccess, OnFailed);
    function OnSuccess(data){
      logger.log("API.Top10UsersTaskCompleted.OnSuccess", appModes.DEBUG);
      res.status(200).send(data);
    }
    function OnFailed(error){
      logger.log("API.Top10UsersTaskCompleted.OnFailed", appModes.DEBUG);
      res.status(500).send();  
    }
  };
  this.Top10UsersTaskInComplete = function Top10UsersTaskInComplete(req, res){
    logger.log("API.Top10UsersTaskInComplete", appModes.DEBUG);
    var data = req.body;
    tasksDataAccess.Top10UsersTaskCompleted({completed: false}, OnSuccess, OnFailed);
    function OnSuccess(data){
      logger.log("API.Top10UsersTaskInComplete.OnSuccess", appModes.DEBUG);
      res.status(200).send(data);
    }
    function OnFailed(error){
      logger.log("API.Top10UsersTaskInComplete.OnFailed", appModes.DEBUG);
      res.status(500).send();  
    }
  };
}

module.exports.API = API;


