<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-xsrf-token");

$con=mysqli_connect("localhost","smapersa_mob","sm4p3rs4!","smapersa_mob");


if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

//$data = json_decode(file_get_contents("php://input"));
$tujuan = $_POST['tujuan'];
$isi = $_POST['isi'];
//$mapel = "SELECT PELAJARAN.PELAJARAN FROM nilaiblok,PELAJARAN WHERE nilaiblok.KODEPEL = PELAJARAN.KODE AND nilaiblok.KODEGURU = '$pel' LIMIT 1";
$idlama = mysqli_query($con,'SELECT id from tblPesan GROUP BY id DESC LIMIT 1');
$s = 1;
$id = $idlama + $s;
$siswa = "SELECT nis FROM userapp WHERE level='SISWA'";
$guru = "SELECT nis FROM userapp WHERE level='GURU' OR level='ADMIN' OR level='BK'  ";
$wali = "SELECT nis FROM userapp WHERE level='SISWA'";


//$kelas = mysqli_real_escape_string($con, $data->kelas);

//$sql1 = "INSERT INTO siswa(NIK,friend,konten) values ('$nis','$friend','$konten')  where NIK ='$nis'";
if($tujuan == 'SISWA'){
  $hit = mysqli_query($con,$siswa);
  $row= mysqli_fetch_array($hit);
  $nis = $row['nis'];
  $loop = mysqli_num_rows($hit);
for($i = 0; $i<=$loop; $i++) {
    $sql ="INSERT INTO tblPesan(nis,id,PESAN,TUJUAN) values('".$nis."','".$id."','".$isi."','".$tujuan."')";
    $pesan ="Pesan baru:".$isi." ";
}

}else if($tujuan == 'GURU'){
   $hit = mysqli_query($con,$guru);
  $row= mysqli_fetch_array($hit);
  $nis = $row['nis'];
  $sql = "";
   // $loop = mysqli_num_rows($hit);
    /**
for($i = 0; $i<=$loop; $i++) {
    $sql ="INSERT INTO tblPesan(nis,id,PESAN,TUJUAN) values('".$nis."','".$id."','".$isi."','".$tujuan."')";
    $pesan ="Pesan baru:".$isi."dan ".$id."";
}*/
 while ($n = mysqli_num_rows($hit)){
         $sql .="INSERT INTO tblPesan(nis,id,PESAN,TUJUAN) values('".$n[1]."','".$id."','".$isi."','".$tujuan."')";
    $pesan ="Pesan baru:".$isi."dan ".$id."";
    }
}else {
//$sql ="UPDATE nilaiblok SET NRAPORTK='$nilai', status='1' where NIS ='$nis' AND KODEGURU='$pel'";
$pesan ="Pesan gagal";
}






if (!mysqli_query($con, $sql)) {
  die('Error: ' . mysqli_error($con, $row));
}
echo $pesan ;

mysqli_close($conn);
?>