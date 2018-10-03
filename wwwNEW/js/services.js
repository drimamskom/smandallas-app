angular.module('starter.services', [])

.service('AuthService', ['$http' ,function($http) {

  var LOCAL_CLIENT_ID = 'myClientID';
  var myClientID;


  var storeClientID = function(clientID) {
    // store device token for push notification
    console.log('AUTHSERVICE_STORE-CLIENTID::', clientID);
    window.localStorage.setItem(LOCAL_CLIENT_ID, clientID);
  };
  var getClientID = function() {
    myClientID = window.localStorage.getItem(LOCAL_CLIENT_ID);
    console.log("GET CLIENT ID " ,myClientID);
    return myClientID;
  };
  return {
    getClientID: getClientID,
    storeClientID: storeClientID
  }
}])
.factory("transformRequestAsFormPost", function() {

        // I prepare the request data for the form post.
        function transformRequest( data, getHeaders ) {
            var headers = getHeaders();
            headers[ "Content-type" ] = "application/x-www-form-urlencoded; charset=utf-8";
            return( serializeData( data ) );
        }

        // Return the factory value.
        return( transformRequest );

        // ---
        // PRVIATE METHODS.
        // ---
        // I serialize the given Object into a key-value pair string. This
        // method expects an object and will default to the toString() method.
        // --
        // NOTE: This is an atered version of the jQuery.param() method which
        // will serialize a data collection for Form posting.
        // --
        // https://github.com/jquery/jquery/blob/master/src/serialize.js#L45
        function serializeData( data ) {
            // If this is not an object, defer to native stringification.
            if ( ! angular.isObject( data ) ) {
                return( ( data == null ) ? "" : data.toString() );
            }
            var buffer = [];
            // Serialize each key in the object.
            for ( var name in data ) {
                if ( ! data.hasOwnProperty( name ) ) {
                    continue;
                }
                var value = data[ name ];
                buffer.push(
                    encodeURIComponent( name ) +
                    "=" +
                    encodeURIComponent( ( value == null ) ? "" : value )
                );
            }
            // Serialize the buffer and clean it up for transportation.
            var source = buffer
                .join( "&" )
                .replace( /%20/g, "+" )
            ;
            return( source );
        }
    }
)

.factory('sekolahService', function($http,transformRequestAsFormPost) {
    var nis = '';
    var baseUrl = 'http://mob.sma-persatuan-tulangan.sch.id/API/';
    return {

        

        // services untuk siswa
        regsis: function(reg) {
            return $http.post(baseUrl + 'regis.php', reg, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
         nilai: function (nis){
            return $http.get(baseUrl+'nilai.php?nis='+nis); 
        },
        bk: function (nis){
            return $http.get(baseUrl+'bk.php?nis='+nis); 
        },
        absenbk: function (kelas,m){
            return $http.get(baseUrl+'absenbk.php?kelas='+kelas+'&m='+m); 
        },
        absen: function (tgl){
            return $http.get(baseUrl+'listabsen.php?tgl='+tgl); 
        },
        keuangan: function (nis){
            return $http.get(baseUrl+'keuangan.php?nis='+nis); 
        },
        hadir: function (nis,bln,thn){
            return $http.get(baseUrl+'hadir.php?nis='+nis+'&bln='+bln+'&thn='+thn); 
        },

        // services untuk guru
        regguru: function(reg) {
            return $http.post(baseUrl + 'regguru.php', reg, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        listkelas: function (){
            return $http.get(baseUrl+'listkelas.php'); 
        },
        listplg: function (){
            return $http.get(baseUrl+'lspelanggaran.php'); 
        },
        pelanggaran: function (){
            return $http.get(baseUrl+'pelanggaran.php'); 
        },
        dplg: function (no){
            return $http.get(baseUrl+'detplg.php?no='+no); 
        },
        pelanggarankelas: function (kel){
            return $http.get(baseUrl+'pelanggarankelas.php?kel='+kel); 
        },
        
        entryabsenbk: function(d) {
            return $http.post(baseUrl + 'absenbkentry.php', d, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                },
                transformRequest: transformRequestAsFormPost
            });
        },
        entryplg: function(d) {
            return $http.post(baseUrl + 'pelanggarankelas.php?m=e', d, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                },
                transformRequest: transformRequestAsFormPost
            });
        },
        detkelas: function (kel){
            return $http.get(baseUrl+'detkel.php?kel='+kel); 
        },
        listnilai: function (kel,nis){
        return $http.get(baseUrl+'listnilai.php?kel='+kel+'&nis='+nis); 
        },
        dapel: function (nis){
            return $http.get(baseUrl+'dapel.php?nig='+nis); 
        },
        jadwal: function (kel){
            return $http.get(baseUrl+'jadwal.php?kel='+kel); 
        },
        entry: function(ent) {
            return $http.post(baseUrl + 'entry.php', ent, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        rekapbk: function (kel){
            return $http.get(baseUrl+'rekapbk.php?kel='+kel); 
        },
        rekapabsen: function (kel){
            return $http.get(baseUrl+'rekapabsen.php?kel='+kel); 
        },
        rekap: function (kel,pel,nilai){
            return $http.get(baseUrl+'rkp.php?kel='+kel+'&pel='+pel+'&nilai='+nilai); 
        },

        // services untuk wali siswa
        regwali: function(reg) {
            return $http.post(baseUrl + 'regwali.php', reg, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },

        // services yang digunakan secara umum, artinya bisa digunakan untuk siswa, guru, bk ataupun admin
        //services yang digunakan untuk login
        login: function(login) {
            return $http.get("http://mob.sma-persatuan-tulangan.sch.id/API/login.php?nis=" + login.nis + "&password=" + login.password + "&level="+login.level+"");
        },
        getNis: function (nis){
            return $http.get(baseUrl+'select_nis.php?nis='+nis); 
        },
        penerima: function (gol){
            return $http.get(baseUrl+'penerima.php?m='+gol); 
        },
        penerimakel: function (kel){
            return $http.get(baseUrl+'penerima.php?m=KELAS&kel='+kel); 
        },
        siswa: function (nis){
            return $http.get(baseUrl+'siswa.php?nis='+nis); 
        },
        tok: function (nis,token){
            return $http.get(baseUrl+'token.php?nis='+nis+'&tok='+token); 
        },
        clear: function (nis){
            return $http.get(baseUrl+'clear.php?nis='+nis); 
        },
        clearbk: function (nis){
            return $http.get(baseUrl+'clear.php?m=pelanggaran&nis='+nis); 
        },
        auto: function (level,nis){
            return $http.get(baseUrl+'autouser.php?level='+level+'&nis='+nis); 
        },
        notification: function(token,title,content,friend,nis)
        {
            return $http.get(baseUrl+'notification.php?token='+token+'&title='+title+'&content='+content+'&friend='+friend+'&nis='+nis); 
        },
        nil: function (nis){
            return $http.get(baseUrl+'nil.php?nis='+nis); 
        },
        pesan: function (nis,level){
            return $http.get(baseUrl+'pesan.php?nis='+nis+'&level='+level); 
        },
        pesanAdmin: function (){
            return $http.get(baseUrl+'pesan.php'); 
        },
        prof: function (nis){
            return $http.get(baseUrl+'me.php?nis='+nis); 
        },
        profbk: function (nis){
            return $http.get(baseUrl+'me.php?l=bk&nis='+nis); 
        },
        tampil: function (nis, friend){
            return $http.get(baseUrl+'chatview.php?nis='+nis+'&friend='+friend); 
        },
        user: function (){
            return $http.get(baseUrl+'user.php'); 
        },
         berita: function() {
            return $http.get(baseUrl+'berita.php');
        },
        beritaId: function (beritaId){
            return $http.get(baseUrl+'beritaid.php?bid='+beritaId); 
        },
        pesanid: function (id){
            return $http.get(baseUrl+'pesanid.php?bid='+id); 
        },
        chat: function(chat) {
            return $http.post(baseUrl + 'chat.php', chat, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        kirim: function(pesan) {
            return $http.post(baseUrl + 'kirimpesan.php', pesan, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                },
                transformRequest: transformRequestAsFormPost
            });
        },
        update: function(prf) {
            return $http.post(baseUrl + 'profile.php', prf, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        berita: function(berita) {
            return $http.post(baseUrl + 'berita.php', berita, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        delete: function(id) {
            return $http.get(baseUrl + 'delete.php?id=' + id);
        },
        brt: function(brt) {}
    };
});
