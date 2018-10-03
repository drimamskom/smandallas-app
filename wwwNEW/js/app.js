// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.services','jett.ionic.filter.bar','angular.filter','ngCordova','chart.js','angularMoment','ionic.cloud'])

.run(function($ionicPlatform,AuthService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

/* END */


  /*  GET SAVE TOKEN */
  
        var push = PushNotification.init({
            android: {
                senderID: "844790024731",
                icon: "icon",
                iconColor: "white"
            }
        });

        push.on('registration', function(data) {
            // data.registrationId
            // alert('register: ' + data.registrationId);

            AuthService.storeClientID(data.registrationId);
            //console.log("REGISTER KE HOTLINE");
            //window.Hotline.updateRegistrationToken(data.registrationId);
            console.log("DATA " , data);
            console.log("TOKEN " , data.registrationId);
            // RequestsService.register(data.registrationId).then(function(response){
            //   alert('registered!');
            // });
        });

        push.on('notification', function(data) {
            // data.message,
            // data.title,
            // data.count,
            // data.sound,
            // data.image,
            // data.additionalData
            console.log("DATA " ,data);
            console.log("DATA ADD " , data.additionalData);
            console.log("FRIEND " , data.additionalData.friend);
            console.log("NIS " , data.additionalData.nis);

            //alert('notify: ' + data.message);
            
            
        });

        push.on('error', function(e) {
            // e.message
            alert('err: ' + e.message);
        });

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($ionicCloudProvider) {
  $ionicCloudProvider.init({
    "core": {
      "app_id": "b8f1d594"
    },
    "push": {
      "sender_id": "212042977698",
      "pluginConfig": {
        "ios": {
          "badge": true,
          "sound": true
        },
        "android": {
          "iconColor": "#343434"
        }
      }
    }
  });
})
.filter('rupiah', function () {
        return function (val) {
            while (/(\d+)(\d{3})/.test(val.toString())){
                val = val.toString().replace(/(\d+)(\d{3})/, '$1'+'.'+'$2');
            }
            var val = 'Rp' + val;
            return val;
        };
    })
.filter('unique', function() {
   return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });

      return output;
   };
})
.config(function (ChartJsProvider) {
  ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
.state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl'
  })

  .state('berita', {
    url: '/berita/:beritaId',
    templateUrl: 'templates/berita.html',
    controller: 'beritaCtrl'
  })
  .state('app.brt', {
      url: '/brt/:beritaId',
      views: {
        'menuContent': {
          templateUrl: 'templates/brt.html',
          controller:'brtCtrl'
        }
      }
    })
  
  
    //folder siswa
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/Siswa/menu.html',
    controller: 'AppCtrl',
        

  })

  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/Siswa/profile.html',
        controller: 'profCtrl'
      }
    }
  })
  .state('app.sms', {
    url: '/sms',
    views: {
      'menuContent': {
        templateUrl: 'templates/Siswa/sms.html',
        controller: 'smsCtrl'
      }
    }
  })
      .state('app.chat', {
    url: '/chat/:friend/:nis',
    templateUrl: 'templates/Siswa/chat.html',
     views: {
      'menuContent': {
        templateUrl: 'templates/Siswa/chat.html',
        controller: 'chatCtrl'
      }
    }
  })
  .state('app.user', {
    url: '/user',
    templateUrl: 'templates/Siswa/user.html',
     views: {
      'menuContent': {
        templateUrl: 'templates/Siswa/user.html',
        controller: 'userCtrl'
      }
}
  })
.state('app.nilai', {
    cache: false,
    url: '/nilai/:level/:nis',
    views: {
        'menuContent': {
    templateUrl: 'templates/Siswa/nilai.html',
    controller: 'nilaiCtrl'
  }
}
})
.state('app.bk', {
    url: '/bk/:level/:nis',
    views: {
        'menuContent': {
    templateUrl: 'templates/Siswa/bk.html',
    controller: 'bkCtrl'
  }
}
})
.state('app.keuangan', {
    url: '/keuangan/:level/:nis',
    views: {
        'menuContent': {
    templateUrl: 'templates/Siswa/keuangan.html',
    controller: 'keuanganCtrl'
  }
}
})
.state('app.hadir', {
    url: '/hadir/:level/:nis',
    views: {
        'menuContent': {
    templateUrl: 'templates/Siswa/hadir.html',
    controller: 'hadirCtrl'
  }
}
  })
    .state('app.home', {
      cache: false,
      url: '/home/:level/:nis',
      views: {
        'menuContent': {
          templateUrl: 'templates/Siswa/home.html',
          controller: 'homeCtrl'
        }
      }
    })

  .state('app.pesan', {
    url: '/pesan/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/Siswa/pesan.html',
        controller: 'pesanCtrl'
      }
    }
  })

  //folder wali siswa
    .state('wali', {
    url: '/wali',
    abstract: true,
    templateUrl: 'templates/Wali/menu.html',
    controller: 'waliCtrl',
        

  })

  .state('wali.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/Wali/profile.html',
        controller: 'profwCtrl'
      }
    }
  })
  .state('wali.sms', {
    url: '/sms',
    views: {
      'menuContent': {
        templateUrl: 'templates/Wali/sms.html',
        controller: 'smswCtrl'
      }
    }
  })
      .state('wali.chat', {
    url: '/chat/:friend/:nis',
    templateUrl: 'templates/Wali/chat.html',
     views: {
      'menuContent': {
        templateUrl: 'templates/Wali/chat.html',
        controller: 'chatwCtrl'
      }
    }
  })
  .state('wali.user', {
    url: '/user',
    templateUrl: 'templates/Wali/user.html',
     views: {
      'menuContent': {
        templateUrl: 'templates/Wali/user.html',
        controller: 'userwCtrl'
      }
}
  })
.state('wali.nilai', {
    cache: false,
    url: '/nilai/:level/:nis',
    views: {
        'menuContent': {
    templateUrl: 'templates/Wali/nilai.html',
    controller: 'nilaiwCtrl'
  }
}
})
.state('wali.bk', {
    url: '/bk/:level/:nis',
    views: {
        'menuContent': {
    templateUrl: 'templates/Wali/bk.html',
    controller: 'bkwCtrl'
  }
}
})
.state('wali.keuangan', {
    url: '/keuangan/:level/:nis',
    views: {
        'menuContent': {
    templateUrl: 'templates/Wali/keuangan.html',
    controller: 'keuanganwCtrl'
  }
}
})
.state('wali.hadir', {
    url: '/hadir/:level/:nis',
    views: {
        'menuContent': {
    templateUrl: 'templates/Wali/hadir.html',
    controller: 'hadirwCtrl'
  }
}
  })
    .state('wali.home', {
      cache: false,
      url: '/home/:level/:nis',
      views: {
        'menuContent': {
          templateUrl: 'templates/Wali/home.html',
          controller: 'homewCtrl'
        }
      }
    })

  .state('wali.pesan', {
    url: '/pesan/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/Wali/pesan.html',
        controller: 'pesanwCtrl'
      }
    }
  })
  
  //folder guru
  .state('guru', {
    url: '/guru',
    abstract: true,
    templateUrl: 'templates/Guru/menu.html',
    controller: 'guruCtrl',
        

  })

  .state('guru.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/Guru/profile.html',
        controller: 'profguruCtrl'
      }
    }
  })
  .state('guru.sms', {
    url: '/smsguru',
    views: {
      'menuContent': {
        templateUrl: 'templates/Guru/sms.html',
        controller: 'smsguruCtrl'
      }
    }
  })
      .state('guru.chat', {
    url: '/chatguru/:friend/:nis',
    templateUrl: 'templates/Guru/chat.html',
     views: {
      'menuContent': {
        templateUrl: 'templates/Guru/chat.html',
        controller: 'chatguruCtrl'
      }
    }
  })
  .state('guru.user', {
    url: '/userguru',
    templateUrl: 'templates/Guru/user.html',
     views: {
      'menuContent': {
        templateUrl: 'templates/Guru/user.html',
        controller: 'userguruCtrl'
      }
}
  })
.state('guru.nilai', {
    url: '/daftar_siswa/:level/:nis',
    views: {
        'menuContent': {
    templateUrl: 'templates/Guru/daftar_siswa.html',
    controller: 'dftrsisCtrl'
  }
}
})
.state('guru.dafsis', {
    url: '/daftar_siswa/:level/:nis',
    views: {
        'menuContent': {
    templateUrl: 'templates/Guru/daftar_siswa2.html',
    controller: 'dftrsisCtrl'
  }
}
})
.state('guru.listnilai', {
    cache: false,
    url: '/list_nilai/:kelas',
    views: {
        'menuContent': {
    templateUrl: 'templates/Guru/listnilai.html',
    controller: 'listnilaiCtrl'
  }
}
})
.state('guru.detsis', {
    url: '/detail_siswa/:kelas',
    views: {
        'menuContent': {
    templateUrl: 'templates/Guru/detail_siswa.html',
    controller: 'detsisCtrl'
  }
}
})
.state('guru.dapel', {
    url: '/dapel/:kelas',
    views: {
        'menuContent': {
    templateUrl: 'templates/Guru/dapel.html',
    controller: 'dapelCtrl'
  }
}
})
.state('guru.dafpel', {
    url: '/dafpel/:kelas',
    views: {
        'menuContent': {
    templateUrl: 'templates/Guru/dafpel.html',
    controller: 'dapelCtrl'
  }
}
})
.state('guru.entry', {
    url: '/entry_nilai/:nis',
    views: {
        'menuContent': {
    templateUrl: 'templates/Guru/entry_nilai.html',
    controller: 'entryCtrl'
  }
}
})
.state('guru.dapel1', {
    url: '/pelajaran/',
    views: {
        'menuContent': {
    templateUrl: 'templates/Guru/dapel1.html',
    controller: 'dapelCtrl'
  }
}
})
.state('guru.detpel', {
    url: '/detail_pelajaran/:level/:nis',
    views: {
        'menuContent': {
    templateUrl: 'templates/Guru/detail_pelajaran.html',
    controller: 'detpelCtrl'
  }
}
})
.state('guru.rekap', {
    url: '/rekap_nilai/:kelas/:pel',
    views: {
        'menuContent': {
    templateUrl: 'templates/Guru/rekap_nilai.html',
    controller: 'rekapCtrl'
  }
}
  })
    .state('guru.home', {
      url: '/home/:level/:nis',
      cache:false,
      views: {
        'menuContent': {
          templateUrl: 'templates/Guru/home.html',
          controller: 'homeguruCtrl'
        }
      }
    })

  .state('guru.pesan', {
    url: '/pesanguru/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/Guru/pesan.html',
        controller: 'pesanguruCtrl'
      }
    }
  })
  
  //folder bk
  .state('bk', {
    url: '/BK',
    abstract: true,
    templateUrl: 'templates/BK/menu.html',
    controller: 'mbkCtrl',
        

  })

 .state('bk.profile', {
    url: '/profilebk',
    views: {
      'menuContent': {
        templateUrl: 'templates/BK/profile.html',
        controller: 'profbkCtrl'
      }
    }
  })
  .state('bk.sms', {
    url: '/smsbk',
    views: {
      'menuContent': {
        templateUrl: 'templates/BK/sms.html',
        controller: 'smsbkCtrl'
      }
    }
  })
      .state('bk.chat', {
    url: '/chatbk/:friend/:nis',
    templateUrl: 'templates/BK/chat.html',
     views: {
      'menuContent': {
        templateUrl: 'templates/BK/chat.html',
        controller: 'chatCtrl'
      }
    }
  })
  .state('bk.user', {
    url: '/userbk',
    templateUrl: 'templates/BK/user.html',
     views: {
      'menuContent': {
        templateUrl: 'templates/BK/user.html',
        controller: 'userCtrl'
      }
}
  })
.state('bk.siswa', {
    url: '/daftar_siswa',
    views: {
        'menuContent': {
    templateUrl: 'templates/BK/daftar_siswa.html',
    controller: 'siswabkCtrl'
  }
}
})
.state('bk.siswa1', {
    url: '/daftar_siswa1/:kelas',
    views: {
        'menuContent': {
    templateUrl: 'templates/BK/daftar_siswa1.html',
    controller: 'siswabk1Ctrl'
  }
}
})
.state('bk.siswa2', {
    url: '/daftar_siswa2/:nis',
    views: {
        'menuContent': {
    templateUrl: 'templates/BK/daftar_siswa2.html',
    controller: 'siswabk2Ctrl'
  }
}
})
.state('bk.rekap', {
    url: '/rekap',
    views: {
        'menuContent': {
    templateUrl: 'templates/BK/rekap.html',
    controller: 'rekapbkCtrl' 
  }
}
})
.state('bk.rekap1', {
    url: '/rekap1/:kelas',
    views: {
        'menuContent': {
    templateUrl: 'templates/BK/rekap1.html',
    controller: 'rekapbk1Ctrl'
  }
}
})
.state('bk.absensi', {
    url: '/verifikasi_absensi',
    views: {
        'menuContent': {
    templateUrl: 'templates/BK/absensi.html',
    controller: 'absensibkCtrl'
  }
}
})
.state('bk.absensi1', {

    url: '/verifikasi_absensi1/:kelas',
    cache:false,
    views: {
        'menuContent': {
    templateUrl: 'templates/BK/absensi1.html',
    controller: 'absensibk1Ctrl'
  },
  params : {
        updated : true
    }
}
})
.state('bk.absensi2', {
    url: '/verifikasi_absensi2/:nis',
    views: {
        'menuContent': {
    templateUrl: 'templates/BK/absensi2.html',
    controller: 'absensibk2Ctrl'
  }
}
})
.state('bk.pelanggaran', {
    url: '/pelanggaran',
    views: {
        'menuContent': {
    templateUrl: 'templates/BK/pelanggaran.html',
    controller: 'pelanggaranbkCtrl'
  }
}
  })
.state('bk.pelanggaran1', {
    url: '/pelanggaran1/:kelas',
    cache: false,
    views: {
        'menuContent': {
    templateUrl: 'templates/BK/pelanggaran1.html',
    controller: 'pelanggaranbk1Ctrl'
  },
  params : {
        updated : true
    }
}
  })
.state('bk.pelanggaran2', {
    url: '/pelanggaran2/:kelas/:no',
    views: {
        'menuContent': {
    templateUrl: 'templates/BK/pelanggaran2.html',
    controller: 'pelanggaranbk2Ctrl'
  }
}
  })
    .state('bk.home', {
      url: '/home/:level/:nis',
      views: {
        'menuContent': {
          templateUrl: 'templates/BK/home.html',
          controller: 'homebkCtrl'
        }
      }
    })

  .state('bk.pesan', {
    url: '/pesanbk/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/BK/pesan.html',
        controller: 'pesanbkCtrl'
      }
    }
  }) 
  
  //folder admin
  .state('admin', {
    url: '/admin',
    abstract: true,
    templateUrl: 'templates/Admin/menu.html',
    controller: 'adminCtrl',
        

  })

  .state('admin.profile', {
    url: '/profileadmin',
    views: {
      'menuContent': {
        templateUrl: 'templates/Admin/profile.html',
        controller: 'profadminCtrl'
      }
    }
  })
  .state('admin.sms', {
    url: '/smsadmin',
    views: {
      'menuContent': {
        templateUrl: 'templates/Admin/sms.html',
        controller: 'smsadminCtrl'
      }
    }
  })
      .state('admin.chat', {
    url: '/chatadmin/:friend/:nis',
    templateUrl: 'templates/Admin/chat.html',
     views: {
      'menuContent': {
        templateUrl: 'templates/Admin/chat.html',
        controller: 'chatadminCtrl'
      }
    }
  })
  .state('admin.user', {
    url: '/useradmin',
    templateUrl: 'templates/Admin/user.html',
     views: {
      'menuContent': {
        templateUrl: 'templates/Admin/user.html',
        controller: 'useradminCtrl'
      }
}
  })
.state('admin.siswa', {
    url: '/daftar_siswa',
    views: {
        'menuContent': {
    templateUrl: 'templates/Admin/daftar_siswa.html',
    controller: 'siswaCtrl'
  }
}
})
.state('admin.siswa1', {
    url: '/daftar_siswa1/:kelas',
    views: {
        'menuContent': {
    templateUrl: 'templates/Admin/daftar_siswa1.html',
    controller: 'siswa1Ctrl'
  }
}
})
.state('admin.siswa2', {
    url: '/daftar_siswa2/:nis',
    views: {
        'menuContent': {
    templateUrl: 'templates/Admin/daftar_siswa2.html',
    controller: 'siswa2Ctrl'
  }
}
})
.state('admin.pesanadmin', {
    url: '/pesan_admin',
    views: {
        'menuContent': {
    templateUrl: 'templates/Admin/pesanadmin.html',
    controller: 'pesanadminCtrl'
  }
}
})
.state('admin.pesanadmin1', {
    url: '/pesan_admin1/:id',
    views: {
        'menuContent': {
    templateUrl: 'templates/Admin/pesanadmin1.html',
    controller: 'pesanadmin1Ctrl'
  }
}
})
.state('admin.pelajaran', {
    url: '/pelajaran',
    views: {
        'menuContent': {
    templateUrl: 'templates/Admin/pelajaran.html',
    controller: 'pelajaranCtrl'
  }
}
})
.state('admin.pelajaran1', {
    url: '/pelajaran1/:kelas',
    views: {
        'menuContent': {
    templateUrl: 'templates/Admin/pelajaran1.html',
    controller: 'pelajaran1Ctrl'
  }
}
})
.state('admin.akademik', {
    url: '/akademik',
    views: {
        'menuContent': {
    templateUrl: 'templates/Admin/akademik.html',
    controller: 'akademikCtrl'
  }
}
  })
.state('admin.akademiknilai', {
    url: '/akademiknilai',
    views: {
        'menuContent': {
    templateUrl: 'templates/Admin/akademiknilai.html',
    controller: 'akademiknilaiCtrl'
  }
}
  })
.state('admin.akademiknilai1', {
    url: '/akademiknilai1/:kelas',
    views: {
        'menuContent': {
    templateUrl: 'templates/Admin/akademiknilai1.html',
    controller: 'akademiknilai1Ctrl'
  }
}
  })
.state('admin.akademiknilai2', {
    url: '/akademiknilai2/:kel/:pel/:pela',
    views: {
        'menuContent': {
    templateUrl: 'templates/Admin/akademiknilai2.html',
    controller: 'akademiknilai2Ctrl'
  }
}
  })
.state('admin.akademikabsensi', {
    url: '/akademikabsensi',
    views: {
        'menuContent': {
    templateUrl: 'templates/Admin/akademikabsensi.html',
    controller: 'akademikabsensiCtrl'
  }
}
  })
.state('admin.akademikabsensi1', {
    url: '/akademikabsensi1/:kelas',
    views: {
        'menuContent': {
    templateUrl: 'templates/Admin/akademikabsensi1.html',
    controller: 'akademikabsensi1Ctrl'
  }
}
  })
.state('admin.akademikbk', {
    url: '/akademikbk',
    views: {
        'menuContent': {
    templateUrl: 'templates/Admin/akademikbk.html',
    controller: 'akademikbkCtrl'
  }
}
  })
.state('admin.akademikbk1', {
    url: '/akademikbk1/:kelas',
    views: {
        'menuContent': {
    templateUrl: 'templates/Admin/akademikbk1.html',
    controller: 'akademikbk1Ctrl'
  }
}
  })
    .state('admin.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/Admin/home.html',
          controller: 'homeadminCtrl'
        }
      }
    })

  .state('admin.pesan', {
    url: '/pesanadmin/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/Admin/pesan.html',
        controller: 'pesanadminCtrl'
      }
    }
  })

  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
/*if(window.localStorage.getItem('nis') === 0) {
  $urlRouterProvider.otherwise('/login');
}else{
var nis = window.localStorage.getItem('nis');
var level = window.localStorage.getItem('level');
  $urlRouterProvider.otherwise('/home/$level/$nis');
}*/
})
