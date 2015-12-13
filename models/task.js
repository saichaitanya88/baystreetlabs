var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();
var ObjectId = require('mongodb').ObjectId;

/*
	_id: MongoID, 
	name : string,
	address : string,
	phone : string,
	owner: MongoID
*/

function TaskModel (data){
	logger.log("TaskModel.ctor", appModes.DEBUG);

	var name;
	var assigned;
	var completed = false;
	var _id;
	
	// Data Structure Persistence
	if (typeof data.name == 'string'){
		name = data.name;
	}
	if (typeof data.completed == 'boolean'){
		completed = data.completed;
	}
	if (data.assigned && ObjectId.isValid(data.assigned.toString())){
		assigned = new ObjectId(data.assigned.toString());
	}
	if (data._id && ObjectId.isValid(data._id.toString())){
		_id = new ObjectId(data._id.toString());
	}
	if (!_id) _id = new ObjectId();
	return {
		name: name,
		assigned: assigned,
		completed: completed,
		_id: _id
	}

}


module.exports.TaskModel = TaskModel;