const app = angular.module('phoneShop', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/',{
            templateUrl: 'assets/template/list-phones.html',
            controller: 'phoneListCtrl'
        })
        .when('/basket',{
            templateUrl: 'assets/template/list-basket.html',
            controller: 'basketListCtrl'
        });
});

app.controller('phoneListCtrl', function($scope, $http) {
   $http.get('assets/js/sources/phones.json').then((data) =>{
       $scope.phones = data.data;
   }).catch((error)=>{
       console.log(error)
   });
   $scope.isRepeat = () => {
        document.querySelector('.notification').className = 'notification'
        setTimeout(() => {
            document.querySelector('.notification').className = 'notification hide';
        }, 3000)
   };
   $scope.addPhone = (name) => {
        var isRepeat = false;
        const baskets = JSON.parse(localStorage.getItem('basketPhones')) === null ? 
            []
            :
            JSON.parse(localStorage.getItem('basketPhones'));
        const phone = $scope.phones.filter((i)=>{if (name === i.name) return i });


        baskets.forEach(i => { i.name === name ? isRepeat = true : isRepeat = false  });

        if (isRepeat === false) {
            localStorage.setItem('basketPhones', JSON.stringify(baskets.concat(phone)))
        } else {
            $scope.isRepeat()
        }
   };
   
})

app.controller('basketListCtrl', function($scope) {
    $scope.basketPhones = JSON.parse(localStorage.getItem('basketPhones')) !== null ?
        JSON.parse(localStorage.getItem('basketPhones'))
        :
        []
    
    if ($scope.basketPhones.length === 0) document.querySelector('.notification').className = 'notification';
    
    $scope.removePhoneBasket = (phone) => {
        for (let i = 0; i < $scope.basketPhones.length; ++i) {
            if ($scope.basketPhones[i].name === phone.name) {
                $scope.basketPhones.splice(i, 1);
                localStorage.setItem('basketPhones', JSON.stringify($scope.basketPhones))
            }
        }
        if ($scope.basketPhones.length === 0) document.querySelector('.notification').className = 'notification';
    };
 })