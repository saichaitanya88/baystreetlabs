var MongoClient = require('mongodb').MongoClient;
var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var ApplicationConfig = require("../utilities/config").ApplicationConfig;
var appConfig = new ApplicationConfig();
var logger = new Logger();
var appModes = new ApplicationModes();

function BusinessDataAccess(){
	this.GetBusiness = function GetBusiness(query, successCallback, errorCallback){
    logger.log("BusinessDataAccess.GetBusiness", appModes.DEBUG)
    // Open the connection to the server
    MongoClient.connect(appConfig.mongoDbConnection, {native_parser:true}, function(err, db) {
      if (err){
        errorCallback(err);
      }
      if (db == null) {
        errorCallback("DB is null"); 
      }
      var collection = db.collection("businesses");
      var cursor = collection.find(query)
			cursor.toArray(OnSuccess);
			function OnSuccess(err, docs){
				if (err){
          logger.log("BusinessDataAccess.GetBusiness.business.Find.Error", appModes.DEBUG);
          errorCallback(err);
        }
        else{
          logger.log("BusinessDataAccess.GetBusiness.business.Find.Success", appModes.DEBUG);
          successCallback(docs);
        }
			}
    });
  };
  this.UpsertBusiness = function UpsertBusiness(business, successCallback, errorCallback){
    logger.log("BusinessDataAccess.UpsertBusiness", appModes.DEBUG)
    // Open the connection to the server
    MongoClient.connect(appConfig.mongoDbConnection, {native_parser:true}, function(err, db) {
      if (err){
        errorCallback(err);
      }
      if (db == null) {
        errorCallback("DB is null"); 
      }
      // Get the first db and do an update document on it
      var collection = db.collection("businesses");
      collection.update({ "_id" : business._id} , business,{upsert:true}, function (err, doc) {
        logger.log("BusinessDataAccess.UpsertBusiness.Collection.Update", appModes.DEBUG);
        "use strict";
        if (err){
          logger.log("BusinessDataAccess.UpsertBusiness.Collection.Update.Error", appModes.DEBUG);
          errorCallback(err);
        }
        else{
          logger.log("BusinessDataAccess.UpsertBusiness.Collection.Update.Success", appModes.DEBUG);
          if (doc.result.ok == 1 && doc.result.n == 1)
          {
            successCallback(business, (doc.result.nModified==0));
          }
          else
            errorCallback(doc);
        };
      });
    });
  };
  //InsertBusiness
  this.InsertBusiness = function InsertBusiness(business, successCallback, errorCallback){
    logger.log("BusinessDataAccess.InsertBusiness", appModes.DEBUG)
    // Open the connection to the server
    MongoClient.connect(appConfig.mongoDbConnection, {native_parser:true}, function(err, db) {
      if (err){
        errorCallback(err);
      }
      if (db == null) {
        errorCallback("DB is null"); 
      }
      // Get the first db and do an update document on it
      var collection = db.collection("businesses");
      collection.insert(business, function (err, doc) {
        logger.log("BusinessDataAccess.InsertBusiness.Collection.Insert", appModes.DEBUG);
        "use strict";
        if (err){
          logger.log("BusinessDataAccess.InsertBusiness.Collection.Insert.Error", appModes.DEBUG);
          errorCallback(err);
        }
        else{
          logger.log("BusinessDataAccess.InsertBusiness.Collection.Insert.Success", appModes.DEBUG);
          if (doc.result.ok == 1 && doc.result.n == 1)
            successCallback(business, (doc.result.nModified==0));
          else
            errorCallback(doc);
        };
      });
    });
  };
  //DeleteBusiness
  this.DeleteBusiness = function DeleteBusiness(business, successCallback, errorCallback){
    logger.log("BusinessDataAccess.DeleteBusiness", appModes.DEBUG)
    // Open the connection to the server
    MongoClient.connect(appConfig.mongoDbConnection, {native_parser:true}, function(err, db) {
      if (err){
        errorCallback(err);
      }
      if (db == null) {
        errorCallback("DB is null"); 
      }
      // Get the first db and do an update document on it
      var collection = db.collection("businesses");
      collection.remove({_id : business._id}, function (err, doc) {
        logger.log("BusinessDataAccess.DeleteBusiness.Collection.Delete", appModes.DEBUG);
        "use strict";
        if (err){
          logger.log("BusinessDataAccess.DeleteBusiness.Collection.Delete.Error", appModes.DEBUG);
          errorCallback(err);
        }
        else{
          logger.log("BusinessDataAccess.DeleteBusiness.Collection.Delete.Success", appModes.DEBUG);
          if (doc.result.ok == 1 && doc.result.n == 1)
            successCallback(business);
          else
            errorCallback(doc);
        };
      });
    });
  };
  this.GetTop10Users = function GetTop10Users(query, successCallback, errorCallback){
    logger.log("BusinessDataAccess.GetTop10Users", appModes.DEBUG)
    // Open the connection to the server
    MongoClient.connect(appConfig.mongoDbConnection, {native_parser:true}, function(err, db) {
      if (err){
        errorCallback(err);
      }
      if (db == null) {
        errorCallback("DB is null"); 
      }
      // Get the first db and do an update document on it
      var collection = db.collection("businesses");
      collection.aggregate(
        [
          { "$group" : 
            { "_id" : "$owner", "count" : { "$sum" : 1 } }
          }
        ]).sort({"count": -1}).limit(10).toArray(function (err, result){
        logger.log("BusinessDataAccess.GetTop10Users.AggregateResult", appModes.DEBUG)
        successCallback(result);
      }); 
    });
  };
}

module.exports.BusinessDataAccess = BusinessDataAccess;