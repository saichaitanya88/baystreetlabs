var MongoClient = require('mongodb').MongoClient;
var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var ApplicationConfig = require("../utilities/config").ApplicationConfig;
var appConfig = new ApplicationConfig();
var logger = new Logger();
var appModes = new ApplicationModes();

function UserDataAccess(){
	this.GetUser = function GetUser(query, successCallback, errorCallback){
    logger.log("UserDataAccess.GetUser", appModes.DEBUG)
    // Open the connection to the server
    MongoClient.connect(appConfig.mongoDbConnection, {native_parser:true}, function(err, db) {
      if (err){
        errorCallback(err);
      }
      if (db == null) {
        errorCallback("DB is null"); 
      }
      // Get the first db and do an update document on it
      var collection = db.collection("users");
      var cursor = collection.find(query)
			cursor.toArray(OnSuccess);
			function OnSuccess(err, docs){
				if (err){
          logger.log("UserDataAccess.GetUser.users.Find.Error", appModes.DEBUG);
          errorCallback(err);
        }
        else{
          logger.log("UserDataAccess.GetUser.users.Find.Success", appModes.DEBUG);
          successCallback(docs);
        }
			}
    });
  };
  this.UpsertUser = function UpsertUser(user, successCallback, errorCallback){
    logger.log("UserDataAccess.UpsertUser", appModes.DEBUG)
    // Open the connection to the server
    MongoClient.connect(appConfig.mongoDbConnection, {native_parser:true}, function(err, db) {
      if (err){
        errorCallback(err);
      }
      if (db == null) {
        errorCallback("DB is null"); 
      }
      // Get the first db and do an update document on it
      var collection = db.collection("users");
      collection.update({ "_id" : user._id} , user,{upsert:true}, function (err, doc) {
        logger.log("UserDataAccess.UpsertUser.Collection.Update", appModes.DEBUG);
        "use strict";
        if (err){
          logger.log("UserDataAccess.UpsertUser.Collection.Update.Error", appModes.DEBUG);
          errorCallback(err);
        }
        else{
          logger.log("UserDataAccess.UpsertUser.Collection.Update.Success", appModes.DEBUG);
          if (doc.result.ok == 1 && doc.result.n == 1)
            successCallback(user, (doc.result.nModified==0));
          else
            errorCallback(doc);
        };
      });
    });
  };
  //InsertUser
  this.InsertUser = function InsertUser(user, successCallback, errorCallback){
    logger.log("UserDataAccess.InsertUser", appModes.DEBUG)
    // Open the connection to the server
    MongoClient.connect(appConfig.mongoDbConnection, {native_parser:true}, function(err, db) {
      if (err){
        errorCallback(err);
      }
      if (db == null) {
        errorCallback("DB is null"); 
      }
      // Get the first db and do an update document on it
      var collection = db.collection("users");
      collection.insert(user, function (err, doc) {
        logger.log("UserDataAccess.InsertUser.Collection.Insert", appModes.DEBUG);
        "use strict";
        if (err){
          logger.log("UserDataAccess.InsertUser.Collection.Insert.Error", appModes.DEBUG);
          errorCallback(err);
        }
        else{
          logger.log("UserDataAccess.InsertUser.Collection.Insert.Success", appModes.DEBUG);
          if (doc.result.ok == 1 && doc.result.n == 1)
            successCallback(user, (doc.result.nModified==0));
          else
            errorCallback(doc);
        };
      });
    });
  };
  //DeleteUser
  this.DeleteUser = function DeleteUser(user, successCallback, errorCallback){
    logger.log("UserDataAccess.DeleteUser", appModes.DEBUG)
    // Open the connection to the server
    MongoClient.connect(appConfig.mongoDbConnection, {native_parser:true}, function(err, db) {
      if (err){
        errorCallback(err);
      }
      if (db == null) {
        errorCallback("DB is null"); 
      }
      // Get the first db and do an update document on it
      var collection = db.collection("users");
      collection.remove({_id : user._id}, function (err, doc) {
        logger.log("UserDataAccess.DeleteUser.Collection.Delete", appModes.DEBUG);
        "use strict";
        if (err){
          logger.log("UserDataAccess.DeleteUser.Collection.Delete.Error", appModes.DEBUG);
          errorCallback(err);
        }
        else{
          logger.log("UserDataAccess.DeleteUser.Collection.Delete.Success", appModes.DEBUG);
          console.log(doc);
          if (doc.result.ok == 1 && doc.result.n == 1)
            successCallback(user);
          else
            errorCallback(doc);
        };
      });
    });
  };
}

module.exports.UserDataAccess = UserDataAccess;