angular.module('myApp.controllers', ['ngDragDrop'])
    .controller('LeftCtrl', ['$scope','$rootScope', function ($scope,$rootScope) {
        $rootScope.no_of_projects=1;
        $rootScope.projects=[{"name":"Project 1","members":[{"name":"Admin","role":"Project Lead","assign":false}],
                              "display":false,"important":false,"completed":false,"time_limit":null}];
        $rootScope.members = [{"name":"Admin","projects":[{"prj_name":"Project 1"}],"prjs":1}];
        $scope.name=" ";
        $scope.AddMember = function(){
           if($scope.name==" ")
           	alert("Name Empty");
           else{
          $rootScope.members.push({"name":$scope.name,"projects":[],"prjs":0});
          $scope.name=" ";
               }
        }
         $scope.dropSuccessHandler = function($event,index,array){
          array.prjs++;
          for(var i=0;i<$rootScope.members.length;i++)
          {
           if($rootScope.members[i].name==array.name){
            $rootScope.members[i].projects.push({"prj_name":$rootScope.prj_name});
            break;
            }
          }
         };
    }])
    .controller('MainCtrl', ['$scope','$rootScope', function ($scope,$rootScope) {
        $scope.type="All";
       $scope.prj_name=" ";
       $scope.hide=true;
        $scope.filter_prj=function(prj){
          return true;
        }
         $scope.show=function(){
        	 $scope.hide=false;
        }
        $scope.prj_filter=function(x){
          if(x=="All"){
            $scope.type="All";
            $scope.filter_prj=function(prj){
             return true;
            }
          }
          else if(x=="Completed"){
              $scope.type="Completed";
            $scope.filter_prj=function(prj){
              return prj.completed;
             }
           }
           else if (x=="Time-Bound")
           {
               $scope.type="Time-Bound";
            $scope.filter_prj=function(prj){
              if(prj.time_limit==null)
                return false;
              else
                return true;
             }
           }
           else if (x=="Important")
           {
            $scope.type="Important";
            $scope.filter_prj=function(prj){
              return prj.important;
             }
           }
        }
         
        $scope.AddPrj=function(){
          if($scope.prj_name==" ")
            alert("Project Name Empty");
          else{
           $rootScope.projects.push({name:$scope.prj_name,members:[],"display":true,
                                   "important":false,"completed":false,"time_limit":null});
           $scope.prj_name=" ";
           $scope.hide=true;
           $rootScope.no_of_projects++;
         }
        }
        $scope.onDrop = function($event,$data,array,parent){
        for(var i=0;i<parent.members.length;i++){
            if($data.name==parent.members[i].name){
            alert($data.name+" already added");
            return ;
            }
        }
         parent.display=false;
         array.push({"name":$data.name,"role":"","assign":true});
         $rootScope.prj_name=parent.name;
        };
       }]).
    controller('MemberCtrl', ['$scope','$rootScope','$routeParams', function ($scope,$rootScope,$routeParams) {
    $scope.member={};
    for(var i=0;i<$rootScope.members.length;i++)     
      {
              if($rootScope.members[i].name==$routeParams.memberId){
                $scope.member=$rootScope.members[i];
                break;
              }
     }
   
    }]).
    controller('PrjCtrl', ['$scope','$rootScope','$routeParams','$location', function ($scope,$rootScope,$routeParams,$location) {
    $scope.project={};
    for(var i=0;i<$rootScope.projects.length;i++)     
      {
              if($rootScope.projects[i].name==$routeParams.projectId){
                $scope.project=$rootScope.projects[i];
                break;
              }
     }
     $scope.remove=function(project){
      for(var i=0; i<$rootScope.projects.length; i++) {
        if($rootScope.projects[i].name == project.name) {
            $rootScope.projects.splice(i, 1);
            $rootScope.no_of_projects--;
            break;
        }
    }
    for(var i=0; i<$rootScope.members.length; i++) {
      for (var j =0;j< $rootScope.members[i].projects.length; j++) {
        if(project.name == $rootScope.members[i].projects[j].prj_name) {
            $rootScope.members[i].projects.splice(j, 1);
            $rootScope.members[i].prjs--;
            break;
        }
      }
    }
    $scope.show_form=function(member){
        if(role==null){
            alert("Empty Role cannot be assigned to " + member.name);
        }
        else{
            member.assign=false;
        }
    }
    $location.path("/");
     }
    }]);
