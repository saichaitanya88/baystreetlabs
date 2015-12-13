var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var Helper = require("../utilities/helper").Helper;
var logger = new Logger();
var appModes = new ApplicationModes();
var ObjectId = require('mongodb').ObjectId;
var helper = new Helper();
/*
	_id: MongoID, 
	firstName : string,
	lastName : string,
	email: string
*/

function UserModel (data){
	logger.log("UserModel.ctor", appModes.DEBUG);
	
	var email;
	var firstName;
	var lastName;
	var _id;
	
	// Data Structure
	if (typeof data.email == 'string' && helper.IsValidEmailAddress(data.email)){
		email = data.email;
	}
	if (typeof data.firstName == 'string'){
		firstName = data.firstName;
	}
	if (typeof data.lastName == 'string'){
		lastName = data.lastName;
	}
	if (data._id)
	{
		if (ObjectId.isValid(data._id.toString())){
			_id = new ObjectId(data._id.toString());
		}
	}
	if (!_id) _id = new ObjectId();
	return {
		email: email,
		firstName: firstName,
		lastName: lastName,
		_id: _id
	}

}


module.exports.UserModel = UserModel;