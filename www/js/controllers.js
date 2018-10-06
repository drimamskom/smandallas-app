angular.module('starter.controllers', [])
    .controller('guruCtrl', function($scope, sekolahService, $ionicLoading, $rootScope, $ionicHistory, $state, $ionicPush) {
        $scope.nis = window.localStorage.getItem('nis');
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');
        $scope.user = function() {
            $ionicLoading.show();
            sekolahService.profbk($scope.nis, $scope.jurusan).success(function(user) {
                $scope.user = user[0];
                console.log('usr', $scope.user)
                $ionicLoading.hide();
            });
        };
        $scope.user();
        $scope.logout = function() {
            window.localStorage.clear();
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            $state.go('login');
        };
        $scope.$on('cloud:push:notification', function(event, data) {
            var msg = data.message;
            alert(msg.title + ': ' + msg.text);
        });
    })
    //controller guru
    .controller('homeguruCtrl', function($scope, $ionicLoading, $ionicLoading, $stateParams, $ionicPopup, $ionicModal, $state, sekolahService, $window, $ionicPush) {
        /*   $ionicPush.register().then(function(t) {
     return $ionicPush.saveToken(t);
                }).then(function(t) {
                console.log('Token saved:', t.token);
                });
    $scope.token = $ionicPush.saveToken(token);
//    $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');
    $scope.tok = function() {
      sekolahService.tok($stateParams.nis,$scope.token).success(function(data) {
        $ionicLoading.show(); 
            $scope.data = data;
            console.log(data);
            $ionicLoading.hide(); 
        })
    };
$scope.tok();
   */

        $scope.title = 'MENU UTAMA';
        $scope.homenu = [{
            judul: 'Nilai',
            icon: 'img/penilaian.ico'
        }, {
            judul: 'Keuangan',
            icon: 'img/keuangan.ico'
        }, {
            judul: 'Kehadiran',
            icon: 'img/absensi.ico'
        }, {
            judul: 'BK',
            icon: 'img/BK.ico'
        }];
        $scope.nis = window.localStorage.getItem('nis');
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');
        $scope.nilai = function() {
            $state.go('guru.nilai', {
                'level': $scope.level,
                'nis': $scope.nis
            });
        };
        $scope.dafsis = function() {
            $state.go('guru.dafsis', {
                'level': $scope.level,
                'nis': $scope.nis
            });
        };
        $scope.keuangan = function() {
            $state.go('guru.keuangan', {
                'level': $scope.level,
                'nis': $scope.nis
            });
        };
        $scope.detpel = function() {
            $state.go('guru.detpel', {
                'level': $scope.level,
                'nis': $scope.nis
            });
        };
        $scope.hadir = function() {
            $state.go('guru.hadir', {
                'level': $scope.level,
                'nis': $scope.nis
            });
        };
        $scope.jadwal = function() {
            $state.go('app.jadwal', {
                'kelas': $scope.level,
            });
        };
        $scope.bk = function() {
            $state.go('guru.bk', {
                'level': $scope.level,
                'nis': $scope.nis
            });
        };
        $scope.pesanc = function() {
            $ionicLoading.show();
            sekolahService.pesan($scope.nis, $scope.level, $scope.jurusan).success(function(pesan) {
                $scope.pesan = pesan;
                $ionicLoading.hide();
            });
        };
        $scope.pesanc();
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('listpesanguruCtrl', function($scope, $ionicLoading, $stateParams, sekolahService, $state, $window) {
        $scope.title = 'PESAN';

        $scope.nis = window.localStorage.getItem('nis');
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');
        $scope.back = function() {
            $window.history.go(-1);
        };
        $scope.pesanws = function() {
            $ionicLoading.show();
            sekolahService.pesan2($scope.nis, 'GURU', $scope.level, $scope.jurusan).success(function(pesan) {
                console.log('psn', pesan);
                $scope.pp = pesan;
                $scope.pan = pesan.length;
                console.log('pa', $scope.pp);
            })
        }
        $scope.pesanws();
        $scope.pesanc = function() {

            $scope.pesanws();
            $ionicLoading.show();
            sekolahService.pesan($scope.nis, $scope.level, $scope.jurusan).success(function(pesan) {
                $scope.pesan = pesan;
                console.log

            });
            $ionicLoading.hide();
        };

        $scope.pesanc();
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('entryCtrl', function($scope, $ionicLoading, $stateParams, $state, sekolahService, $window) {
        $scope.title = 'ENTRI NILAI';
        $scope.nis = window.localStorage.getItem('nis');
        $scope.shownis = function() {
            $ionicLoading.show();
            sekolahService.siswa($stateParams.nis, $scope.jurusan).success(function(siswa) {
                $scope.siswa = siswa;
                $ionicLoading.hide();
            });
        };
        $scope.shownis();
        $scope.triggerNotification = function(notif) {
            sekolahService.getNis($stateParams.nis, $scope.jurusan).success(function(data) {
                console.log("DATAkir ", data);
                sekolahService.notification(data[0].reg_id, 'Perubahan Nilai', notif, $stateParams.nis, $scope.nis).success(function(data) {
                    console.log("DATA ", data);
                    //$scope.tampil();
                });
                sekolahService.notification(data[1].reg_id, 'Perubahan Nilai', notif, $stateParams.nis, $scope.nis).success(function(data) {
                    console.log("DATA ", data);
                    //$scope.tampil();
                });
            });
        }
        $scope.nilai = {};
        $scope.kirim = function() {
            console.log("nilai ", $scope.nilai);
            if (!$scope.nilai) {
                $scope.showAlert({
                    title: "Information",
                    message: "Nilai tidak boleh kosong"
                });
            } else {
                sekolahService.entry({
                    pel: $scope.nis,
                    nis: $stateParams.nis,
                    nilai: $scope.nilai.nilai,
                    ujian: $scope.nilai.ujian,
                    jurusan: $scope.jurusan
                }).success(function(data) {
                    console.log("DATA ", data);
                    $scope.triggerNotification(data);
                });
            }
        };
        $scope.nis = window.localStorage.getItem('nis');
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');
        $scope.bk = function() {
            $state.go('app.bk', {
                'level': $scope.level,
                'nis': $scope.nis
            });
        };
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
        $window.OpenLink = function(link) {
            window.open(link, '_system');
        };
    }).controller('pelCtrl', function($scope, $ionicLoading, $stateParams, sekolahService, $state) {
        $scope.lskelas = function() {
            $ionicLoading.show();
            sekolahService.listkelas($scope.jurusan).success(function(lskelas) {
                $scope.lskelas = lskelas;
                $ionicLoading.hide();
            });
        };
        $scope.lskelas();
        $scope.nis = window.localStorage.getItem('nis');
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');
        $scope.keuangan = function() {
            $state.go('app.keuangan', {
                'level': $scope.level,
                'nis': $scope.nis
            });
        };
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('listnilaiCtrl', function($scope, $ionicLoading, $ionicLoading, $stateParams, $state, sekolahService) {
        $scope.title = 'DAFTAR NILAI';
        $scope.kelas = $stateParams.kelas;
        $scope.pelajaran = $stateParams.pelajaran;
        $scope.nis = window.localStorage.getItem('nis');
        $scope.lskelas = function() {
            $ionicLoading.show();
            sekolahService.listnilai($stateParams.kelas, $scope.nis, $scope.jurusan).success(function(lskelas) {
                $scope.lskelas = lskelas;
                $ionicLoading.hide();
            });
        };
        $scope.lskelas2 = function() {
            $ionicLoading.show();
            sekolahService.listnilai($stateParams.kelas, $scope.nis, $scope.jurusan).success(function(lskelas) {
                $scope.lskelas = lskelas;
                $ionicLoading.hide();
            });
        };



        $scope.lskelas2();
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('detpelCtrl', function($scope, $ionicLoading, $stateParams, sekolahService, $state) {
        $scope.title = 'PELAJARAN ';
        $scope.lskelas = function() {
            $ionicLoading.show();
            sekolahService.listkelas($scope.jurusan).success(function(lskelas) {
                $scope.lskelas = lskelas;
                $ionicLoading.hide();
            });
        };
        $scope.lskelas();
        $scope.lskelas2 = function() {
            $ionicLoading.show();
            sekolahService.listkelas($scope.jurusan).success(function(lskelas) {
                $scope.lskelas = lskelas;
                $ionicLoading.hide();
            });
        };
        $scope.nis = window.localStorage.getItem('nis');
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');
        $scope.keuangan = function() {
            $state.go('app.keuangan', {
                'level': $scope.level,
                'nis': $scope.nis
            });
        };
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('rekapCtrl', function($scope, $ionicLoading, $stateParams, sekolahService, $state) {
        $scope.title = 'REKAP NILAI';
        $scope.kel = $stateParams.kelas;
        $scope.pel = $stateParams.pel;
        $scope.nis = window.localStorage.getItem('nis');
        $scope.showSelectValue = function(nilai) {
            console.log(nilai);
        }
        $scope.showrkp = function(nilai) {
            console.log('nilai', nilai);
            if (nilai === 'NRAPORTK') {
                $ionicLoading.show();
                sekolahService.rekap($stateParams.kelas, $scope.nis, nilai).success(function(rekap) {
                    $scope.rekap = rekap;
                    1
                    console.log('nilai', $scope.nilai);
                    $ionicLoading.hide();
                    $scope.data = rekap.map(function(el) {
                        return el.tot;
                    });
                    $scope.label = rekap.map(function(el) {
                        return el.NRAPORTK;
                    });
                    $scope.getTotal = function() {
                        var total = 0;
                        for (var i = 0; i < $scope.rekap.length; i++) {
                            total += parseInt($scope.rekap[i].NRAPORTK, 10);
                        }
                        return total;
                    };
                    $scope.max = Math.max.apply(Math, $scope.label);
                    $scope.min = Math.min.apply(Math, $scope.label);
                    $scope.avg = $scope.getTotal() / $scope.rekap.length;
                    $scope.av = $scope.avg.toFixed()
                    console.log('rkp', $scope.avg.toFixed());
                });
            } else if (nilai === 'KDP') {
                $ionicLoading.show();
                sekolahService.rekap($stateParams.kelas, $scope.nis, nilai, $scope.jurusan).success(function(rekap) {
                    $scope.rekap = rekap;
                    $ionicLoading.hide();
                    $scope.data = rekap.map(function(el) {
                        return el.tot;
                    });
                    $scope.label = rekap.map(function(el) {
                        return el.KDP;
                    });
                    $scope.getTotal = function() {
                        var total = 0;
                        for (var i = 0; i < $scope.rekap.length; i++) {
                            total += parseInt($scope.rekap[i].KDP, 10);
                        }
                        return total;
                    };
                    $scope.max = Math.max.apply(Math, $scope.label);
                    $scope.min = Math.min.apply(Math, $scope.label);
                    $scope.avg = $scope.getTotal() / $scope.rekap.length;
                    $scope.av = $scope.avg.toFixed()
                    console.log('rkp', $scope.avg.toFixed());
                });
            } else if (nilai === 'KDK') {
                $ionicLoading.show();
                sekolahService.rekap($stateParams.kelas, $scope.nis, nilai, $scope.jurusan).success(function(rekap) {
                    $scope.rekap = rekap;
                    $ionicLoading.hide();
                    $scope.data = rekap.map(function(el) {
                        return el.tot;
                    });
                    $scope.label = rekap.map(function(el) {
                        return el.KDK;
                    });
                    $scope.getTotal = function() {
                        var total = 0;
                        for (var i = 0; i < $scope.rekap.length; i++) {
                            total += parseInt($scope.rekap[i].KDK, 10);
                        }
                        return total;
                    };
                    $scope.max = Math.max.apply(Math, $scope.label);
                    $scope.min = Math.min.apply(Math, $scope.label);
                    $scope.avg = $scope.getTotal() / $scope.rekap.length;
                    $scope.av = $scope.avg.toFixed()
                    console.log('rkp', $scope.avg.toFixed());
                });
            } else if (nilai === 'KDA') {
                $ionicLoading.show();
                sekolahService.rekap($stateParams.kelas, $scope.nis, nilai, $scope.jurusan).success(function(rekap) {
                    $scope.rekap = rekap;
                    $ionicLoading.hide();
                    $scope.data = rekap.map(function(el) {
                        return el.tot;
                    });
                    $scope.label = rekap.map(function(el) {
                        return el.KDA;
                    });
                    $scope.getTotal = function() {
                        var total = 0;
                        for (var i = 0; i < $scope.rekap.length; i++) {
                            total += parseInt($scope.rekap[i].KDA, 10);
                        }
                        return total;
                    };
                    $scope.max = Math.max.apply(Math, $scope.label);
                    $scope.min = Math.min.apply(Math, $scope.label);
                    $scope.avg = $scope.getTotal() / $scope.rekap.length;
                    $scope.av = $scope.avg.toFixed()
                    console.log('rkp', $scope.avg.toFixed());
                });
            } else if (nilai === 'UTSK') {
                $ionicLoading.show();
                sekolahService.rekap($stateParams.kelas, $scope.nis, nilai, $scope.jurusan).success(function(rekap) {
                    $scope.rekap = rekap;
                    $ionicLoading.hide();
                    $scope.data = rekap.map(function(el) {
                        return el.tot;
                    });
                    $scope.label = rekap.map(function(el) {
                        return el.UTSK;
                    });
                    $scope.getTotal = function() {
                        var total = 0;
                        for (var i = 0; i < $scope.rekap.length; i++) {
                            total += parseInt($scope.rekap[i].UTSK, 10);
                        }
                        return total;
                    };
                    $scope.max = Math.max.apply(Math, $scope.label);
                    $scope.min = Math.min.apply(Math, $scope.label);
                    $scope.avg = $scope.getTotal() / $scope.rekap.length;
                    $scope.av = $scope.avg.toFixed()
                    console.log('rkp', $scope.avg.toFixed());
                });
            } else if (nilai === 'UASP') {
                $ionicLoading.show();
                sekolahService.rekap($stateParams.kelas, $scope.nis, nilai, $scope.jurusan).success(function(rekap) {
                    $scope.rekap = rekap;
                    $ionicLoading.hide();
                    $scope.data = rekap.map(function(el) {
                        return el.tot;
                    });
                    $scope.label = rekap.map(function(el) {
                        return el.UASP;
                    });
                    $scope.getTotal = function() {
                        var total = 0;
                        for (var i = 0; i < $scope.rekap.length; i++) {
                            total += parseInt($scope.rekap[i].UASP, 10);
                        }
                        return total;
                    };
                    $scope.max = Math.max.apply(Math, $scope.label);
                    $scope.min = Math.min.apply(Math, $scope.label);
                    $scope.avg = $scope.getTotal() / $scope.rekap.length;
                    $scope.av = $scope.avg.toFixed()
                    console.log('rkp', $scope.avg.toFixed());
                });
            } else {
                $ionicLoading.show();
                sekolahService.rekap($stateParams.kelas, $scope.nis, nilai, $scope.jurusan).success(function(rekap) {
                    $scope.rekap = rekap;
                    $ionicLoading.hide();
                    $scope.data = rekap.map(function(el) {
                        return el.tot;
                    });
                    $scope.label = rekap.map(function(el) {
                        return el.KDP;
                    });
                    $scope.getTotal = function() {
                        var total = 0;
                        for (var i = 0; i < $scope.rekap.length; i++) {
                            total += parseInt($scope.rekap[i].KDP, 10);
                        }
                        return total;
                    };
                    $scope.max = Math.max.apply(Math, $scope.label);
                    $scope.min = Math.min.apply(Math, $scope.label);
                    $scope.avg = $scope.getTotal() / $scope.rekap.length;
                    $scope.av = $scope.avg.toFixed()
                    console.log('rkp', $scope.avg.toFixed());
                });
            }
        };
        // $scope.showrkp();
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');
        $scope.labels = ['7', '11', '14', '2'];
        $scope.series = ['Series A'];
        $scope.lab = $scope.rekap;
        // $scope.data = $scope.rekap;
        //  console.log('rp', $scope.rekap[0]);
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('dftrsisCtrl', function($scope, $ionicLoading, $ionicLoading, $stateParams, $state, sekolahService) {
        $scope.title = 'DAFTAR SISWA';
        $scope.nis = window.localStorage.getItem('nis');
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan', $scope.jurusan);
        console.log('df', $scope.nis)
        console.log('jr', $scope.jurusan)
        $scope.lskelas2 = function() {
            $ionicLoading.show();
            sekolahService.listkelas($scope.jurusan).success(function(lskelas) {
                $scope.lskelas = lskelas;
                $ionicLoading.hide();
            });
        };
        $scope.lskelas2();
        $scope.lskelas = function() {
            $ionicLoading.show();
            sekolahService.listkelas($scope.jurusan).success(function(lskelas) {
                $scope.lskelas = lskelas;
                $ionicLoading.hide();
            });
        };
        $scope.nilai = function() {
            $state.go('app.nilai', {
                'level': $scope.level,
                'nis': $scope.nis
            });
        };
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('detsisCtrl', function($scope, $ionicLoading, $ionicLoading, $stateParams, $state, sekolahService) {

        $scope.title = 'DETIL SISWA';
        $scope.kelas = $stateParams.kelas;
        $scope.nis = window.localStorage.getItem('nis');
        $scope.lskelas2 = function() {
            $ionicLoading.show();
            sekolahService.detkelas($stateParams.kelas, $scope.jurusan).success(function(lskelas) {
                $scope.lskelas = lskelas;
                $ionicLoading.hide();
            });
        };
        $scope.lskelas2();
        $scope.lskelas = function() {
            $ionicLoading.show();
            sekolahService.detkelas($stateParams.kelas, $scope.jurusan).success(function(lskelas) {
                $scope.lskelas = lskelas;
                $ionicLoading.hide();
            });
        };
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');
        $scope.nilai = function() {
            $state.go('app.nilai', {
                'level': $scope.level,
                'nis': $scope.nis
            });
        };
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('dapelCtrl', function($scope, $ionicLoading, $ionicLoading, $stateParams, $state, sekolahService) {
        $scope.title = 'DAFTAR PELAJARAN';
        $scope.kelas = $stateParams.kelas;
        $scope.nis = window.localStorage.getItem('nis');
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');
        console.log('ls', $scope.nis);
        $scope.liskelas = function() {
            $ionicLoading.show();
            sekolahService.dapel($scope.nis, $scope.jurusan).success(function(lskelas) {
                $scope.lskelas = lskelas;
                console.log('ls', $scope.lskelas)
                $ionicLoading.hide();
            });
        };
        $scope.liskelas();
        $scope.lskelas2 = function() {
            $ionicLoading.show();
            sekolahService.dapel($scope.nis, $scope.jurusan).success(function(lskelas) {
                $scope.lskelas = lskelas;
                $ionicLoading.hide();
            });
        };
        $scope.jadwalf = function() {
            $ionicLoading.show();
            sekolahService.jadwal($scope.kelas, $scope.jurusan).success(function(jadwal) {
                $scope.jadwal = jadwal;
                $ionicLoading.hide();
            });
        };
        $scope.jadwalf();
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('AppCtrl', function($scope, $ionicLoading, sekolahService, $rootScope, $ionicHistory, $state, $ionicPush) {
        $scope.nis = window.localStorage.getItem('nis');
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');


        $scope.user = function() {
            $ionicLoading.show();
            sekolahService.prof($scope.nis, $scope.jurusan).success(function(user) {
                $scope.user = user[0];
                console.log('usr', $scope.user, $scope.jurusan)
                $ionicLoading.hide();
            });
        };
        $scope.user();
        $scope.home = function() {
            $state.go('app.home', {
                'level': $scope.level,
                'nis': $scope.nis
            });
        };
        $scope.logout = function() {
            window.localStorage.removeItem('nis');
            window.localStorage.removeItem('level');
            $state.go('login');
        };
        $scope.$on('cloud:push:notification', function(event, data) {
            var msg = data.message;
            alert(msg.title + ': ' + msg.text);
        });
        //controller bk
    }).controller('homebkCtrl', function($scope, $ionicLoading, $ionicLoading, $stateParams, $state, sekolahService) {
        $scope.title = 'MENU UTAMA';
        $scope.awal = function() {
            $scope.nis = window.localStorage.getItem('nis');
            //window.localStorage.setItem('level', $stateParams.level);
        }
        $scope.awal();
        console.log('nis', $scope.nis);
        $scope.pesanc = function() {
            $ionicLoading.show();
            sekolahService.pesan($scope.nis, $scope.level, $scope.jurusan).success(function(pesan) {
                $scope.pesan = pesan;
                $ionicLoading.hide();
            });
        };
        $scope.pesanc();
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('mbkCtrl', function($scope, $ionicLoading, $rootScope, sekolahService, $ionicHistory, $state, $ionicPush) {
        $scope.nis = window.localStorage.getItem('nis');
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');
        $scope.user = function() {
            $ionicLoading.show();
            sekolahService.profbk($scope.nis, $scope.jurusan).success(function(user) {
                $scope.user = user[0];
                console.log('usr', $scope.user)
                $ionicLoading.hide();
            });
        };
        $scope.user();
        $scope.logout = function() {
            window.localStorage.removeItem('nis');
            window.localStorage.removeItem('level');
            $state.go('login');
        };
        $scope.$on('cloud:push:notification', function(event, data) {
            var msg = data.message;
            alert(msg.title + ': ' + msg.text);
        });
    }).controller('siswabkCtrl', function($scope, $ionicLoading, $rootScope, sekolahService, $ionicHistory, $state, $ionicPush) {
        $scope.title = 'DAFTAR SISWA';
        $scope.lskelas = function() {
            $ionicLoading.show();
            sekolahService.listkelas($scope.jurusan).success(function(lskelas) {
                $scope.lskelas = lskelas;
                $ionicLoading.hide();
            });
        };
        $scope.lskelas();
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('siswabk1Ctrl', function($scope, sekolahService, $stateParams, $ionicLoading, $rootScope, $ionicHistory, $state, $ionicPush) {
        $scope.title = 'DAFTAR SISWA';
        $scope.kelas = $stateParams.kelas;
        $scope.nis = window.localStorage.getItem('nis');
        $scope.lskelas2 = function() {
            $ionicLoading.show();
            sekolahService.detkelas($stateParams.kelas, $scope.jurusan).success(function(lskelas) {
                $scope.lskelas = lskelas;
                $ionicLoading.hide();
            });
        };
        $scope.lskelas2();
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('siswabk2Ctrl', function($scope, sekolahService, $stateParams, $ionicLoading, $rootScope, $ionicHistory, $state, $ionicPush) {
        //$scope.kelas = $stateParams.kelas;
        $scope.title = 'SISWA';

        $scope.nis = $stateParams.nis;
        $scope.lskelas2 = function() {
            $ionicLoading.show();
            sekolahService.siswa($stateParams.nis, $scope.jurusan).success(function(siswa) {
                $scope.siswa = siswa;
                $ionicLoading.hide();
            });
        };
        $scope.lskelas2();
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('absensibkCtrl', function($scope, $ionicLoading, sekolahService, $rootScope, $ionicHistory, $state, $ionicPush) {
        $scope.title = 'ABSENSI';
        var date = new Date();
        $scope.tgl = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        $scope.absen = function() {
            $ionicLoading.show();
            sekolahService.absen($scope.tgl, $scope.jurusan).success(function(lskelas) {
                $scope.lskelas = lskelas;
                $ionicLoading.hide();
            });
        };
        $scope.absen();
        console.log('tgl', $scope.tgl);
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('absensibk1Ctrl', function($scope, sekolahService, $stateParams, $ionicLoading, $rootScope, $ionicHistory, $state, $ionicPush) {
        $scope.title = 'ABSENSI';
        $scope.kelas = $stateParams.kelas;
        $scope.nis = localStorage.getItem('nis');
        var date = new Date();
        // $scope.bulan = date.getDate() + 1;
        $scope.bulan = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        $scope.absen = function() {
            $ionicLoading.show();
            sekolahService.absenbk($scope.kelas, $scope.bulan, $scope.jurusan).success(function(abs) {
                $scope.absenbk = abs;
                console.log($scope.absenbk, $scope.bulan);
                $ionicLoading.hide();
            });
        };
        $scope.absen();
        //$ionicConfigProvider.views.maxCache(0);
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('absensibk2Ctrl', function($scope, $window, sekolahService, $stateParams, $ionicLoading, $rootScope, $ionicHistory, $state, $ionicPush) {
        $scope.title = 'ABSENSI';
        $scope.nis2 = $stateParams.nis;
        $scope.nis = window.localStorage.getItem('nis');
        var date = new Date();
        $scope.date = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        $scope.bulan = date.getMonth() + 1;
        $scope.siswa = function() {
            $ionicLoading.show();
            sekolahService.siswa($scope.nis2, $scope.jurusan).success(function(sis) {
                $scope.siswa = sis;
                console.log("DATA ", $scope.siswa.NAMA, $scope.nis2);
                $ionicLoading.hide();
            });
        };
        $scope.siswa();
        $scope.st = [{
            status: 'hadir',
            skor: '1',
            kode: 'A202'
        }, {
            status: 'alpha',
            skor: '2',
            kode: 'A203'
        }, {
            status: 'ijin',
            skor: '3',
            kode: 'A204'
        }, {
            status: 'sakit',
            skor: '4',
            kode: 'A205'
        }];
        console.log("sta ", $scope.st);
        $scope.cetak = function() {
            console.log($scope.data, $scope.date);
        }
        $scope.data = {};
        $scope.triggerNotification = function(notif) {
            sekolahService.getNis($scope.data.nis, $scope.jurusan).success(function(data) {
                console.log("DATA ", data);
                sekolahService.notification(data[0].reg_id, 'Perubahan Status Absen', notif, $scope.data.nis, $scope.nis).success(function(data) {
                    console.log("DATA ", data);
                    //$scope.tampil();
                });
                sekolahService.notification(data[1].reg_id, 'Perubahan Status Absen', notif, $scope.data.nis, $scope.nis).success(function(data) {
                    console.log("DATA ", data);
                    //$scope.tampil();
                });
            });
        }
        $scope.entry = function() {
            console.log("data ", $scope.d);
            sekolahService.entryabsenbk({
                nis: $scope.data.nis,
                tgl: $scope.date,
                nama: $scope.data.nama,
                kel: $scope.data.kel,
                smt: $scope.data.smt,
                kode: $scope.data.kode,
                pel: $scope.data.status.status,
                fsTermNo: $scope.data.fstermno,
                skor: $scope.data.status.skor,
                kode: $scope.data.status.kode,
                // stat: $scope.data.status.stat,
                ket: $scope.data.ket,
                jurusan: $scope.jurusan
            }).success(function(data) {
                console.log("DATA ", data, $scope.data.kel);
                $scope.triggerNotification(data);
                $state.go('bk.absensi1', {
                    kelas: $scope.data.kel
                }, {
                    updated: true
                }, {
                    reload: true
                });
            });
        };
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('pelanggaranbkCtrl', function($scope, sekolahService, $ionicLoading, $rootScope, $ionicHistory, $state, $ionicPush) {
        $scope.title = 'PELANGGARAN';
        $scope.pelanggaran = function() {
            $ionicLoading.show();
            sekolahService.pelanggaran($scope.jurusan).success(function(pelanggaran) {
                $scope.pelanggaran = pelanggaran;
                $ionicLoading.hide();
            });
        };
        $scope.pelanggaran();
        $scope.berita = function() {
            berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('pelanggaranbk1Ctrl', function($scope, $stateParams, sekolahService, sekolahService, sekolahService, $ionicLoading, $rootScope, $ionicHistory, $state, $ionicPush) {
        $scope.title = 'PELANGGARAN';
        $scope.kelas = $stateParams.kelas;
        $scope.pelanggarankelas = function() {
            $ionicLoading.show();
            sekolahService.pelanggarankelas($scope.kelas, $scope.jurusan).success(function(pelanggarankelas) {
                $scope.pel = pelanggarankelas;
                $ionicLoading.hide();
            });
        };
        $scope.pelanggarankelas();
        $scope.kos = function() {
            $state.go('bk.pelanggaran2');
            //$scope.in = 1;
            console.log('kos', $scope.in);
        }
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('pelanggaranbk2Ctrl', function($scope, $ionicPopup, $stateParams, sekolahService, sekolahService, $ionicLoading, $rootScope, $ionicHistory, $state, $ionicPush) {
        $scope.title = 'PELANGGARAN';
        $scope.no = $stateParams.no;
        $scope.kelas = $stateParams.kelas;
        $scope.nis = localStorage.getItem('nis');
        $scope.in = 1;
        var date = new Date();
        $scope.date = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        $scope.detpel = function() {
            $ionicLoading.show();
            sekolahService.dplg($scope.no, $scope.jurusan, $scope.jurusan).success(function(plg) {
                $scope.pel = plg;
                // $scope.in = 0;
                $ionicLoading.hide();
                console.log('plg', $scope.pel, $scope.in);
            });
        };
        $scope.detpel();
        $scope.listplg = function() {
            $ionicLoading.show();
            sekolahService.listplg($scope.jurusan).success(function(plg) {
                $scope.lspel = plg;
                $ionicLoading.hide();
                console.log('lsplg', $scope.lspel);
            });
        };
        $scope.cetak = function() {
            $scope.d.skor = $scope.d.plg.SKOR;
            console.log($scope.d, $scope.date);
        }
        $scope.showPopup = function() {
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="d.plg.KODE">',
                title: 'Pelanggaran',
                subTitle: 'Masukkan Kode Pelanggaran',
                scope: $scope,
                buttons: [{
                    text: 'Cancel'
                }, {
                    text: '<b>Masukkan</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!$scope.d.plg.KODE) {
                            //don't allow the user to close unless he enters wifi password
                            e.preventDefault();
                        } else {
                            return $scope.d.plg.KODE;
                        }
                    }
                }, ]
            });
            myPopup.then(function(res) {
                $scope.res = res;
                $scope.res = $scope.d.plg.KODE;
                $scope.listplg();
                console.log($scope.d, $scope.date);
                //console.log('det', $scope.det[0].nominal);
                console.log('Tapped!', res);
                $ionicPopup.hide();
            });
        };
        $scope.showPopupn = function() {
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="d.nis">',
                title: 'Pelanggaran',
                subTitle: 'Masukkan NIS',
                scope: $scope,
                buttons: [{
                    text: 'Cancel'
                }, {
                    text: '<b>Masukkan</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!$scope.d.nis) {
                            //don't allow the user to close unless he enters wifi password
                            e.preventDefault();
                        } else {
                            return $scope.d.nis;
                        }
                    }
                }, ]
            });
            myPopup.then(function(rs) {
                $scope.rs = rs;
                $scope.rs = $scope.d.nis;
                $scope.in = 2;
                $scope.sis();
                console.log($scope.d, $scope.date);
                //console.log('det', $scope.det[0].nominal);
                console.log('Tapped!', rs);
                $ionicPopup.hide();
            });
        };
        $scope.sis = function() {
            $ionicLoading.show();
            sekolahService.siswa($scope.d.nis, $scope.jurusan).success(function(plg) {
                $scope.pel = plg;
                $ionicLoading.hide();
                console.log('plg', $scope.pel);
            });
        };
        $scope.triggerNotification = function(notif) {
            sekolahService.getNis($scope.d.nis, $scope.jurusan).success(function(data) {
                console.log("DATA ", data);
                sekolahService.notification(data[0].reg_id, 'Pelanggaran', notif, $scope.d.nis, $scope.nis).success(function(data) {
                    console.log("DATA ", data);
                    //$scope.tampil();
                });
                sekolahService.notification(data[1].reg_id, 'Pelanggaran', notif, $scope.d.nis, $scope.nis).success(function(data) {
                    console.log("DATA ", data);
                    //$scope.tampil();
                });
            });
        }
        $scope.d = {};
        $scope.entry = function() {
            console.log("data ", $scope.d);
            sekolahService.entryplg({
                NIS: $scope.d.nis,
                TGL: $scope.date,
                NAMA: $scope.d.nama,
                KELAS: $scope.d.kel,
                SMT: $scope.d.smt,
                KODE: $scope.d.plg.KODE,
                NAMAPLG: $scope.d.plg.NAMAPLG,
                JENIS: $scope.d.plg.JENIS,
                SKOR: $scope.d.plg.SKOR,
                SANGSI: $scope.d.plg.SANGSI,
                KETERANGAN: $scope.d.ket,
                jurusan: $scope.jurusan
            }).success(function(data) {
                console.log("DATA ", data);
                $scope.triggerNotification(data);
                $state.go('bk.pelanggaran1', {
                    kelas: $scope.d.kel
                }, {
                    updated: true
                }, {
                    reload: true
                });
            });
        };
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('rekapbkCtrl', function($scope, $ionicLoading, sekolahService, $rootScope, $ionicHistory, $state, $ionicPush) {
        $scope.title = 'REKAP DATA';
        $scope.pelanggaran = function() {
            $ionicLoading.show();
            sekolahService.pelanggaran($scope.jurusan).success(function(pelanggaran) {
                $scope.rekap = pelanggaran;
                console.log("rkp ", $scope.rekap);
                $ionicLoading.hide();
            });
        };
        $scope.pelanggaran();
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('rekapbk1Ctrl', function($scope, $stateParams, $ionicLoading, sekolahService, $rootScope, $ionicHistory, $state, $ionicPush) {
        $scope.kelas = $stateParams.kelas;
        $scope.rekap = function() {
            $ionicLoading.show();
            sekolahService.rekapbk($scope.kelas, $scope.jurusan).success(function(rkp) {
                $scope.rekap = rkp;
                $scope.rapi = rkp[1].jumlah;
                $scope.disiplin = rkp[0].jumlah;
                $scope.tertib = rkp[2].jumlah;
                $scope.sikap = rkp[3].jumlah;
                $scope.jumlah = rkp.map(function(el) {
                    return el.jumlah;
                });
                $scope.sem = rkp[0].SMT;
                console.log('tes', $scope.jumlah);
                console.log('rkp', $scope.rekap);
                $ionicLoading.hide();
            });
        };
        $scope.rekap();
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('profbkCtrl', function($scope, $state, $stateParams, $window, $timeout, $ionicModal,
        $ionicLoading, $ionicPopup, $ionicPlatform, $cordovaImagePicker, $cordovaCamera, $cordovaFile,
        $cordovaFileTransfer, $cordovaDevice, $cordovaActionSheet, sekolahService, $ionicPopup) {
        $scope.title = 'PROFILE';
        $scope.nis = window.localStorage.getItem('nis');
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');
        console.log('rp', $scope.nis);
        $scope.user = function() {
            $ionicLoading.show();
            sekolahService.profbk($scope.nis, $scope.jurusan).success(function(user) {
                $scope.user = user;
                $ionicLoading.hide();
            });
        };
        $scope.user();
        $scope.showCameraLib = function() {
                var options = {
                    title: 'Select Image Source',
                    buttonLabels: ['Load from Library', 'Use Camera'],
                    addCancelButtonWithLabel: 'Cancel',
                    androidEnableCancelButton: true,
                };
                $scope.selectPicture(Camera.PictureSourceType.PHOTOLIBRARY);
            }
            // refer to this link: https://devdactic.com/ionic-image-upload-php/
        $scope.selectPicture = function(sourceType) {
            var options = {
                // quality: 100,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: sourceType,
                saveToPhotoAlbum: false
            };
            $cordovaCamera.getPicture(options).then(function(imagePath) {
                // Grab the file name of the photo in the temporary directory
                var currentName = imagePath.replace(/^.*[\\\/]/, '');
                //Create a new name for the photo
                var d = new Date(),
                    n = d.getTime(),
                    newFileName = n + ".jpg";
                // If you are trying to load image from the gallery on Android we need special treatment!
                if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
                    window.FilePath.resolveNativePath(imagePath, function(entry) {
                        window.resolveLocalFileSystemURL(entry, success, fail);

                        function fail(e) {
                            console.error('Error: ', e);
                        }

                        function success(fileEntry) {
                            var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
                            // Only copy because of access rights
                            $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function(success) {
                                $scope.image = newFileName;
                            }, function(error) {
                                $scope.showAlert(error.exception);
                            });
                        };
                    });
                } else {
                    var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                    // Move the file to permanent storage
                    $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function(success) {
                        $scope.image = newFileName;
                    }, function(error) {
                        $scope.showAlert(error.exception);
                    });
                }
            }, function(err) {
                // Not always an error, maybe cancel was pressed...
                $scope.showAlert('loading from library error');
            })
        };
        $scope.simpan = function(nis, nama, alamat, no, keterangan) {
            $scope.nama = nama;
            $scope.alamat = alamat;
            $scope.keterangan = keterangan;
            $scope.no = no;
            var url = "http://mob.sma-persatuan-tulangan.sch.id/API/profile.php?l=bk&nis=" + $scope.nis;
            // File for Upload
            var targetPath = $scope.pathForImage($scope.image);
            // File name only
            var filename = $scope.image;
            var options = {
                fileKey: "foto", //transfer_receipt
                fileName: filename,
                chunkedMode: false,
                mimeType: "multipart/form-data",
                params: {
                    'nis': nis,
                    'nama': nama,
                    'alamat': alamat,
                    'foto': filename,
                }
            };
            $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
                $ionicLoading.hide();
                var response = JSON.parse(result.response);
                if (response.success) {
                    $ionicPopup.alert({
                        title: "Sukses",
                        template: "Profile berhasil diperbarui",
                        okText: 'Ok',
                        okType: 'button-dark'
                    });

                } else {
                    $scope.showAlert('Gagal upload foto');
                }
            }, function(err) {
                $ionicLoading.hide();
                $scope.showAlert('Terjadi kesalahan, gagal upload foto');
            });
        }
        $scope.pathForImage = function(image) {
            if (image === null) {
                return '';
            } else {
                return cordova.file.dataDirectory + image;
            }
        };
        $scope.showAlert = function(message) {
            $ionicPopup.alert({
                title: "Error",
                template: message,
                okText: 'Ok',
                okType: 'button-dark'
            });
        }
        $ionicModal.fromTemplateUrl('edit.html', function(modal) {
            $scope.taskModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });
        $scope.showAlert = function(msg) {
            $ionicPopup.alert({
                title: msg.title,
                template: msg.message,
                okText: 'Ok',
                okType: 'button-positive'
            });
        };
        $scope.editModal = function() {
            $scope.taskModal.show();
        };
        $scope.batal = function() {
            $scope.taskModal.hide();
            $scope.user();
        };
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    })
    //controller admin
    .controller('adminCtrl', function($scope, $ionicLoading, $ionicHistory, $ionicLoading, $stateParams, $state, sekolahService) {
        $scope.logout = function() {
            window.localStorage.clear();
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            $state.go('login');
            console.log('udah');
        };
    }).controller('homeadminCtrl', function($scope, $ionicLoading, $ionicLoading, $stateParams, $state, sekolahService) {
        $scope.title = 'MENU UTAMA';
        $scope.beritas = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
                console.log($scope.berita);
            });
        };
        $scope.beritas();
    }).controller('siswaCtrl', function($scope, $ionicLoading, $ionicLoading, $stateParams, $state, sekolahService) {
        $scope.title = 'SISWA';
        $scope.lskelas = function() {
            $ionicLoading.show();
            sekolahService.listkelas($scope.jurusan).success(function(lskelas) {
                $scope.lskelas = lskelas;
                $ionicLoading.hide();
                console.log($scope.lskelas);
            });
        };
        $scope.lskelas();
        $scope.beritas = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
                console.log($scope.berita);
            });
        };
        $scope.beritas();
    }).controller('siswa1Ctrl', function($scope, $ionicLoading, $ionicLoading, $stateParams, $state, sekolahService) {
        $scope.title = 'SISWA';
        $scope.lskelas2 = function() {
            $ionicLoading.show();
            sekolahService.detkelas($stateParams.kelas, $scope.jurusan).success(function(lskelas) {
                $scope.lskelas = lskelas;
                $ionicLoading.hide();
            });
        };
        $scope.lskelas2();
        $scope.beritas = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
                console.log($scope.berita);
            });
        };
        $scope.beritas();
    }).controller('siswa2Ctrl', function($scope, $ionicLoading, $ionicLoading, $stateParams, $state, sekolahService) {
        $scope.title = 'SISWA';
        $scope.shownis = function() {
            $ionicLoading.show();
            sekolahService.siswa($stateParams.nis, $scope.jurusan).success(function(siswa) {
                $scope.siswa = siswa;
                $ionicLoading.hide();
            });
        };
        $scope.shownis();
        $scope.beritas = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
                console.log($scope.berita);
            });
        };
        $scope.beritas();
    }).controller('pelajaranCtrl', function($scope, $ionicLoading, $ionicLoading, $stateParams, $state, sekolahService) {
        $scope.title = 'PELAJARAN';
        $scope.lskelas = function() {
            $ionicLoading.show();
            sekolahService.listkelas().success(function(lskelas) {
                $scope.lskelas = lskelas;
                $ionicLoading.hide();
                console.log($scope.lskelas);
            });
        };
        $scope.lskelas();
        $scope.beritas = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
                console.log($scope.berita);
            });
        };
        $scope.beritas();
    }).controller('pelajaran1Ctrl', function($scope, $ionicLoading, $ionicLoading, $stateParams, $state, sekolahService) {
        $scope.title = 'PELAJARAN';
        $scope.kelas = $stateParams.kelas;
        $scope.jadwals = function() {
            $ionicLoading.show();
            sekolahService.jadwal($scope.kelas, $scope.jurusan).success(function(jadwal) {
                $scope.jadwal = jadwal;
                $ionicLoading.hide();
            });
        };
        $scope.jadwals();
        $scope.beritas = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
                console.log($scope.berita);
            });
        };
        $scope.beritas();
    }).controller('pesanadminCtrl', function($scope, $ionicLoading, $ionicLoading, $stateParams, $state, sekolahService) {
        $scope.title = 'PESAN';
        $scope.nis = window.localStorage.getItem('nis');
        var date = new Date();
        $scope.jam = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        //  $scope.jam = date.format("dd/MM/yyyy hh:mm TT");
        $scope.pesan = {};
        $scope.loadpenerima = function() {
            $ionicLoading.show();
            sekolahService.penerima($scope.pesan.tujuan, $scope.jurusan).success(function(pen) {
                $scope.pen = pen;
                $scope.penerima = $scope.pen[0];
                $scope.id = $scope.pen[1];
                $scope.idpenerima = parseInt($scope.id[0].id) + 1;
                console.log($scope.penerima[0].reg_id, $scope.idpenerima, $scope.jam);
                $ionicLoading.hide();
            });
        };
        $scope.loadkelas = function() {
            $ionicLoading.show();
            // console.log('sis1');
            if ($scope.pesan.kelas == 'SISWA') {
                sekolahService.penerima($scope.pesan.tujuan, $scope.jurusan).success(function(pen) {
                    $scope.pen = pen;
                    $scope.penerima = $scope.pen[0];
                    $scope.id = $scope.pen[1];
                    $scope.idpenerima = parseInt($scope.id[0].id) + 1;
                    console.log($scope.penerima[0].reg_id, $scope.idpenerima, $scope.jam);
                    $ionicLoading.hide();
                });
            } else if ($scope.pesan.kelas == 'WALI SISWA') {
                sekolahService.penerima($scope.pesan.tujuan, $scope.jurusan).success(function(pen) {
                    $scope.pen = pen;
                    $scope.penerima = $scope.pen[0];
                    $scope.id = $scope.pen[1];
                    $scope.idpenerima = parseInt($scope.id[0].id) + 1;
                    console.log($scope.penerima[0].reg_id, $scope.idpenerima, $scope.jam);
                    $ionicLoading.hide();
                });
            } else if ($scope.pesan.kelas == 'WALISIS') {
                sekolahService.penerima($scope.pesan.tujuan, $scope.jurusan).success(function(pen) {
                    $scope.pen = pen;
                    $scope.penerima = $scope.pen[0];
                    $scope.id = $scope.pen[1];
                    $scope.idpenerima = parseInt($scope.id[0].id) + 1;
                    console.log($scope.penerima[0].reg_id, $scope.idpenerima, $scope.jam);
                    $ionicLoading.hide();
                });
            } else {
                sekolahService.penerimakel($scope.pesan.kelas, $scope.jurusan).success(function(pen) {
                    $scope.pen = pen;
                    console.log('pen', $scope.pen, $scope.pesan.kelas);
                    $scope.penerima = $scope.pen[0];
                    $scope.id = $scope.pen[1];
                    $scope.idpenerima = parseInt($scope.id[0].id) + 1;
                    console.log('sis', $scope.idpenerima, $scope.jam);
                    $ionicLoading.hide();
                });
            }
        };
        $scope.hist = function() {
            $ionicLoading.show();
            sekolahService.pesanAdmin($scope.jurusan).success(function(pesan) {
                $scope.history = pesan;
                $ionicLoading.hide();
            });
        };
        $scope.hist();
        $scope.triggerNotification = function(notif, regid, nis, target, i) {


            sekolahService.notification(regid, 'Pesan baru', notif, nis, $scope.nis).success(function(data) {
                console.log("DATA ", data);
                //$scope.tampil();

            });


        }
        $scope.tutup = function() {
            console.log('reload');
        }
        $scope.kirim = function() {
            console.log('pjg', $scope.penerima.length);
            if ($scope.pesan.tujuan == 'WALISIS') {
                for (var i = 0; i < $scope.penerima.length; i++) {
                    $scope.regid = $scope.penerima[i].reg_id;
                    $scope.nispen = $scope.penerima[i].nis;
                    $ionicLoading.show();
                    sekolahService.kirim({
                        'nis': $scope.penerima[i].nis,
                        'id': $scope.idpenerima,
                        'isi': $scope.pesan.isi,
                        'tujuan': $scope.pesan.tujuan,
                        'flag': $scope.penerima[i].level,
                        'jam': $scope.jam
                    }).success(function(data) {
                        // $scope.target = $scope.penerima.length-1;
                        $scope.penerima1 = data;

                    });
                    $scope.triggerNotification($scope.pesan.isi, $scope.penerima[i].reg_id, $scope.nispen, $scope.penerima.length, i);

                    // return $scope.regid == reg_id;
                    console.log('regid', $scope.penerima[i].nis, $scope.penerima[i].reg_id, i);
                    $ionicLoading.hide();
                }
            } else {
                for (var i = 0; i < $scope.penerima.length; i++) {
                    $scope.regid = $scope.penerima[i].reg_id;
                    $scope.nispen = $scope.penerima[i].nis;
                    $ionicLoading.show();
                    sekolahService.kirim({
                        'nis': $scope.penerima[i].nis,
                        'id': $scope.idpenerima,
                        'isi': $scope.pesan.isi,
                        'tujuan': $scope.pesan.tujuan,
                        //'flag': $scope.penerima[i].level,
                        'jam': $scope.jam
                    }).success(function(data) {
                        // $scope.target = $scope.penerima.length-1;
                        $scope.penerima1 = data;

                    });
                    $scope.triggerNotification($scope.pesan.isi, $scope.penerima[i].reg_id, $scope.nispen, $scope.penerima.length, i);

                    // return $scope.regid == reg_id;
                    console.log('regid', $scope.penerima[i].nis, $scope.penerima[i].reg_id, i);
                    $ionicLoading.hide();
                }
            }

            console.log('sdh');
            $scope.hist();
        }
        $scope.lskelas = function() {
            $ionicLoading.show();
            sekolahService.listkelas($scope.jurusan).success(function(lskelas) {
                $scope.lskelas = lskelas;
                $ionicLoading.hide();
                console.log($scope.lskelas);
            });
        };
        $scope.lskelas();
        $scope.beritas = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
                console.log($scope.berita);
            });
        };
        $scope.beritas();
    }).controller('pesanadmin1Ctrl', function($scope, $ionicLoading, $ionicLoading, $stateParams, $state, sekolahService, $ionicLoading) {
        $scope.title = 'PESAN';
        $scope.pesid = $stateParams.id;
        $scope.pesan = function() {
            $ionicLoading.show();
            sekolahService.pesanAdmin($scope.jurusan).success(function(pesan) {
                $scope.history = pesan;
                $ionicLoading.hide();
            });
        };
        $scope.pesan();
        $scope.beritas = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
                console.log($scope.berita);
            });
        };
        $scope.beritas();
    }).controller('akademikCtrl', function($scope, $ionicLoading, $ionicLoading, $stateParams, $state, sekolahService) {
        $scope.title = 'AKADEMIK';
        $scope.beritas = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
                console.log($scope.berita);
            });
        };
        $scope.beritas();
    }).controller('akademiknilaiCtrl', function($scope, $ionicLoading, $ionicLoading, $stateParams, $state, sekolahService) {
        $scope.title = 'AKADEMIK';
        $scope.lskelas = function() {
            $ionicLoading.show();
            sekolahService.listkelas($scope.jurusan).success(function(lskelas) {
                $scope.lskelas = lskelas;
                $ionicLoading.hide();
                console.log($scope.lskelas);
            });
        };
        $scope.lskelas();
        $scope.beritas = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
                console.log($scope.berita);
            });
        };
        $scope.beritas();
    }).controller('akademiknilai1Ctrl', function($scope, $ionicLoading, $ionicLoading, $stateParams, $state, sekolahService) {
        $scope.title = 'AKADEMIK';
        $scope.kelas = $stateParams.kelas;
        $scope.jadwals = function() {
            $ionicLoading.show();
            sekolahService.jadwal($scope.kelas, $scope.jurusan).success(function(jadwal) {
                $scope.jadwal = jadwal;
                $ionicLoading.hide();
                console.log($scope.jadwal);
            });
        };
        $scope.jadwals();
        $scope.beritas = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.beritas();
    }).controller('akademiknilai2Ctrl', function($scope, $ionicLoading, $stateParams, sekolahService, $state) {
        $scope.title = 'AKADEMIK';
        $scope.nil = {};
        $scope.pel = $stateParams.pel;
        $scope.pela = $stateParams.pela;
        $scope.kelas = $stateParams.kel;
        $scope.nis = window.localStorage.getItem('nis');
        $scope.showSelectValue = function(nilai) {
            console.log(nilai);
        }
        $scope.showrkp = function(nilai) {
            console.log('nilai', nilai);
            if (nilai === 'NRAPORTK') {
                $ionicLoading.show();
                sekolahService.rekap($scope.nil.kel, $scope.pel, nilai, $scope.jurusan).success(function(rekap) {
                    $ionicLoading.show();
                    $scope.rekap = rekap;
                    console.log('nilai', $scope.nilai);
                    $ionicLoading.hide();
                    $scope.data = rekap.map(function(el) {
                        return el.tot;
                    });
                    $scope.label = rekap.map(function(el) {
                        return el.NRAPORTK;
                    });
                    $scope.getTotal = function() {
                        var total = 0;
                        for (var i = 0; i < $scope.rekap.length; i++) {
                            total += parseInt($scope.rekap[i].NRAPORTK, 10);
                        }
                        return total;
                    };
                    $scope.max = Math.max.apply(Math, $scope.label);
                    $scope.min = Math.min.apply(Math, $scope.label);
                    $scope.avg = $scope.getTotal() / $scope.rekap.length;
                    $scope.av = $scope.avg.toFixed()
                    console.log('rkp', $scope.avg.toFixed(), $scope.kel);
                });
            } else if (nilai === 'KDP') {
                $ionicLoading.show();
                sekolahService.rekap($scope.nil.kel, $scope.pel, nilai, $scope.jurusan).success(function(rekap) {
                    $scope.rekap = rekap;
                    $ionicLoading.hide();
                    $scope.data = rekap.map(function(el) {
                        return el.tot;
                    });
                    $scope.label = rekap.map(function(el) {
                        return el.KDP;
                    });
                    $scope.getTotal = function() {
                        var total = 0;
                        for (var i = 0; i < $scope.rekap.length; i++) {
                            total += parseInt($scope.rekap[i].KDP, 10);
                        }
                        return total;
                    };
                    $scope.max = Math.max.apply(Math, $scope.label);
                    $scope.min = Math.min.apply(Math, $scope.label);
                    $scope.avg = $scope.getTotal() / $scope.rekap.length;
                    $scope.av = $scope.avg.toFixed()
                    console.log('rkp', $scope.avg.toFixed(), $scope.nil, $scope.pel);
                });
            } else if (nilai === 'KDK') {
                $ionicLoading.show();
                sekolahService.rekap($scope.nil.kel, $scope.pel, nilai, $scope.jurusan).success(function(rekap) {
                    $scope.rekap = rekap;
                    $ionicLoading.hide();
                    $scope.data = rekap.map(function(el) {
                        return el.tot;
                    });
                    $scope.label = rekap.map(function(el) {
                        return el.KDK;
                    });
                    $scope.getTotal = function() {
                        var total = 0;
                        for (var i = 0; i < $scope.rekap.length; i++) {
                            total += parseInt($scope.rekap[i].KDK, 10);
                        }
                        return total;
                    };
                    $scope.max = Math.max.apply(Math, $scope.label);
                    $scope.min = Math.min.apply(Math, $scope.label);
                    $scope.avg = $scope.getTotal() / $scope.rekap.length;
                    $scope.av = $scope.avg.toFixed()
                    console.log('rkp', $scope.avg.toFixed());
                });
            } else if (nilai === 'KDA') {
                $ionicLoading.show();
                sekolahService.rekap($scope.nil.kel, $scope.pel, nilai, $scope.jurusan).success(function(rekap) {
                    $scope.rekap = rekap;
                    $ionicLoading.hide();
                    $scope.data = rekap.map(function(el) {
                        return el.tot;
                    });
                    $scope.label = rekap.map(function(el) {
                        return el.KDA;
                    });
                    $scope.getTotal = function() {
                        var total = 0;
                        for (var i = 0; i < $scope.rekap.length; i++) {
                            total += parseInt($scope.rekap[i].KDA, 10);
                        }
                        return total;
                    };
                    $scope.max = Math.max.apply(Math, $scope.label);
                    $scope.min = Math.min.apply(Math, $scope.label);
                    $scope.avg = $scope.getTotal() / $scope.rekap.length;
                    $scope.av = $scope.avg.toFixed()
                    console.log('rkp', $scope.avg.toFixed());
                });
            } else if (nilai === 'UTSK') {
                $ionicLoading.show();
                sekolahService.rekap($scope.nil.kel, $scope.pel, nilai, $scope.jurusan).success(function(rekap) {
                    $scope.rekap = rekap;
                    $ionicLoading.hide();
                    $scope.data = rekap.map(function(el) {
                        return el.tot;
                    });
                    $scope.label = rekap.map(function(el) {
                        return el.UTSK;
                    });
                    $scope.getTotal = function() {
                        var total = 0;
                        for (var i = 0; i < $scope.rekap.length; i++) {
                            total += parseInt($scope.rekap[i].UTSK, 10);
                        }
                        return total;
                    };
                    $scope.max = Math.max.apply(Math, $scope.label);
                    $scope.min = Math.min.apply(Math, $scope.label);
                    $scope.avg = $scope.getTotal() / $scope.rekap.length;
                    $scope.av = $scope.avg.toFixed()
                    console.log('rkp', $scope.avg.toFixed());
                });
            } else if (nilai === 'UASP') {
                $ionicLoading.show();
                sekolahService.rekap($scope.nil.kel, $scope.pel, nilai, $scope.jurusan).success(function(rekap) {
                    $scope.rekap = rekap;
                    $ionicLoading.hide();
                    $scope.data = rekap.map(function(el) {
                        return el.tot;
                    });
                    $scope.label = rekap.map(function(el) {
                        return el.UASP;
                    });
                    $scope.getTotal = function() {
                        var total = 0;
                        for (var i = 0; i < $scope.rekap.length; i++) {
                            total += parseInt($scope.rekap[i].UASP, 10);
                        }
                        return total;
                    };
                    $scope.max = Math.max.apply(Math, $scope.label);
                    $scope.min = Math.min.apply(Math, $scope.label);
                    $scope.avg = $scope.getTotal() / $scope.rekap.length;
                    $scope.av = $scope.avg.toFixed()
                    console.log('rkp', $scope.avg.toFixed());
                });
            } else {
                $ionicLoading.show();
                sekolahService.rekap($scope.nil.kel, $scope.pel, nilai, $scope.jurusan).success(function(rekap) {
                    $scope.rekap = rekap;
                    $ionicLoading.hide();
                    $scope.data = rekap.map(function(el) {
                        return el.tot;
                    });
                    $scope.label = rekap.map(function(el) {
                        return el.KDP;
                    });
                    $scope.getTotal = function() {
                        var total = 0;
                        for (var i = 0; i < $scope.rekap.length; i++) {
                            total += parseInt($scope.rekap[i].KDP, 10);
                        }
                        return total;
                    };
                    $scope.max = Math.max.apply(Math, $scope.label);
                    $scope.min = Math.min.apply(Math, $scope.label);
                    $scope.avg = $scope.getTotal() / $scope.rekap.length;
                    $scope.av = $scope.avg.toFixed()
                    console.log('rkp', $scope.avg.toFixed());
                });
            }
        };
        // $scope.showrkp();
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');
        $scope.labels = ['7', '11', '14', '2'];
        $scope.series = ['Series A'];
        $scope.lab = $scope.rekap;
        // $scope.data = $scope.rekap;
        //  console.log('rp', $scope.rekap[0]);
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('akademikabsensiCtrl', function($scope, $ionicLoading, $ionicLoading, $stateParams, $state, sekolahService) {
        $scope.title = 'ABSENSI';
        $scope.lskelas = function() {
            $ionicLoading.show();
            sekolahService.listkelas($scope.jurusan).success(function(lskelas) {
                $scope.lskelas = lskelas;
                $ionicLoading.hide();
                console.log($scope.lskelas);
            });
        };
        $scope.lskelas();
        $scope.beritas = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
                console.log($scope.berita);
            });
        };
        $scope.beritas();
    }).controller('akademikabsensi1Ctrl', function($scope, $stateParams, $ionicLoading, sekolahService, $rootScope, $ionicHistory, $state, $ionicPush) {
        $scope.title = 'ABSENSI';
        $scope.kelas = $stateParams.kelas;
        $scope.rekap = function() {
            $ionicLoading.show();
            sekolahService.rekapabsen($scope.kelas, $scope.jurusan).success(function(rkp) {
                $scope.rekap = rkp;
                if ($scope.rekap.length == 1) {
                    $scope.kosong = rkp[0].jumlah;
                } else if ($scope.rekap.length == 2) {
                    $scope.sakit = rkp[1].jumlah;
                    $scope.ijin = rkp[0].jumlah;
                } else if ($scope.rekap.length == 3) {
                    $scope.sakit = rkp[1].jumlah;
                    $scope.ijin = rkp[0].jumlah;
                    $scope.alpha = rkp[2].jumlah;
                }
                //$scope.sakit = rkp[1].jumlah;
                //$scope.ijin = rkp[0].jumlah;
                //$scope.absen = rkp[2].jumlah;
                $scope.jumlah = rkp.map(function(el) {
                    return el.jumlah;
                });
                $scope.sem = rkp[0].smt;
                console.log('tes', $scope.jumlah);
                console.log('rkp', $scope.rekap.length);
                $ionicLoading.hide();
            });
        };
        $scope.rekap();
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('akademikbkCtrl', function($scope, $ionicLoading, sekolahService, $rootScope, $ionicHistory, $state, $ionicPush) {
        $scope.title = 'BK';
        $scope.pelanggaran = function() {
            $ionicLoading.show();
            sekolahService.pelanggaran($scope.jurusan).success(function(pelanggaran) {
                $scope.rekap = pelanggaran;
                console.log("rkp ", $scope.rekap);
                $ionicLoading.hide();
            });
        };
        $scope.pelanggaran();
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('akademikbk1Ctrl', function($scope, $stateParams, $ionicLoading, sekolahService, $rootScope, $ionicHistory, $state, $ionicPush) {
        $scope.title = 'BK';
        $scope.kelas = $stateParams.kelas;
        $scope.rekap = function() {
            $ionicLoading.show();
            sekolahService.rekapbk($scope.kelas, $scope.jurusan).success(function(rkp) {
                $scope.rekap = rkp;
                $scope.rapi = rkp[1].jumlah;
                $scope.disiplin = rkp[0].jumlah;
                $scope.tertib = rkp[2].jumlah;
                $scope.sikap = rkp[3].jumlah;
                $scope.jumlah = rkp.map(function(el) {
                    return el.jumlah;
                });
                $scope.sem = rkp[0].SMT;
                console.log('tes', $scope.jumlah);
                console.log('rkp', $scope.rekap);
                $ionicLoading.hide();
            });
        };
        $scope.rekap();
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    })
    //controller siswa
    .controller('loginCtrl', function($scope, $ionicLoading, $state, sekolahService, $ionicPopup, $window, $ionicPush) {

        $scope.login = {};
        $scope.loginc = function() {
            $ionicLoading.show();
            sekolahService.login($scope.login).then(function(data) {
                console.log('llo', data)
                if (Object.keys(data.data).length === 1) {
                    $scope.data = data.data;
                    window.localStorage.setItem('jurusan', $scope.data[0].JURUSAN);
                    console.log('data', $scope.data)
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: "Selamat Datang..",
                        template: "Login berhasil",
                        okText: 'Ok',
                        okType: 'button-assertive'
                    });

                    window.localStorage.setItem('nis', $scope.login.nis);
                    window.localStorage.setItem('level', $scope.login.level);

                    console.log(data);
                    if ($scope.login.level == 'SISWA' || $scope.login.level == 'WALI SISWA') {
                        $state.go('app.home', {
                            'level': $scope.login.level,
                            'nis': $scope.login.nis
                        });
                    } else if ($scope.login.level == 'GURU') {
                        $state.go('guru.home', {
                            'level': $scope.login.level,
                            'nis': $scope.login.nis
                        });
                    } else if ($scope.login.level == 'BK') {
                        $state.go('bk.home', {
                            'level': $scope.level,
                            'nis': $scope.nis
                        });
                    } else {
                        $state.go('admin.home', {
                            'level': $scope.level,
                            'nis': $scope.nis
                        });
                    };
                } else {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: "Error Message",
                        template: "Periksa kembali user, No HP dan password",
                        okText: 'Ok',
                        okType: 'button-assertive'
                    });
                }
            });
        };
        if (window.localStorage.getItem('nis') == undefined) {

        } else {
            $scope.nis = window.localStorage.getItem('nis', $scope.nis);
            $scope.level = window.localStorage.getItem('level', $scope.level);
            $scope.jurusan = window.localStorage.getItem('jurusan', $scope.jurusan);
            $ionicPush.register().then(function(t) {
                return $ionicPush.saveToken(t);
            }).then(function(t) {
                console.log('Token saved:', t.token);
            });
            if ($scope.level == 'SISWA' || $scope.level == 'WALI SISWA') {
                $state.go('app.home', {
                    'level': $scope.level,
                    'nis': $scope.nis
                });
            } else if ($scope.level == 'GURU') {
                $state.go('guru.home', {
                    'level': $scope.level,
                    'nis': $scope.nis
                });
            } else if ($scope.level == 'BK') {
                $state.go('bk.home', {
                    'level': $scope.level,
                    'nis': $scope.nis
                });
            } else {
                $state.go('admin.home', {
                    'level': $scope.level,
                    'nis': $scope.nis
                });
            };
        };
        $scope.login1 = function() {
            console.log('loged', $scope.login);
            $ionicLoading.show();
            sekolahService.login($scope.login).then(function(data) {
                if (Object.keys(data.data).length === 1) {
                    $ionicLoading.hide();
                    window.localStorage.setItem('nis', $scope.login.nis);
                    window.localStorage.setItem('level', $scope.login.level);
                    console.log(data);
                    $ionicPush.register().then(function(t) {
                        return $ionicPush.saveToken(t);
                    }).then(function(t) {
                        console.log('Token saved:', t.token);
                    });
                    if ($scope.login.level == 'SISWA') {
                        $state.go('app.home', {
                            'level': $scope.login.level,
                            'nis': $scope.login.nis
                        });
                    } else if ($scope.login.level == 'GURU') {
                        $state.go('guru.home', {
                            'level': $scope.login.level,
                            'nis': $scope.login.nis
                        });
                    } else if ($scope.login.level == 'BK') {
                        $state.go('bk.home', {
                            'level': $scope.level,
                            'nis': $scope.nis
                        });
                    } else {
                        $state.go('admin.home', {
                            'level': $scope.level,
                            'nis': $scope.nis
                        });
                    };
                } else {
                    $ionicLoading.hide();
                }
            });
        };
        $scope.login1();
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('pesanCtrl', function($scope, $ionicLoading, $stateParams, sekolahService, $state, $ionicHistory, $ionicViewService, $window) {
        $scope.nis = window.localStorage.getItem('nis');
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');

        $scope.pesan = function() {
            sekolahService.pesanid($stateParams.id, $scope.jurusan).success(function(data) {
                $ionicLoading.show();
                $scope.data = data;
                console.log(data);
                $ionicLoading.hide();
            })
        };
        $scope.pesan();
        $scope.back = function() {
            $window.history.go(-1);
        }
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('registerCtrl', function($scope, $ionicLoading, $stateParams, $ionicPopup, $ionicModal, $state, sekolahService, AuthService) {
        $scope.showAlert = function(msg) {
            $ionicPopup.alert({
                title: msg.title,
                template: msg.message,
                okText: 'Ok',
                okType: 'button-assertive'
            });
        };
        $scope.reg = {};
        $scope.token = '';
        $scope.showPopup = function() {
            // An elaborate, custom popup
            console.log('po')
            if (!$scope.reg.hp) {
                var myPopup = $ionicPopup.show({
                    //template: '<input type="text" ng-model="reg.nis">',
                    title: 'No Telepon',
                    subTitle: 'No Telepon Harus  Di isi',
                    scope: $scope,
                    buttons: [{
                        text: 'Cancel'
                    }, {
                        text: '<b>Masukkan</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if (!$scope.reg.nis) {
                                //don't allow the user to close unless he enters wifi password
                                e.preventDefault();
                            } else {
                                return $scope.reg.nis;
                            }
                        }
                    }, ]
                });
            } else {
                var myPopup = $ionicPopup.show({
                    template: '<input type="text" ng-model="reg.nis">',
                    title: 'Register',
                    subTitle: 'Masukkan NIS',
                    scope: $scope,
                    buttons: [{
                        text: 'Cancel',
                        onTap: function(e) {
                            // e.preventDefault() will stop the popup from closing when tapped.
                            e.preventDefault();
                        }
                    }, {
                        text: '<b>Masukkan</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if (!$scope.reg.nis) {
                                //don't allow the user to close unless he enters wifi password
                                e.preventDefault();
                            } else {
                                return $scope.reg.nis;
                            }
                        }
                    }, ]
                });
                myPopup.then(function(res) {
                    $scope.res = res;

                    $scope.user();

                });
            }

        };
        $scope.user = function() {
            $ionicLoading.show();
            console.log('auto', $scope.reg.level, $scope.reg.nis, $scope.reg.hp);
            if ($scope.reg.level == 'SISWA') {
                sekolahService.auto($scope.reg.level, $scope.reg.nis, $scope.reg.hp).success(function(user) {
                     if (user.length === 0) {
                        $ionicPopup.alert({
                            title: 'Maaf',
                            template: 'User Tidak Ditemukan',
                            okText: 'Ok',
                            okType: 'button-positive'
                        });
                    } else {
                    $scope.data = user[0];
                    $scope.reg.NAMA = $scope.data.NAMA;
                    $scope.reg.ALAMAT = $scope.data.ALAMAT;
                    $scope.reg.hp = $scope.data.hpsiswa;
                    $scope.reg.asal = $scope.data.JURUSAN;
                    //$scope.reg.status = $scope.level;
                    $ionicLoading.hide();
                    console.log('auto', $scope.data, $scope.reg.nis);
                }
                });
            } else if ($scope.reg.level == 'WALI SISWA') {
                sekolahService.auto($scope.reg.level, $scope.reg.nis, $scope.reg.hp).success(function(user) {
                    console.log('rr', user)
                    
                    if (user.length === 0) {
                        $ionicPopup.alert({
                            title: 'Maaf',
                            template: 'User Tidak Ditemukan',
                            okText: 'Ok',
                            okType: 'button-positive'
                        });
                    } else {
                        $scope.data = user[0];
                        $scope.reg.NAMA = $scope.data.NAMA;
                        $scope.reg.ALAMAT = $scope.data.ALAMAT;
                        $scope.reg.hp = $scope.data.hportu;
                        $scope.reg.asal = $scope.data.JURUSAN;
                    }

                    //$scope.reg.status = $scope.level;
                    $ionicLoading.hide();
                    console.log('auto', $scope.data, $scope.reg.nis);
                });

            } else if ($scope.reg.level == 'GURU') {
                sekolahService.auto($scope.reg.level, $scope.reg.nis, $scope.reg.hp).success(function(user) {
                     if (user.length === 0) {
                        $ionicPopup.alert({
                            title: 'Maaf',
                            template: 'User Tidak Ditemukan',
                            okText: 'Ok',
                            okType: 'button-positive'
                        });
                    } else {
                    $scope.data = user[0];
                    $scope.reg.NAMA = $scope.data.NAMA;
                    $scope.reg.ALAMAT = $scope.data.ALAMAT;
                    $scope.reg.hp = $scope.data.NOTELP;
                    $scope.reg.asal = $scope.data.JURUSAN;
                    //$scope.reg.status = $scope.level;
                    $ionicLoading.hide();
                    console.log('auto', $scope.data, $scope.reg.nis);
                }
                });

            } else if ($scope.reg.level == 'ADMIN') {
                sekolahService.auto($scope.reg.level, $scope.reg.nis, $scope.reg.hp).success(function(user) {
                     if (user.length === 0) {
                        $ionicPopup.alert({
                            title: 'Maaf',
                            template: 'User Tidak Ditemukan',
                            okText: 'Ok',
                            okType: 'button-positive'
                        });
                    } else {
                    $scope.data = user[0];
                    $scope.reg.NAMA = $scope.data.NAMA;
                    $scope.reg.ALAMAT = $scope.data.ALAMAT;
                    $scope.reg.hp = $scope.data.NOTELP;
                    $scope.reg.asal = $scope.data.JURUSAN;
                    //$scope.reg.status = $scope.level;
                    $ionicLoading.hide();
                    console.log('auto', $scope.data, $scope.reg.nis);
                }
                });

            } else if ($scope.reg.level == 'BK') {
                sekolahService.auto($scope.reg.level, $scope.reg.nis, $scope.reg.hp).success(function(user) {
                    $scope.data = user[0];
                    $scope.reg.NAMA = $scope.data.NAMA;
                    $scope.reg.ALAMAT = $scope.data.ALAMAT;
                    $scope.reg.hp = $scope.data.NOTELP;
                    $scope.reg.asal = $scope.data.JURUSAN;
                    //$scope.reg.status = $scope.level;
                    $ionicLoading.hide();
                    console.log('auto', $scope.data, $scope.reg.nis);
                });

            }

        };
        FCMPlugin.getToken(function(token) {
            console.log("REGISTER id ctrl", token);

            $scope.token = token;
        })
        $scope.simpan = function() {
            if (!$scope.reg.pass) {
                $scope.showAlert({
                    title: "Information",
                    message: "password harus sama"
                });
            } else {
                $ionicLoading.show();
                sekolahService.regsis({
                    nis: $scope.reg.nis,
                    nama: $scope.reg.NAMA,
                    alamat: $scope.reg.ALAMAT,
                    hp: $scope.reg.hp,
                    pass: $scope.reg.pass,
                    level: $scope.reg.level,
                    reg_id: $scope.token,
                    jurusan: $scope.reg.asal
                }).success(function(data) {
                    $ionicLoading.hide();
                    console.log('rrr', data);
                    $scope.dat = data;
                    $scope.showAlert({
                        title: "Information",
                        message: $scope.dat
                    });
                });
                $state.go('login');
            }
        }
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('homeCtrl', function($scope, $ionicLoading, $ionicLoading, $stateParams, $ionicPopup, $ionicModal, $state, sekolahService, $window, $ionicPush) {
        /*   $ionicPush.register().then(function(t) {
     return $ionicPush.saveToken(t);
                }).then(function(t) {
                console.log('Token saved:', t.token);
                });
    $scope.token = $ionicPush.saveToken(token);
//    $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');
    $scope.tok = function() {
      sekolahService.tok($stateParams.nis,$scope.token).success(function(data) {
        $ionicLoading.show(); 
            $scope.data = data;
            console.log(data);
            $ionicLoading.hide(); 
        })
    };
$scope.tok();
   */
        $scope.homenu = [{
            judul: 'Nilai',
            icon: 'img/penilaian.ico'
        }, {
            judul: 'Keuangan',
            icon: 'img/keuangan.ico'
        }, {
            judul: 'Kehadiran',
            icon: 'img/absensi.ico'
        }, {
            judul: 'BK',
            icon: 'img/BK.ico'
        }];
        $scope.title = 'MENU UTAMA';
        $scope.nis = window.localStorage.getItem('nis');
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');
        console.log('lepel', $scope.jurusan);
        $scope.nil = function(nil) {
            $ionicLoading.show();
            sekolahService.nil($scope.nis, $scope.jurusan).success(function(nila) {
                $scope.nila = nila;

            });
            sekolahService.chatcount($scope.nis, $scope.jurusan).success(function(ch) {
                $scope.ch = ch[0].unread;
                console.log('ch', $scope.ch)
            });

        };
        $scope.nil();
        $scope.nilai = function() {
            $state.go('app.nilai', {
                'level': $scope.level,
                'nis': $scope.nis
            });
        };
        $scope.keuangan = function() {
            $state.go('app.keuangan', {
                'level': $scope.level,
                'nis': $scope.nis
            });
        };
        $scope.hadir = function() {
            $state.go('app.hadir', {
                'level': $scope.level,
                'nis': $scope.nis
            });
        };
        $scope.bk = function() {
            $state.go('app.bk', {
                'level': $scope.level,
                'nis': $scope.nis
            });
        };
        $scope.hitbk = function() {

            sekolahService.bk($stateParams.nis, $scope.jurusan).success(function(bk) {
                $scope.bk1 = bk;
                console.log('notifbk', $scope.bk1.length);
            });
        };
        $scope.pesanws = function() {
            $ionicLoading.show();
            sekolahService.pesan($scope.nis, 'WALI DAN SISWA', $scope.level).success(function(pesan) {
                console.log('psn', pesan);
                $scope.pp = pesan;

                $ionicLoading.hide();
                console.log('pa', $scope.pp);
            })
        }
        $scope.jum = function() {
            sekolahService.jumlahpesan($scope.nis, 'WALI DAN SISWA', $scope.level).success(function(pesan) {

                $scope.pan = pesan[0].unread;

                console.log('jum', $scope.pan);
            })
        }
        $scope.pesanws();
        $scope.jum();
        /*    for(i=0;i <=  $scope.pan;i++){                   
                if($scope.level == 'WALI SISWA' && i%2 == 0){
                    $scope.pp =[];
                    $scope.pp =  $scope.pesan[i];
                    console.log('pp',$scope.pp);
                      
                }else if($scope.level == 'SISWA' && i%2 != 0){
                    $scope.pp =[];
                    $scope.pp =  $scope.pesan[i];
                    console.log('pp',$scope.pp);
                }
  }*/



        $scope.berita = function() {
            $ionicLoading.show();
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
                console.log('brt', berita)
                $ionicLoading.hide();
            });
        };
        $scope.hitbk();

        $scope.berita();
    }).controller('profileCtrl', function($scope, $ionicLoading, $ionicModal, $ionicPopup, $cordovaCamera, $cordovaDevice, $cordovaFile,
        $cordovaFileTransfer, $ionicLoading, $rootScope, $ionicHistory, $state, sekolahService) {
        $scope.nis = window.localStorage.getItem('nis');
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');
        $scope.ubah = false;
        $scope.loaduser = function() {
            $ionicLoading.show();
            sekolahService.prof($scope.nis, $scope.jurusan).success(function(user) {
                $scope.user = user;
                $ionicLoading.hide();
            });
        };
        $scope.loaduser();
        $scope.profile = {};
        $ionicModal.fromTemplateUrl('edit.html', function(modal) {
            $scope.taskModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });
        $scope.showAlert = function(msg) {
            $ionicPopup.alert({
                title: 'title',
                template: 'message',
                okText: 'Ok',
                okType: 'button-positive'
            });
        };
        $scope.editModal = function() {
            $scope.taskModal.show();
        };
        $scope.batal = function() {
            $scope.taskModal.hide();
            $scope.loaduser();
        };
        $scope.showCameraLib = function() {
                var options = {
                    title: 'Select Image Source',
                    buttonLabels: ['Load from Library', 'Use Camera'],
                    addCancelButtonWithLabel: 'Cancel',
                    androidEnableCancelButton: true,
                };
                $scope.selectPicture(Camera.PictureSourceType.PHOTOLIBRARY);
            }
            // refer to this link: https://devdactic.com/ionic-image-upload-php/
        $scope.selectPicture = function(sourceType) {
            var options = {
                // quality: 100,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: sourceType,
                saveToPhotoAlbum: false
            };
            $cordovaCamera.getPicture(options).then(function(imagePath) {
                // Grab the file name of the photo in the temporary directory
                var currentName = imagePath.replace(/^.*[\\\/]/, '');
                //Create a new name for the photo
                var d = new Date(),
                    n = $scope.nis,
                    newFileName = n + ".jpg";
                // If you are trying to load image from the gallery on Android we need special treatment!
                if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
                    window.FilePath.resolveNativePath(imagePath, function(entry) {
                        window.resolveLocalFileSystemURL(entry, success, fail);

                        function fail(e) {
                            console.error('Error: ', e);
                        }

                        function success(fileEntry) {
                            var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
                            // Only copy because of access rights
                            $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function(success) {
                                $scope.image = newFileName;
                            }, function(error) {
                                $scope.showAlert(error.exception);
                            });
                        };
                    });
                } else {
                    var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                    // Move the file to permanent storage
                    $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function(success) {
                        $scope.image = newFileName;
                    }, function(error) {
                        $scope.showAlert(error.exception);
                    });
                }
            }, function(err) {
                // Not always an error, maybe cancel was pressed...
                $scope.showAlert('loading from library error');
            })
        };
        $scope.pathForImage = function(image) {
            if (image === null) {
                return '';
            } else {
                $scope.ubah = true;
                return cordova.file.dataDirectory + image;
            }
        };
        $scope.simpan = function(nis, nama, alamat, no, keterangan) {
            $ionicLoading.show();
            $scope.nama = nama;
            $scope.alamat = alamat;
            $scope.keterangan = keterangan;
            $scope.no = no;
            var url = "http://mob.sma-persatuan-tulangan.sch.id/API/profile.php?l=siswa&nis=" + $scope.nis;
            // File for Upload
            var targetPath = $scope.pathForImage($scope.image);
            // File name only
            var filename = $scope.image;
            //console.log('file',filename)
            var options = {
                fileKey: "foto", //transfer_receipt
                fileName: filename,
                chunkedMode: false,
                mimeType: "multipart/form-data",
                params: {
                    'nis': nis,
                    'nama': nama,
                    'alamat': alamat,
                    'no': no,
                    'ket': keterangan,
                    'foto': filename,
                }
            };
            $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
                $ionicLoading.hide();
                console.log('rslt', result)
                var response = result.response;
                if (response === 'success') {
                    $ionicPopup.alert({
                        title: "Sukses",
                        template: "Profile berhasil diperbarui",
                        okText: 'Ok',
                        okType: 'button-dark'
                    });
                } else {
                    $scope.showAlert('Gagal perbarui profile');
                }
            }, function(err) {
                $ionicLoading.hide();
                $scope.showAlert('Terjadi kesalahan,Gagal perbarui profile');
            });
        }

        /*      $scope.simpan = function() {
                  if (!$scope.reg.nis) {
                      $scope.showAlert({
                          title: "Information",
                          message: "NIS tidak boleh kosong"
                      });
                  } else if (!$scope.reg.nama) {
                      $scope.showAlert({
                          title: "Information",
                          message: "nama tidak boleh kosong"
                      });
                  } else if (!$scope.reg.no) {
                      $scope.showAlert({
                          title: "Information",
                          message: "nomor telepon tidak boleh kosong"
                      });
                  } else if (!$scope.reg.alamat) {
                      $scope.showAlert({
                          title: "Information",
                          message: "alamat tidak boleh kosong"
                      });
                  } else if (!$scope.reg.status) {
                      $scope.showAlert({
                          title: "Information",
                          message: "status harap di pilih"
                      });
                  } else if (!$scope.reg.pass) {
                      $scope.showAlert({
                          title: "Information",
                          message: "password harus sama"
                      });
                  } else {
                      $ionicLoading.show();
                      sekolahService.regsis({
                          nis: $scope.reg.nis,
                          nama: $scope.reg.nama,
                          alamat: $scope.reg.alamat,
                          no: $scope.reg.no,
                          pass: $scope.reg.pass,
                         
                          level: $scope.reg.status
                      }).success(function(data) {
                          $ionicLoading.hide();
                          $scope.showAlert({
                              title: "Information",
                              message: "Akun berhasil di buat"
                          });
                      });
                      $state.go('login');
                  }
              }*/
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('profguruCtrl', function($scope, $ionicLoading, $ionicLoading, $ionicModal, $stateParams, $state, sekolahService, $ionicPopup) {
        $scope.nis = window.localStorage.getItem('nis');
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');
        $scope.user = function() {
            $ionicLoading.show();
            sekolahService.profbk($scope.nis, $scope.jurusan).success(function(user) {
                $scope.user = user;
                $ionicLoading.hide();
            });
        };
        $scope.user();
        $scope.showCameraLib = function() {
                var options = {
                    title: 'Select Image Source',
                    buttonLabels: ['Load from Library', 'Use Camera'],
                    addCancelButtonWithLabel: 'Cancel',
                    androidEnableCancelButton: true,
                };
                $scope.selectPicture(Camera.PictureSourceType.PHOTOLIBRARY);
            }
            // refer to this link: https://devdactic.com/ionic-image-upload-php/
        $scope.selectPicture = function(sourceType) {
            var options = {
                // quality: 100,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: sourceType,
                saveToPhotoAlbum: false
            };
            $cordovaCamera.getPicture(options).then(function(imagePath) {
                // Grab the file name of the photo in the temporary directory
                var currentName = imagePath.replace(/^.*[\\\/]/, '');
                //Create a new name for the photo
                var d = new Date(),
                    n = d.getTime(),
                    newFileName = n + ".jpg";
                // If you are trying to load image from the gallery on Android we need special treatment!
                if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
                    window.FilePath.resolveNativePath(imagePath, function(entry) {
                        window.resolveLocalFileSystemURL(entry, success, fail);

                        function fail(e) {
                            console.error('Error: ', e);
                        }

                        function success(fileEntry) {
                            var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
                            // Only copy because of access rights
                            $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function(success) {
                                $scope.image = newFileName;
                            }, function(error) {
                                $scope.showAlert(error.exception);
                            });
                        };
                    });
                } else {
                    var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                    // Move the file to permanent storage
                    $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function(success) {
                        $scope.image = newFileName;
                    }, function(error) {
                        $scope.showAlert(error.exception);
                    });
                }
            }, function(err) {
                // Not always an error, maybe cancel was pressed...
                $scope.showAlert('loading from library error');
            })
        };
        $scope.simpan = function(nis, nama, alamat, no, keterangan) {
            $scope.nama = nama;
            $scope.alamat = alamat;
            $scope.keterangan = keterangan;
            $scope.no = no;
            var url = "http://mob.sma-persatuan-tulangan.sch.id/API/profile.php?l=guru&nis=" + $scope.nis;
            // File for Upload
            var targetPath = $scope.pathForImage($scope.image);
            // File name only
            var filename = $scope.image;
            var options = {
                fileKey: "foto", //transfer_receipt
                fileName: filename,
                chunkedMode: false,
                mimeType: "multipart/form-data",
                params: {
                    'nis': nis,
                    'nama': nama,
                    'alamat': alamat,
                    'foto': foto,
                }
            };
            $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
                $ionicLoading.hide();
                var response = JSON.parse(result.response);
                if (response.success) {
                    $ionicPopup.alert({
                        title: "Sukses",
                        template: "Konfirmasi berhasil diproses",
                        okText: 'Ok',
                        okType: 'button-dark'
                    });


                } else {
                    $scope.showAlert('Gagal melakukan konfirmasi pembayaran');
                }
            }, function(err) {
                $ionicLoading.hide();
                $scope.showAlert('Terjadi kesalahan, gagal melakukan konfirmasi pembayaran');
            });
        }
        $scope.pathForImage = function(image) {
            if (image === null) {
                return '';
            } else {
                return cordova.file.dataDirectory + image;
            }
        };
        $ionicModal.fromTemplateUrl('edit.html', function(modal) {
            $scope.taskModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });
        $scope.showAlert = function(msg) {
            $ionicPopup.alert({
                title: msg.title,
                template: msg.message,
                okText: 'Ok',
                okType: 'button-positive'
            });
        };
        $scope.editModal = function() {
            $scope.taskModal.show();
        };
        $scope.batal = function() {
            $scope.taskModal.hide();
            $scope.user();
        };
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('bkCtrl', function($scope, $ionicLoading, $stateParams, $state, sekolahService, $window) {
        $scope.title = 'BK/PELANGGARAN';
        $scope.shownis = function() {
            $ionicLoading.show();
            sekolahService.bk($stateParams.nis, $scope.jurusan).success(function(bk) {
                $scope.bk = bk;
                $ionicLoading.hide();
            });
        };
        $scope.shownis();
        $scope.nis = window.localStorage.getItem('nis');
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');
        $scope.bk = function() {
            $state.go('app.bk', {
                'level': $scope.level,
                'nis': $scope.nis
            });
        };
        $scope.clearbk = function() {
            sekolahService.clearbk($stateParams.nis, $scope.jurusan).success(function(lskelas) {});
        };
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
        $window.OpenLink = function(link) {
            window.open(link, '_system');
        };
    }).controller('keuanganCtrl', function($scope, $ionicLoading, $stateParams, sekolahService, $state) {
        $scope.title = 'KEUANGAN';
        $scope.shownis = function() {
            $ionicLoading.show();
            sekolahService.keuangan($stateParams.nis, $scope.jurusan).success(function(keuangan) {
                $scope.keuangan = keuangan;
                $ionicLoading.hide();
            });
        };
        $scope.shownis();
        $scope.nis = window.localStorage.getItem('nis');
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');
        $scope.keuangan = function() {
            $state.go('app.keuangan', {
                'level': $scope.level,
                'nis': $scope.nis
            });
        };
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('hadirCtrl', function($scope, $ionicLoading, $ionicLoading, $stateParams, sekolahService, $state) {
        $scope.title = 'ABSENSI';
        var date = new Date();
        $scope.bulan = date.getMonth() + 1;
        $scope.tahun = date.getFullYear();
        $scope.shownis = function() {
            $ionicLoading.show();
            sekolahService.hadir($stateParams.nis, $scope.bulan, $scope.tahun, $scope.jurusan).success(function(hadir) {
                $scope.hadir = hadir;
            });
            $ionicLoading.hide();
            console.log($scope.bulan, $scope.tahun);
        };
        $scope.shownis();
        $scope.nis = window.localStorage.getItem('nis');
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');
        $scope.hadir = function() {
            $state.go('app.hadir', {
                'level': $scope.level,
                'nis': $scope.nis
            });
        };
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('nilaiCtrl', function($scope, $ionicLoading, $ionicLoading, $stateParams, $state, sekolahService) {

        $scope.title = 'NILAI';
        $scope.nis = window.localStorage.getItem('nis');
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');

        $scope.shownis = function() {
            $ionicLoading.show();
            sekolahService.nilai($stateParams.nis, $scope.jurusan).success(function(nilai) {
                $scope.nilai = nilai;
                if($scope.nilai.length > 1){
                console.log('nl', $scope.nilai)
                $ionicLoading.hide();                    
                }
            });
        };
        $scope.shownis();
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('kalenderCtrl', function($scope, $ionicLoading, $ionicLoading, $stateParams, $state, sekolahService) {
         $scope.title = 'KALENDER AKADEMIK';
       
        $scope.jurusan = window.localStorage.getItem('jurusan');

        $scope.shownis = function() {
            $ionicLoading.show();
            sekolahService.kalender($scope.jurusan).success(function(tgl) {
                $scope.kalender = tgl;
               
                $ionicLoading.hide();
            });
        };
        $scope.shownis();
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('chatCtrl', function($scope, $window, $ionicLoading, $ionicLoading, $stateParams, $state, sekolahService, $ionicPopup) {
        console.log("CHAT ", $stateParams);
        $scope.nis = window.localStorage.getItem('nis');
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');
        $scope.isiChat = "";
        $scope.showAlert = function(msg) {
            $ionicPopup.alert({
                title: msg.title,
                template: msg.message,
                okText: 'Ok',
                okType: 'button-assertive'
            });
        };
        $scope.tampil = function() {
            $ionicLoading.show();
            sekolahService.tampil($stateParams.friend, $scope.nis, $scope.jurusan).success(function(tampil) {
                $scope.dataChat = tampil;
                angular.forEach($scope.dataChat, function(v, i) {
                    if (v.nis == $scope.nis) {
                        v.status = "send";
                    } else {
                        v.status = "received";
                    }
                });
                console.log("CHAT DATA ", $scope.dataChat);
                //$scope.tampil = tampil;
                $ionicLoading.hide();
            });
        };
        $scope.tampil();
        $scope.triggerNotification = function(notif) {
            sekolahService.getNis($stateParams.friend).success(function(data) {
                console.log("DATA ", data);
                sekolahService.notification(data[0].reg_id, 'Pesan Baru', notif, $stateParams.friend, $scope.nis).success(function(data) {
                    console.log("DATA ", data);
                    //$scope.tampil();
                });
            });
        }
        $scope.kirim = function(isiChat) {
            console.log("X ", isiChat);
            if (!isiChat) {
                $scope.showAlert({
                    title: "Information",
                    message: "Pesan tidak boleh kosong"
                });
            } else {
                sekolahService.chat({
                    nis: $scope.nis,
                    friend: $stateParams.friend,
                    konten: isiChat
                }).success(function(data) {
                    console.log("DATA ", data);
                    $scope.triggerNotification(isiChat);
                    $scope.tampil();
                });
            }
        };
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('userCtrl', function($scope, $ionicLoading, $ionicLoading, $stateParams, $state, sekolahService) {
        $scope.nis = window.localStorage.getItem('nis');
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');
        $scope.user = function() {
            $ionicLoading.show();
            sekolahService.user($scope.jurusan).success(function(user) {
                $scope.user = user;
                $ionicLoading.hide();
                console.log('usr', $scope.user)
            });
        };
        $scope.user();

        $scope.chat = function() {};
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('userguruCtrl', function($scope, $ionicLoading, $ionicLoading, $stateParams, $state, sekolahService) {
        $scope.user = function() {
            $ionicLoading.show();
            sekolahService.user().success(function(user) {
                $scope.user = user;
                $ionicLoading.hide();
            });
        };
        $scope.user();
        $scope.nis = window.localStorage.getItem('nis');
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');
        $scope.chat = function() {};
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('brtCtrl', function($scope, $ionicLoading, $stateParams, sekolahService, $state, $window) {
        $scope.title = 'BERITA';
        $scope.berita = function() {
            sekolahService.beritaId($stateParams.beritaId).success(function(data) {
                $ionicLoading.show();
                $scope.data = data;
                console.log(data);
                $ionicLoading.hide();
            })
        };
        $scope.berita();
        $scope.nis = window.localStorage.getItem('nis');
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');
        $scope.back = function() {
            $window.history.go(-1);
        };
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('beritaCtrl', function($scope, $ionicLoading, $stateParams, sekolahService, $state, $window) {
        $scope.title = 'BERITA';
        $scope.nis = window.localStorage.getItem('nis');
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');
        console.log('masuk berita')
        $scope.back = function() {
            $window.history.go(-1);
        };
        $scope.loadberita = function() {
            $ionicLoading.show();
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
                $ionicLoading.hide();
                console.log('masuk berita', berita);
            });

        };
        $scope.loadberita();
    }).controller('listpesanCtrl', function($scope, $ionicLoading, $stateParams, sekolahService, $state, $window) {
        $scope.title = 'PESAN';

        $scope.nis = window.localStorage.getItem('nis');
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');
        $scope.back = function() {
            $window.history.go(-1);
        };
        $scope.pesanws = function() {
            $ionicLoading.show();
            sekolahService.pesan2($scope.nis, 'WALI DAN SISWA', $scope.level, $scope.jurusan).success(function(pesan) {
                console.log('psn', pesan);
                $scope.pp = pesan;
                $scope.pan = pesan.length;
                console.log('pa', $scope.pp);
            })
        }
        $scope.pesanws();
        $scope.pesanc = function() {

            $scope.pesanws();
            $ionicLoading.show();
            sekolahService.pesan($scope.nis, $scope.level, $scope.jurusan).success(function(pesan) {
                $scope.pesan = pesan;
                console.log

            });
            $ionicLoading.hide();
        };

        $scope.pesanc();
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('jadwalCtrl', function($scope, $ionicLoading, $stateParams, sekolahService, $state, $window) {
        $scope.title = 'JADWAL PELAJARAN';
        $scope.nis = window.localStorage.getItem('nis');
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');
        $scope.kelas = '';
        $scope.back = function() {
            $window.history.go(-1);
        };
if($scope.level == 'SISWA' || $scope.level == 'WALI SISWA'){
     $scope.user = function() {
            $ionicLoading.show();
            sekolahService.prof($scope.nis, $scope.jurusan).success(function(user) {
                $scope.user = user[0];
                $scope.kelas = $scope.user.KELAS;
                console.log('kls', $scope.kelas)
                $ionicLoading.hide();
                $scope.jadwal();
            });
        };
        
    }else if($scope.level == 'GURU' || $scope.level == 'BK' || $scope.level == 'ADMIN'){
$scope.user = function() {
            $ionicLoading.show();
            sekolahService.wlkls($scope.nis, $scope.jurusan).success(function(user) {
                $scope.user = user[0];
                $scope.kelas = $scope.user.KELAS;
                console.log('kls',user)
                $ionicLoading.hide();
                $scope.jadwal();
            });
        };
       
        }
        $scope.user();

        $scope.jadwal = function() {
            console.log('kls', $scope.kelas)
            $ionicLoading.show();
            sekolahService.jadwal($scope.kelas, $scope.jurusan).success(function(jadwal) {
                $scope.jadwal = jadwal;
                console.log('jdwl', $scope.jadwal)
                $ionicLoading.hide();
            });
        };
  
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    }).controller('smsCtrl', function($scope, $ionicLoading, $stateParams, $ionicPopup, sekolahService, $state, $ionicHistory, $window, $ionicPlatform) {
        $scope.title = 'LAYANAN SMS';
        $scope.nis = window.localStorage.getItem('nis');
        $scope.level = window.localStorage.getItem('level');
        $scope.jurusan = window.localStorage.getItem('jurusan');
        $scope.data = {};

        $scope.det = function() {
            if ($scope.level == 'SISWA' || $scope.level == 'WALI SISWA') {
                $ionicLoading.show();
                sekolahService.siswa($scope.nis).success(function(data) {
                    $scope.data = data;
                    if ($scope.data) {
                        var que = $scope.data[0].JURUSAN;
                        $scope.listSMS($scope.data[0].JURUSAN);
                         $ionicLoading.hide();
                    } else {
                        var que = $scope.jurusan;
                        $scope.listSMS($scope.jurusan);
                         $ionicLoading.hide();
                    }

                    console.log('dt', $scope.data, que);
                })
            }
        }
        $scope.det();
        $ionicPlatform.ready(function() {
            $ionicLoading.show();
            $scope.listSMS = function(que) {
                console.log('que', que)
                var que = que;
                $scope.sms = [];
                var monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sept", "Okt", "Nov", "Des"];
                /* READ SMS */
                var filter = {
                    box: 'inbox', //inbox, sent, draft
                    //following 4 filters should not be applied together, they are OR relationship
                    // read :1, //0 for unread and 1 for already
                    // _id: 1234, //specify the msg id
                    //body : 'pulsa' , //content to match
                    //address: '333',
                    indexFrom: 0,
                    //body : 'appzone' // content to match
                    maxCount: 99
                };
                console.log("READ SMS ", window.SMS);
                console.log("FILTER ", filter);
                if (window.SMS) window.SMS.listSMS(filter, function(data) {
                    console.log("DATA ", data);
                    if (Array.isArray(data)) {
                        angular.forEach(data, function(v, i) {
                            if (v.body.indexOf(que) >= 0) {
                                var date = new Date(v.date);
                                var day = date.getDate();
                                var monthIndex = date.getMonth();
                                var year = date.getFullYear();
                                v.tgl_sms = day + "-" + monthNames[monthIndex] + "-" + year + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                                $scope.sms.push(v);
                            }
                        })
                        $ionicLoading.hide();
                        console.log("SMS ", $scope.sms, que);
                        ///$scope.article = sms;
                    }
                }, function(err) {
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: 'Reading Failed!',
                        template: 'Read Failed'
                    });
                })
            }




        });
        $scope.berita = function() {
            sekolahService.berita().success(function(berita) {
                $scope.berita = berita;
            });
        };
        $scope.berita();
    });