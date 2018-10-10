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
    var baseUrl = 'http://sman18surabaya.sch.id/API/';
    return {

        

        // services untuk siswa
        regsis: function(reg) {
            console.log('fs',reg)
            return $http.post(baseUrl + 'regis.php', reg, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
         nilai: function (nis,jur){
            return $http.get(baseUrl+'nilai.php?nis='+nis+'&jur='+jur); 
        },
        bk: function (nis,jur){
            return $http.get(baseUrl+'bk.php?nis='+nis+'&jur='+jur); 
        },
        wlkls: function (nis,jur){
            return $http.get(baseUrl+'wali_kls.php?nis='+nis+'&jur='+jur); 
        },
        absenbk: function (kelas,m){
            return $http.get(baseUrl+'absenbk.php?kelas='+kelas+'&m='+m); 
        },
        absen: function (tgl){
            return $http.get(baseUrl+'listabsen.php?tgl='+tgl); 
        },
        keuangan: function (nis,jur){
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
        listkelas: function (jur){
            return $http.get(baseUrl+'listkelas.php?jur='+jur); 
        },
        listplg: function (jur){
            return $http.get(baseUrl+'lspelanggaran.php?jur='+jur); 
        },
        kalender: function (jur){
            return $http.get(baseUrl+'kalender.php?jur='+jur); 
        },
        pelanggaran: function (jur){
            return $http.get(baseUrl+'pelanggaran.php?jur='+jur); 
        },
        dplg: function (no,jur){
            return $http.get(baseUrl+'detplg.php?no='+no+'&jur='+jur); 
        },
        pelanggarankelas: function (kel,jur){
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
        detkelas: function (kel,jur){
            return $http.get(baseUrl+'detkel.php?kel='+kel); 
        },
        listnilai: function (kel,nis, jur){
        return $http.get(baseUrl+'listnilai.php?kel='+kel+'&nis='+nis+'&jur='+jur); 
        },
        dapel: function (nis,jur){
            return $http.get(baseUrl+'dapel.php?nig='+nis+'&jur='+jur); 
        },
        jadwal: function (kel,jur){
            return $http.get(baseUrl+'jadwal.php?kel='+kel+'&jur='+jur); 
        },
        entry: function(ent) {
            return $http.post(baseUrl + 'entry.php', ent, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        rekapbk: function (kel,jur){
            return $http.get(baseUrl+'rekapbk.php?kel='+kel+'&jur='+jur); 
        },
        rekapabsen: function (kel,jur){
            return $http.get(baseUrl+'rekapabsen.php?kel='+kel+'&jur='+jur); 
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
            return $http.get(baseUrl+"login.php?nis=" + login.nis + "&password=" + login.password + "&level="+login.level+"&hp="+login.hp);
        },
        getNis: function (nis,jur){
            return $http.get(baseUrl+'select_nis.php?nis='+nis+'&jur='+jur); 
        },
        penerima: function (gol,jur){
            return $http.get(baseUrl+'penerima.php?m='+gol+'&jur='+jur); 
        },
        penerimakel: function (kel,jur){
            return $http.get(baseUrl+'penerima.php?m=KELAS&kel='+kel+'&jur='+jur); 
        },
        siswa: function (nis,jur){
            return $http.get(baseUrl+'siswa.php?nis='+nis+'&jur='+jur); 
        },
        tok: function (nis,token,jur){
            return $http.get(baseUrl+'token.php?nis='+nis+'&tok='+token+'&jur='+jur); 
        },
        clear: function (nis,jur){
            return $http.get(baseUrl+'clear.php?nis='+nis+'&jur='+jur); 
        },
        clearbk: function (nis,jur){
            return $http.get(baseUrl+'clear.php?m=pelanggaran&nis='+nis+'&jur='+jur); 
        },
        auto: function (level,nis,no,jur){
            return $http.get(baseUrl+'autouser.php?level='+level+'&nis='+nis+'&no='+no+'&jur='+jur); 
        },
        notification: function(token,title,content,friend,nis,jur)
        {
            return $http.get(baseUrl+'notification.php?token='+token+'&title='+title+'&content='+content+'&friend='+friend+'&nis='+nis); 
        },
        nil: function (nis,jur){
            return $http.get(baseUrl+'nil.php?nis='+nis+'&jur='+jur); 
        },
        pesan: function (nis,level,jur){
            return $http.get(baseUrl+'pesan.php?nis='+nis+'&level='+level+'&jur='+jur); 
        },
         pesan2: function (nis,level,l,jur){
            return $http.get(baseUrl+'pesandua.php?nis='+nis+'&level='+level+'&flag='+l+'&jur='+jur); 
        },
        jumlahpesan: function (nis,level,l,jur){
            return $http.get(baseUrl+'pesandua.php?m=total&nis='+nis+'&level='+level+'&flag='+l+'&jur='+jur); 
        },
        pesanAdmin: function (jur){
            return $http.get(baseUrl+'pesan.php?jur='+jur); 
        },
        prof: function (nis,jur){
            return $http.get(baseUrl+'me.php?nis='+nis+'&jur='+jur); 
        },
        profbk: function (nis,jur){
            return $http.get(baseUrl+'me.php?l=bk&nis='+nis+'&jur='+jur); 
        },
        tampil: function (nis, friend,jur){
            return $http.get(baseUrl+'chatview.php?nis='+nis+'&friend='+friend+'&jur='+jur); 
        },
        user: function (jur){
            return $http.get(baseUrl+'user.php?jur='+jur); 
        },
         berita: function() {
            return $http.get(baseUrl+'berita.php');
        },
        beritaId: function (beritaId){
            return $http.get(baseUrl+'beritaid.php?bid='+beritaId); 
        },
        pesanid: function (id,jur){
            return $http.get(baseUrl+'pesanid.php?bid='+id+'&jur='+jur); 
        },
        chatcount: function (id,jur){
            return $http.get(baseUrl+'chatview.php?m=count&nis='+id+'&jur='+jur); 
        },
        chatclear: function (id,fr,jur){
            return $http.get(baseUrl+'chatview.php?m=read&nis='+id+'&friend='+fr+'&jur='+jur); 
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
