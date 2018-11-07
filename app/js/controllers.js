'use strict';
angular.module('SHAREBOOKSApp')
    .controller('RootCtrl', ['$scope','$rootScope','$routeParams', '$location','dataFactory','$window',
        function ($scope, $rootScope, $routeParams,  $location, dataFactory, $window) {
			
	    $rootScope.usuario={"logged_in":false};
            $rootScope.status={"hayerror":false,"success":false,"msg":null};
	    $rootScope.esLogout=false;
            $scope.status.hayerrorLogin=false;
            $rootScope.ajaxCount=0;
            $('nav').addClass('shrink');
	    $(".nav a").on("click", function(){
            	$(".nav").find(".active").removeClass("active");
   		$(this).parent().addClass("active");
	    });		

	    $location.path("/login");

            $rootScope.cerrarModal=function(modDiag){
                $(modDiag).modal('toggle');
            };

            $rootScope.logout=function(){
		$rootScope.esLogout=true;
                dataFactory.logout($rootScope.usuario.nroCliente)
                    .success(function(data,status){
                            $rootScope.usuario.logged_in=false;
                            $location.path("/login");
                 });
            }


    }]);


angular.module('SHAREBOOKSApp')
    .controller('LoginCtrl', ['$scope','$rootScope','$routeParams', '$location','$http', 'dataFactory',
        function ($scope, $rootScope, $routeParams,  $location, $http, dataFactory) {
            $rootScope.status = {"hayerror": false, "success": false, "msg": null};
            $rootScope.esLogout=false;
            $scope.loginUsr = {'username': null, 'password': null};

	    $scope.login=function()
	    {
       		var cliente = {'username': $scope.loginUsr.username, 'password': $scope.loginUsr.password};

            	dataFactory.login(cliente).error(function (error, status){
                        $scope.status.msgLogin = "Datos no validos";
       	               	$scope.status.hayerrorLogin = true;
               	}).success(function (data, status) {

			if (status == 200)
			{
                        	$http.defaults.headers.common['Authorization'] = "Token "+data.token;
		                $rootScope.usuario.logged_in=true;
                 		$location.url("/books");
                    	}
                 });


             }
	  $scope.signup=function()
	    {
       		var usuario = {'username': $scope.signupUsr.username, 'password': $scope.signupUsr.password,
				'rpassword': $scope.signupUsr.rpassword, 'email': $scope.signupUsr.email};
			//$rootScope.usuario.logged_in=true;
			//$location.url("/books");

            	dataFactory.signup(usuario).error(function (error, status){
                        $scope.status.msgLogin = "Datos no validos";
       	               	$scope.status.hayerrorLogin = true;
               	}).success(function (data, status) {

			if (status == 200)
			{
						$http.defaults.headers.common['Authorization'] = "Token "+data.token;
		                $rootScope.usuario.logged_in=true;
                 		$location.url("/home");
                    	}
                 });


             }


}]);

		

angular.module('SHAREBOOKSApp')
    .controller('BooksCtrl', ['$scope','$rootScope','$routeParams', '$location','$window','dataFactory','modalService',
        function ($scope, $rootScope, $routeParams,  $location, $window, dataFactory,modalService) {
           $rootScope.status={"hayerror":false,"success":false,"msg":null};
	   $scope.search_txt="";		   
	
	   dataFactory.books().success(function(data)
	   {
		$scope.books=data;	
           });
			
			
           $scope.bookRequest=function(book)
	   {
			
			var modalOptions = {
                		mType:'confirm',
                		closeButtonText: 'Cancelar',
                		actionButtonText: 'Solicitar',
                		headerText: 'Solicitar libro',
                		bodyText: 'Desea enviar una solicitud para "'+book.title+'"?'
               		};
			
			 modalService.showModal({}, modalOptions).then(function (result) {
						
				var req={'book':book.id};
				dataFactory.bookrequest(req).success(function(data)
				{
					
					//simular notificaciones
					


				});	

			 });
	   }

	  
       $scope.search=function()
       {
		dataFactory.books($scope.search_txt).success(function(data)
	        {
                	$scope.books=data;
           	});
       }

}]);





angular.module('SHAREBOOKSApp')
    .controller('MyBooksCtrl', ['$scope','$rootScope','$routeParams', '$location','$http', 'dataFactory','modalService',
    function ($scope, $rootScope, $routeParams,  $location, $http, dataFactory, modalService)
	{
			$rootScope.status={"hayerror":false,"success":false,"msg":null};
			$scope.book={title:'',author:'',year:'',image:'img/book.jpg'};
			
			            $scope.books=
			            [
			                {
			                    "title":"Cartero",
    		                    "author":"Charles Bukowski",
					            "year":"1971",
					            "image":"http://media.bookshare.com/cartero.jpg"
					        },
					        {
					            "title":"La maquina de follar",
					            "author":"Charles Bukowski",
					            "year":"1978",
					            "image":"http://media.bookshare.com/follar.jpg"
					        },
					        {
					            "title":"Cartero",
					            "author":"Charles Bukowski",
					            "year":"1971",
					            "image":"http://media.bookshare.com/cartero.jpg"
					         },
					         {
																																																														                    "title":"La maquina de follar",
				               	"author":"Charles Bukowski",
				               "year":"1978",
				               "image":"http://media.bookshare.com/follar.jpg"
						     },
						     {
						       "title":"Cartero",
						       "author":"Charles Bukowski",
						       "year":"1971",
						       "image":"http://media.bookshare.com//cartero.jpg"
						     },
						     {
						       "title":"La maquina de follar",
						       "author":"Charles Bukowski",
						       "year":"1978",
						       "image":"http://media.bookshare.com//follar.jpg"
						     }

                           ];


				$scope.delete=function(book)
				{
					 var modalOptions = {
                				mType:'confirm',
				                closeButtonText: 'Cancelar',
				                actionButtonText: 'Borrar',	
				                headerText: 'Borrar libro',
				                bodyText: 'Desea borrar "'+book.title+'"?'
              				};

                	         	modalService.showModal({}, modalOptions).then(function (result){
		
		        	        });				
				}				

				$scope.edit=function(book)
				{
					$scope.book=book;
					$('#editBookModal').modal('toggle');
				}

				$scope.new=function()
				{
                                        $('#newBookModal').modal('toggle');
				}

				$scope.editBook=function()
				{
					alert('submit changes')				
				}

				$scope.imageChange=function()
				{
					alert('image changes')
				}

}]);





angular.module('SHAREBOOKSApp')
    .controller('NotificationsCtrl', ['$scope','$rootScope','$routeParams', '$location','$http', 'dataFactory','modalService',
    function ($scope, $rootScope, $routeParams,  $location, $http, dataFactory, modalService)
    {
                $rootScope.status={"hayerror":false,"success":false,"msg":null};
                $scope.notifications=
                [
                        {type:'alert-info',title:'Calificacion',body:'Te han calificado con 5 estrellas!!',link:'#'},
                        {type:'alert-warning',title:'Solicitud',body:'Tienes una solicitud pendiente',link:'#'},
			{type:'alert-success',title:'Solicitud',body:'Tu solicitud se realizo correctamente',link:''}
                ];

}]);
