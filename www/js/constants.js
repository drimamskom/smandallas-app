angular.module('starter')

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated'
})

.constant('API_ENDPOINT', {
  url: 'http://192.168.1.103/FCM/mob.sma-persatuan-tulangan.sch.id/API/'

  //Utilizar o link do servidor real para os aplicativos
  //url: 'http://64.137.249.103:8080/api'
  //  For a simulator use: url: 'http://127.0.0.1:8080/api'
});
