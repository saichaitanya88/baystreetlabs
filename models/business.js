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

function BusinessModel (data){
	logger.log("BusinessModel.ctor", appModes.DEBUG);
	var name;
	var address;
	var phone;
	var owner;
	var _id;
	
	// Data Structure Persistence
	if (typeof data.name == 'string'){
		name = data.name;
	}
	if (typeof data.address == 'string'){
		address = data.address;
	}
	if (typeof data.phone == 'string'){
		phone = data.phone;
	}
	if (data.owner && ObjectId.isValid(data.owner.toString())){
		owner = new ObjectId(data.owner.toString());
	}
	if (data._id && ObjectId.isValid(data._id).toString()){
		_id = new ObjectId(data._id.toString());
	}
	if (!_id) _id = new ObjectId();
	return {
		name: name,
		address: address,
		phone: phone,
		owner: owner,
		_id: _id
	}

}

module.exports.BusinessModel = BusinessModel;