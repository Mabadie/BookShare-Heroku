'use strict';
angular.module('SHAREBOOKSApp')
    .controller('RootCtrl', ['$scope','$rootScope','$routeParams', '$location','dataFactory','$window',
        function ($scope, $rootScope, $routeParams,  $location, dataFactory, $window) {
			
            $rootScope.usuario={"logged_in":false,"nombre":null, "nroCliente":null,"cliente":null};
            $rootScope.status={"hayerror":false,"success":false,"msg":null};
			$rootScope.esLogout=false;
            $scope.status.hayerrorLogin=false;
            $rootScope.ajaxCount=0;
            $('nav').addClass('shrink');

			$location.path("/login");

           	$rootScope.cerrarModal=function(modDiag){
                $(modDiag).modal('toggle');
            };

            $scope.logout=function(){
				$rootScope.esLogout=true;
                dataFactory.logout($rootScope.usuario.nroCliente)
                    .success(function(data,status){
                        if ($rootScope.TipoSesion==null){
                            $rootScope.usuario={"logged_in":false,"nombre":null, "nroCliente":null,"cliente":null};
                            $location.path("/login");
                        }else{
                            $window.location.href= $rootScope.usuario.cliente.URLVueltaBanco;
                            $rootScope.usuario={"logged_in":false,"nombre":null, "nroCliente":null,"cliente":null};
                        }
                    });
            }


    }]);


angular.module('SHAREBOOKSApp')
    .controller('LoginCtrl', ['$scope','$rootScope','$routeParams', '$location','$http', 'dataFactory',
        function ($scope, $rootScope, $routeParams,  $location, $http, dataFactory) {
            $rootScope.status = {"hayerror": false, "success": false, "msg": null};
            $rootScope.esLogout=false;
            $scope.loginUsr = {'username': null, 'password': null};


        $scope.login=function() {
            $scope.status={"hayerror":false,"success":false,"msg":null};
            
			$('.buttonLogin').attr("disabled", true);

            var cliente = {'username': $scope.loginUsr.username, 'password': $scope.loginUsr.password};
			$rootScope.usuario.logged_in=true;
			$location.url("/home");


            /*dataFactory.login(cliente)
                .error(function (error, status) {

                        $scope.status.msgLogin = "El número de cliente o el ePIN es incorrecto. Reingrese";
                        $scope.status.hayerrorLogin = true;
                        $('.buttonLogin').removeAttr("disabled");

                })
                .success(function (data, status) {
					if (status == 201) 
					{
                        $http.defaults.headers.common['Autorization'] = "Token "+data.token;
                    })
                 });
                        
                            $rootScope.usuario.logged_in=true;
                            $location.url("/home");

                    }
                });*/
        };
}]);
		
		

angular.module('SHAREBOOKSApp')
    .controller('HomeCtrl', ['$scope','$rootScope','$routeParams', '$location','$window','dataFactory','modalService',
        function ($scope, $rootScope, $routeParams,  $location, $window, dataFactory,modalService) {
           $rootScope.status={"hayerror":false,"success":false,"msg":null};
			
			$scope.books=
			[
				{
					"title":"Cartero",
					"author":"Charles Bukowski",
					"year":"1971",
					"image":"http://webtestpas.objetos.com.uy/books/img/cartero.jpg"
				},

				{
                    "title":"La maquina de follar",
                    "author":"Charles Bukowski",
                    "year":"1978",
                    "image":"http://webtestpas.objetos.com.uy/books/img/follar.jpg"
                },
				
				{
					"title":"Cartero",
					"author":"Charles Bukowski",
					"year":"1971",
					"image":"http://webtestpas.objetos.com.uy/books/img/cartero.jpg"
				},

				{
                    "title":"La maquina de follar",
                    "author":"Charles Bukowski",
                    "year":"1978",
                    "image":"http://webtestpas.objetos.com.uy/books/img/follar.jpg"
                },
				
				{
					"title":"Cartero",
					"author":"Charles Bukowski",
					"year":"1971",
					"image":"http://webtestpas.objetos.com.uy/books/img/cartero.jpg"
				},

				{
                    "title":"La maquina de follar",
                    "author":"Charles Bukowski",
                    "year":"1978",
                    "image":"http://webtestpas.objetos.com.uy/books/img/follar.jpg"
                }

			];
			
			
			$scope.bookRequest=function(book)
			{
			
			  var modalOptions = {
                mType:'confirm',
                closeButtonText: 'Cancelar',
                actionButtonText: 'Solicitar',
                headerText: 'Solicitar libro',
                bodyText: 'Desea enviar una solicitud para "'+book.title+'"?'
              };
			
			 modalService.showModal({}, modalOptions)
                .then(function (result) {
					
					
                   
                });
			}
			
			
			
			
			
			


    }]);