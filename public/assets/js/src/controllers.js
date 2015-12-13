var bayStreetControllers = angular.module('bayStreetControllers', []);

bayStreetControllers.controller('HomeCtrl', ['$scope', '$http', 'AppService', "UserService", 
  function($scope, $http, AppService, UserService) {
    
    AppService.Top10UsersTaskCompleted(function(response, status)
      { $scope.Top10UsersTasksCompleted = response.data; }, 
      function(response, status){ }
    );
    AppService.Top10UsersTaskIncomplete(function(response, status){ $scope.Top10UsersTasksIncomplete = response.data; },
     function(response, status){});
    AppService.TaskStatus(function(response, status){ $scope.TaskStatus = response.data; $scope.Methods.DrawTaskStatusGraph()}, function(response, status){});
    AppService.Top10UsersWithMostBusinesses(function(response, status){ $scope.Top10UsersWithMostBusinesses = response.data; },
     function(response, status){});
    UserService.Get("", function (response, status){$scope.users = response.data;}, function(response, status){});

    $scope.Methods = {};
    $scope.Methods.GetUser = function(userId){
      if (!$scope.users) return "N/A";
      var userName = "";
      for(var i = 0; i < $scope.users.length; i++){
        if ($scope.users[i]._id == userId){
          userName = $scope.users[i].firstName + " " + $scope.users[i].lastName;
          break;
        }
      }
      if (!userName) userName = "N/A";
      return userName;
    };
    $scope.Methods.DrawTaskStatusGraph = function(){
      var data = [ {"info" : "Complete", "count" : $scope.TaskStatus.completedTaskCount }, {"info" : "Incomplete", "count" : $scope.TaskStatus.taskCount - $scope.TaskStatus.completedTaskCount}]
      var width = $("#tasksStatusGraph").parent().width(),
      height = $("#tasksStatusGraph").parent().height(),
      radius = Math.min(width, height) / 2;

      var color = d3.scale.ordinal()
          .range(["#98FB98","#FA8072"]);

      var arc = d3.svg.arc()
          .outerRadius(radius - 10)
          .innerRadius(radius - 70);

      var pie = d3.layout.pie()
          .sort(null)
          .value(function (d) {
          return d.count;
      });

    var svg = d3.select("#tasksStatusGraph").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", function (d) {
            return color(d.data.info);
        });

        g.append("text")
            .attr("transform", function (d) {
            return "translate(" + arc.centroid(d) + ")";
        })
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .style("font-size", "1.25em")
            .text(function (d) {
            return d.data.info.toUpperCase();
        });
    }
  }
]);

bayStreetControllers.controller("StaticCtrl", ["$scope", "$http", 
    function($scope, $http){

}]);

bayStreetControllers.controller("UsersCtrl", ["$scope", "$http", "$location", '$routeParams', "AppHelper", "UserService",
  function($scope, $http, $location, $routeParams, AppHelper, UserService){
    $scope.users = [];
    $scope.search = {};
    $scope.Methods = {};
    $scope.Methods.Search = function(){
      var query = AppHelper.Serialize({firstName: $scope.search.firstName, lastName: $scope.search.lastName, email: $scope.search.email});
      UserService.Get(query, function(response, status){
          $scope.users = response.data;
      }, function(response, status){
          alert(response);
      });
    };
    $scope.Methods.Save = function(){
      if ($routeParams.id != null) $scope.Methods.Upsert();
      else $scope.Methods.Create();
    }
    $scope.Methods.Create = function(){
      UserService.Create($scope.user, function(response, status){
        $location.path( "/users" );
      }, function(response, status){
        alert(response);
      });
    };
    $scope.Methods.Upsert = function(){
      UserService.Update($scope.user, function(response, status){
        $location.path( "/users" );
      }, function(response, status){
        alert(response);
      });
    };
    $scope.Methods.Delete = function(id){
      UserService.Delete({_id : id }, function(response, status){
        $scope.Methods.Search();
      }, function(response, status){
        alert(response);
      });
    };
    if ($routeParams.id != null) {
      var query = AppHelper.Serialize({ _id : $routeParams.id});
      UserService.Get(query, function(response, status){
        if (response.data)
          $scope.user = response.data[0];
      }, function(response, status){
          alert(response);
      });
    }
    else{
      $scope.Methods.Search();
    }
  }]
);

bayStreetControllers.controller("BusinessCtrl", ["$scope", "$http", "$location",'$routeParams', "AppHelper", "UserService", "BusinessService",
  function($scope, $http, $location, $routeParams, AppHelper, UserService, BusinessService){
    $scope.users = [];
    $scope.businesses = [];
    $scope.search = {};
    $scope.Methods = {};
    $scope.business = {};
    UserService.Get('', function(response, status){
      $scope.users = response.data;
    }, function(response, status){
      alert(response);
    });
    $scope.Methods.Search = function(){
      var query = AppHelper.Serialize( { name: $scope.search.name, address: $scope.search.address, phone: $scope.search.phone, owner: $scope.search.owner } );
      BusinessService.Get(query, function(response, status){
        $scope.businesses = response.data;
      }, function(response, status){
        alert(response);
      });
    };
    $scope.Methods.Save = function(){
      if ($routeParams.id != null) $scope.Methods.Upsert();
      else $scope.Methods.Create();
    }
    $scope.Methods.Create = function(){
      BusinessService.Create($scope.business, function(response, status){
        $location.path( "/businesses" );
      }, function(response, status){
        alert(response);
      });
    };
    $scope.Methods.Upsert = function(){
      BusinessService.Update($scope.business, function(response, status){
        $location.path( "/businesses" );
      }, function(response, status){
        alert(response);
      });
    };
    $scope.Methods.Delete = function(id){
      BusinessService.Delete({_id : id }, function(response, status){
        $scope.Methods.Search();
      }, function(response, status){
        alert(response);
      });
    };
    $scope.Methods.GetUser = function(ownerId){
      var ownerName = "";
      for(var i = 0; i < $scope.users.length; i++){
        if ($scope.users[i]._id == ownerId){
          ownerName = $scope.users[i].firstName + " " + $scope.users[i].lastName;
          break;
        }
      }
      return ownerName;
    };
    if ($routeParams.id != null) {
      var query = AppHelper.Serialize({ _id : $routeParams.id});
      BusinessService.Get(query, function(response, status){
        if (response.data)
          $scope.business = response.data[0];
      }, function(response, status){
          alert(response);
      });
    }
    else{
      $scope.Methods.Search();
    }
}]);

bayStreetControllers.controller("TasksCtrl", ["$scope", "$http", "$location",'$routeParams', "AppHelper", "UserService", "TasksService",
    function($scope, $http, $location, $routeParams, AppHelper, UserService, TasksService){
    $scope.users = [];
    $scope.tasks = [];
    $scope.search = {};
    $scope.Methods = {};
    UserService.Get('', function(response, status){
      $scope.users = response.data;
    }, function(response, status){
      alert(response);
    });
    $scope.Methods.Search = function(){
      var query = AppHelper.Serialize( { name: $scope.search.name, address: $scope.search.address, phone: $scope.search.phone, owner: $scope.search.owner } );
      TasksService.Get(query, function(response, status){
        $scope.tasks = response.data;
      }, function(response, status){
        alert(response);
      });
    };
    $scope.Methods.GetUser = function(ownerId){
      var ownerName = "";
      for(var i = 0; i < $scope.users.length; i++){
        if ($scope.users[i]._id == ownerId){
          ownerName = $scope.users[i].firstName + " " + $scope.users[i].lastName;
          break;
        }
      }
      return ownerName;
    };
    $scope.Methods.Save = function(){
      if ($routeParams.id != null) $scope.Methods.Upsert();
      else $scope.Methods.Create();
    }
    $scope.Methods.Create = function(){
      TasksService.Create($scope.task, function(response, status){
        $location.path( "/tasks" );
      }, function(response, status){
        alert(response);
      });
    };
    $scope.Methods.Upsert = function(){
      TasksService.Update($scope.task, function(response, status){
        $location.path( "/tasks" );
      }, function(response, status){
        alert(response);
      });
    };
    $scope.Methods.Delete = function(id){
      TasksService.Delete({_id : id }, function(response, status){
        $scope.Methods.Search();
      }, function(response, status){
        alert(response);
      });
    };
    if ($routeParams.id != null) {
      var query = AppHelper.Serialize({ _id : $routeParams.id});
      TasksService.Get(query, function(response, status){
        if (response.data)
          $scope.task = response.data[0];
      }, function(response, status){
          alert(response);
      });
    }
    else{
      $scope.Methods.Search();
    }
}]);