var MongoClient = require('mongodb').MongoClient;
var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var ApplicationConfig = require("../utilities/config").ApplicationConfig;
var appConfig = new ApplicationConfig();
var logger = new Logger();
var appModes = new ApplicationModes();

function TasksDataAccess(){
	this.GetTasks = function GetTasks(task, successCallback, errorCallback){
    logger.log("TasksDataAccess.GetTasks", appModes.DEBUG)
    // Open the connection to the server
    MongoClient.connect(appConfig.mongoDbConnection, {native_parser:true}, function(err, db) {
      if (err){
        errorCallback(err);
      }
      if (db == null) {
        errorCallback("DB is null"); 
      }
      // Get the first db and do an update document on it
      var collection = db.collection("tasks");
      var cursor = collection.find(task)
			cursor.toArray(OnSuccess);
			function OnSuccess(err, docs){
				if (err){
          logger.log("TasksDataAccess.GetTasks.tasks.Find.Error", appModes.DEBUG);
          errorCallback(err);
        }
        else{
          logger.log("TasksDataAccess.GetTasks.tasks.Find.Success", appModes.DEBUG);
          successCallback(docs);
        }
			}
    });
  };
  this.GetTaskCount = function GetTasks(task, successCallback, errorCallback){
    logger.log("TasksDataAccess.GetTaskCount", appModes.DEBUG)
    // Open the connection to the server
    MongoClient.connect(appConfig.mongoDbConnection, {native_parser:true}, function(err, db) {
      if (err){
        errorCallback(err);
      }
      if (db == null) {
        errorCallback("DB is null"); 
      }
      // Get the first db and do an update document on it
      var collection = db.collection("tasks");
      collection.find(task).count(OnSuccess);
      function OnSuccess(err, count){
        if (err){
          logger.log("TasksDataAccess.GetTaskCount.tasks.Find.Error", appModes.DEBUG);
          errorCallback(err);
        }
        else{
          logger.log("TasksDataAccess.GetTaskCount.tasks.Find.Success", appModes.DEBUG);
          successCallback(count);
        }
      }
    });
  };
  this.UpsertTask = function UpsertTask(task, successCallback, errorCallback){
    logger.log("TaskDataAccess.UpsertTask", appModes.DEBUG)
    // Open the connection to the server
    MongoClient.connect(appConfig.mongoDbConnection, {native_parser:true}, function(err, db) {
      if (err){
        errorCallback(err);
      }
      if (db == null) {
        errorCallback("DB is null"); 
      }
      // Get the first db and do an update document on it
      var collection = db.collection("tasks");
      collection.update({ "_id" : task._id} , task,{upsert:true}, function (err, doc) {
        logger.log("TaskDataAccess.UpsertTask.Collection.Update", appModes.DEBUG);
        "use strict";
        if (err){
          logger.log("TaskDataAccess.UpsertTask.Collection.Update.Error", appModes.DEBUG);
          errorCallback(err);
        }
        else{
          logger.log("TaskDataAccess.UpsertTask.Collection.Update.Success", appModes.DEBUG);
          if (doc.result.ok == 1 && doc.result.n == 1)
            successCallback(task, (doc.result.nModified==0));
          else
            errorCallback(doc);
        };
      });
    });
  };
  //InsertTask
  this.InsertTask = function InsertTask(task, successCallback, errorCallback){
    logger.log("TaskDataAccess.InsertTask", appModes.DEBUG)
    // Open the connection to the server
    MongoClient.connect(appConfig.mongoDbConnection, {native_parser:true}, function(err, db) {
      if (err){
        errorCallback(err);
      }
      if (db == null) {
        errorCallback("DB is null"); 
      }
      // Get the first db and do an update document on it
      var collection = db.collection("tasks");
      collection.insert(task, function (err, doc) {
        logger.log("TaskDataAccess.InsertTask.Collection.Insert", appModes.DEBUG);
        "use strict";
        if (err){
          logger.log("TaskDataAccess.InsertTask.Collection.Insert.Error", appModes.DEBUG);
          errorCallback(err);
        }
        else{
          logger.log("TaskDataAccess.InsertTask.Collection.Insert.Success", appModes.DEBUG);
          if (doc.result.ok == 1 && doc.result.n == 1)
            successCallback(task, (doc.result.nModified==0));
          else
            errorCallback(doc);
        };
      });
    });
  };
  //DeleteTask
  this.DeleteTask = function DeleteTask(task, successCallback, errorCallback){
    logger.log("TaskDataAccess.DeleteTask", appModes.DEBUG)
    // Open the connection to the server
    MongoClient.connect(appConfig.mongoDbConnection, {native_parser:true}, function(err, db) {
      if (err){
        errorCallback(err);
      }
      if (db == null) {
        errorCallback("DB is null"); 
      }
      // Get the first db and do an update document on it
      var collection = db.collection("tasks");
      collection.remove({_id : task._id}, function (err, doc) {
        logger.log("TaskDataAccess.DeleteTask.Collection.Delete", appModes.DEBUG);
        "use strict";
        if (err){
          logger.log("TaskDataAccess.DeleteTask.Collection.Delete.Error", appModes.DEBUG);
          errorCallback(err);
        }
        else{
          logger.log("TaskDataAccess.DeleteTask.Collection.Delete.Success", appModes.DEBUG);
          if (doc.result.ok == 1 && doc.result.n == 1)
            successCallback(task);
          else
            errorCallback(doc);
        };
      });
    });
  };
  this.Top10UsersTaskCompleted = function Top10UsersTaskCompleted(query, successCallback, errorCallback){
    logger.log("TaskDataAccess.Top10UsersTaskCompleted", appModes.DEBUG)
    // Open the connection to the server
    MongoClient.connect(appConfig.mongoDbConnection, {native_parser:true}, function(err, db) {
      if (err){
        errorCallback(err);
      }
      if (db == null) {
        errorCallback("DB is null"); 
      }
      // Get the first db and do an update document on it
      var collection = db.collection("tasks");
      collection.aggregate(
        [
          { $match: { "completed": query.completed } },
          { "$group" : 
            { "_id" : "$assigned", "count" : { "$sum" : 1 } }
          }
        ]).sort({"count": -1}).limit(10).toArray(function (err, result){
        logger.log("TaskDataAccess.Top10UsersTaskCompleted.AggregateResult", appModes.DEBUG)
        successCallback(result);
      }); 
    });
  };
}

module.exports.TasksDataAccess = TasksDataAccess;