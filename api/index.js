 var API = require('./api').API;
 var ErrorHandler = require('./errors').errorHandler;
 var Logger = require('../utilities/logger').Logger;
 var ApplicationModes = require("../utilities/config").ApplicationModes;
 var logger = new Logger();
 var appModes = new ApplicationModes();

module.exports = exports = function(app) {
  // var accountsAPI = new AccountsAPI();
  // var customObjectsAPI = new CustomObjectsAPI();
  var api = new API();

  // Actions API 1
  app.get('/', api.GetHomePage);
  app.get('/user', api.GetUser);
  app.post('/user', api.UpdateUser);
  app.get('/business', api.GetBusiness);
  app.post('/business', api.UpdateBusiness);
  app.get('/tasks', api.GetTasks);
  app.post('/task', api.UpdateTask);

  // Actions API 2
  app.post('/api/:model/create', api.CreateModel);
  app.post('/api/:model/update', api.UpdateModel);
  app.post('/api/:model/delete', api.DeleteModel);

  // Additional Functionality
  app.get('/api/tasks/Top10UsersTaskCompleted', api.Top10UsersTaskCompleted);
  app.get('/api/tasks/Top10UsersTaskInComplete', api.Top10UsersTaskInComplete);
  app.get('/api/tasks/status', api.TasksStatus);
  app.get('/api/business/Top10UsersWithMostBusinesses', api.Top10UsersWithMostBusinesses);

  app.all('*', function(req, res){
    logger.log("LoggingError".toUpperCase(), appModes.DEBUG)
    res.status(404).send('Unable to process request');
    ErrorHandler({message: '404: Unable to process request', stack: null}, req, res, null, false)
  });

  // Error handling middleware
  app.use(ErrorHandler);
}