// Pilah — basis data barang sampah.
// Kategori: "organic" (tong hijau), "recyclable" (tong biru),
// "hazardous" (tong merah), "residual" (tong abu-abu).
// Aturan kategori (pemilahan sampah rumah tangga standar):
//  - organic    = sisa makanan dan sampah kebun (bisa dikompos)
//  - recyclable = plastik, kaca, logam, kertas, dan karton yang bersih
//  - hazardous  = baterai, elektronik, obat, bahan kimia, barang bermerkuri (B3)
//  - residual   = sisanya (terkontaminasi, bahan campuran, atau tidak bisa didaur ulang)
const WASTE_ITEMS = [
  // ---- ORGANIK (tong hijau) ----
  { name: "Sisa nasi", cat: "organic", steps: ["Keruk ke tong hijau atau tumpukan kompos.", "Jangan dicampur plastik atau kemasan."], tip: "Nasi matang cepat terurai — campur dengan daun kering supaya tidak bau." },
  { name: "Kulit pisang", cat: "organic", steps: ["Buang ke tong hijau atau kompos."], tip: "Kulit pisang kaya kalium — bagus untuk kompos kebun." },
  { name: "Sisa sayuran", cat: "organic", steps: ["Masukkan ke tong hijau atau kompos.", "Potong kecil-kecil supaya cepat terurai."], tip: "Kulit bawang dan bawang putih bisa dikompos, tapi jangan masukkan ke kompos cacing." },
  { name: "Kulit buah", cat: "organic", steps: ["Masukkan ke tong hijau atau kompos."], tip: "Kulit jeruk lebih lama terurai — potong kecil-kecil dulu." },
  { name: "Cangkang telur", cat: "organic", steps: ["Bilas sisa putih telur.", "Remukkan lalu masukkan ke kompos atau tong hijau."], tip: "Cangkang telur yang diremukkan menambah kalsium untuk tanah." },
  { name: "Ampas kopi", cat: "organic", steps: ["Tuangkan ke tong hijau atau kompos.", "Filter kopi dari kertas juga boleh ikut."], tip: "Ampas kopi kaya nitrogen — bahan kompos yang bagus." },
  { name: "Ampas teh", cat: "organic", steps: ["Tuangkan daun teh ke tong hijau.", "Lepas dulu staples dan label dari kantong teh."], tip: "Teh tubruk mudah terurai; kebanyakan kantong teh mengandung plastik, jadi cek mereknya." },
  { name: "Roti basi", cat: "organic", steps: ["Masukkan ke tong hijau atau kompos.", "Sobek kecil-kecil dulu."], tip: "Roti basi bisa dikeringkan dan dijadikan tepung roti sebelum dibuang." },
  { name: "Tulang ikan", cat: "organic", steps: ["Bungkus dengan koran.", "Masukkan ke tong hijau."], tip: "Tulang ikan lambat terurai — kubur dalam-dalam di tumpukan kompos." },
  { name: "Tulang ayam", cat: "organic", steps: ["Masukkan ke tong hijau.", "Jangan berikan tulang matang ke hewan peliharaan."], tip: "Tulang butuh berbulan-bulan untuk terurai; kompos yang panas membantu." },
  { name: "Bonggol apel", cat: "organic", steps: ["Buang ke tong hijau atau kompos."], tip: "Bonggol buah adalah bahan kompos murni." },
  { name: "Daun dan ranting", cat: "organic", steps: ["Kumpulkan di tong hijau atau tumpukan kompos.", "Jangan campur plastik dan batu."], tip: "Daun kering adalah bahan 'cokelat' yang menyeimbangkan sampah dapur yang basah di kompos." },
  { name: "Potongan rumput", cat: "organic", steps: ["Tambahkan selapis tipis ke kompos.", "Atau biarkan di halaman sebagai mulsa."], tip: "Lapisan rumput yang tebal jadi berlendir — sebarkan tipis-tipis." },
  { name: "Sabut kelapa", cat: "organic", steps: ["Potong atau pecah kecil-kecil.", "Masukkan ke kompos atau tong hijau."], tip: "Sabut kelapa lambat membusuk tapi bagus untuk mulsa." },
  { name: "Bonggol jagung", cat: "organic", steps: ["Pecah jadi beberapa bagian.", "Masukkan ke kompos atau tong hijau."], tip: "Bonggol jagung keras — kompos yang panas paling cepat menguraikannya." },
  { name: "Kulit udang", cat: "organic", steps: ["Bilas sebentar.", "Kubur dalam-dalam di kompos atau pakai tong hijau."], tip: "Kulit udang menambah kitin dan kalsium; kubur supaya tidak menarik lalat." },
  { name: "Sisa tahu dan tempe", cat: "organic", steps: ["Masukkan ke tong hijau atau kompos."], tip: "Sisa kedelai cepat terurai." },
  { name: "Sisa mi", cat: "organic", steps: ["Keruk ke tong hijau atau kompos."], tip: "Mi polos mudah terurai; saus berminyak tidak masalah dalam jumlah sedikit." },

  // ---- DAUR ULANG (tong biru) ----
  { name: "Botol plastik (PET)", cat: "recyclable", steps: ["Kosongkan isinya.", "Bilas sebentar, penyet sampai pipih, pasang lagi tutupnya.", "Masukkan ke tong biru."], tip: "Botol PET adalah plastik paling bernilai di bank sampah — jaga tetap bersih." },
  { name: "Kantong plastik (bersih)", cat: "recyclable", steps: ["Kibaskan remah-remahnya.", "Jaga tetap bersih dan kering.", "Ikat jadi satu dengan kantong bersih lain untuk tong biru."], tip: "Kantong plastik yang kotor atau basah tidak bisa didaur ulang — pakai saja sebagai pelapis tempat sampah." },
  { name: "Botol kaca", cat: "recyclable", steps: ["Kosongkan dan bilas.", "Lepas tutupnya (tutup dibuang terpisah).", "Masukkan ke tong biru."], tip: "Kaca bisa didaur ulang berkali-kali tanpa kehilangan kualitas." },
  { name: "Stoples kaca", cat: "recyclable", steps: ["Kosongkan, bilas, lepas tutupnya.", "Masukkan ke tong biru."], tip: "Stoples bisa dipakai lagi untuk menyimpan — pakai ulang dulu sebelum didaur ulang." },
  { name: "Kaleng", cat: "recyclable", steps: ["Kosongkan dan bilas.", "Penyet kalau bisa.", "Masukkan ke tong biru."], tip: "Tes magnet membedakan baja dan aluminium — keduanya bisa didaur ulang." },
  { name: "Kaleng aluminium", cat: "recyclable", steps: ["Kosongkan dan bilas.", "Penyet sampai pipih.", "Masukkan ke tong biru."], tip: "Mendaur ulang satu kaleng aluminium menghemat energi setara menyalakan TV selama 3 jam." },
  { name: "Koran bekas", cat: "recyclable", steps: ["Jaga tetap kering.", "Tumpuk dan ikat atau masukkan ke kantong.", "Masukkan ke tong biru."], tip: "Koran yang basah tidak bisa didaur ulang lagi — jadinya sampah residu." },
  { name: "Kardus", cat: "recyclable", steps: ["Lepas selotip dan label.", "Lipat sampai pipih.", "Masukkan ke tong biru."], tip: "Kardus berminyak (seperti kotak pizza) TIDAK bisa didaur ulang — masuk tong abu-abu." },
  { name: "Kertas kantor", cat: "recyclable", steps: ["Jaga tetap kering.", "Masukkan ke tong biru."], tip: "Kertas yang sudah di-shredder diterima kebanyakan bank sampah kalau dikantongi." },
  { name: "Majalah bekas", cat: "recyclable", steps: ["Jaga tetap kering.", "Masukkan ke tong biru."], tip: "Halaman glossy tetap bisa didaur ulang — lapisannya dibuang dalam proses." },
  { name: "Karton susu (Tetra Pak)", cat: "recyclable", steps: ["Kosongkan dan bilas.", "Lipat sampai pipih.", "Masukkan ke tong biru kalau diterima."], tip: "Karton itu lapisan kertas + plastik + foil — cek apakah bank sampahmu menerimanya." },
  { name: "Wadah plastik (HDPE)", cat: "recyclable", steps: ["Kosongkan dan bilas.", "Lepas tutupnya.", "Masukkan ke tong biru."], tip: "HDPE (botol, wadah, jeriken) termasuk plastik paling mudah didaur ulang." },
  { name: "Gelas plastik (bersih)", cat: "recyclable", steps: ["Bilas sisa minuman.", "Tumpuk gelas-gelasnya.", "Masukkan ke tong biru."], tip: "Gelas yang masih berisi minuman bisa mengotori seluruh batch daur ulang." },
  { name: "Tutup botol logam", cat: "recyclable", steps: ["Kumpulkan tutup-tutup kecil dalam satu kaleng.", "Masukkan kaleng berisi tutup itu ke tong biru."], tip: "Tutup yang lepas jatuh melewati mesin sortir — kumpulkan dulu dalam kaleng." },
  { name: "Botol minyak goreng (kosong, dibilas)", cat: "recyclable", steps: ["Kosongkan minyaknya (lihat 'Minyak goreng bekas').", "Bilas dengan air panas.", "Masukkan ke tong biru."], tip: "Setetes minyak bisa merusak sekantong kertas daur ulang — bilas sampai bersih." },
  { name: "Botol sampo (kosong)", cat: "recyclable", steps: ["Kosongkan dan bilas.", "Lepas pompanya kalau bisa.", "Masukkan ke tong biru."], tip: "Pompa itu bahan campuran — lepas dulu kalau bisa." },
  { name: "Botol detergen (kosong, dibilas)", cat: "recyclable", steps: ["Kosongkan dan bilas.", "Masukkan ke tong biru."], tip: "Membilas menjaga aliran daur ulang tetap bersih untuk semua orang." },
  { name: "Kotak telur (kertas)", cat: "recyclable", steps: ["Jaga tetap kering.", "Masukkan ke tong biru."], tip: "Kotak telur dari kertas juga bisa dikompos kalau polos." },
  { name: "Kantong kertas", cat: "recyclable", steps: ["Jaga tetap kering.", "Masukkan ke tong biru."], tip: "Pakai ulang kantong kertas sebagai pelapis tempat sampah atau pembungkus." },
  { name: "Aluminium foil (bersih)", cat: "recyclable", steps: ["Lap sisa makanan.", "Remas jadi bola seukuran bola tenis.", "Masukkan ke tong biru."], tip: "Potongan foil kecil jatuh melewati mesin sortir — remas jadi satu." },
  { name: "Besi / logam bekas", cat: "recyclable", steps: ["Lepas bagian plastik kalau mudah.", "Masukkan ke tong biru atau bawa ke pengepul besi tua."], tip: "Logam itu bernilai — bank sampah membayar per kilo." },
  { name: "Pakaian bekas (layak pakai)", cat: "recyclable", steps: ["Cuci dulu.", "Donasikan atau antar ke titik pengumpulan pakaian."], tip: "Pakaian yang masih layak dipakai sebaiknya dipakai ulang, bukan didaur ulang — donasi adalah pilihan terbaik." },
  { name: "Minyak goreng bekas", cat: "recyclable", steps: ["Dinginkan dulu.", "Tuang ke botol yang tertutup rapat.", "Serahkan ke bank sampah atau pengepul minyak."], tip: "Minyak bekas jadi biodiesel. JANGAN dibuang ke saluran air — menyumbat pipa dan mencemari sungai." },
  { name: "Buku bekas", cat: "recyclable", steps: ["Lepas sampul kerasnya kalau bisa.", "Masukkan ke tong biru atau donasikan."], tip: "Donasikan dulu buku yang masih bisa dibaca — daur ulang adalah pilihan terakhir." },

  // ---- BERBAHAYA / B3 (tong merah) ----
  { name: "Baterai AA", cat: "hazardous", steps: ["JANGAN dibuang ke tong mana pun.", "Simpan di wadah kering.", "Bawa ke titik pengumpulan baterai atau bank sampah."], tip: "Satu baterai bisa mencemari 600 liter air tanah dengan logam berat." },
  { name: "Baterai HP", cat: "hazardous", steps: ["JANGAN ditusuk atau dibakar.", "Tutup terminalnya dengan selotip.", "Bawa ke pengepul limbah elektronik."], tip: "Baterai yang menggelembung berisiko terbakar — pegang hati-hati dan jauhkan dari panas." },
  { name: "HP bekas", cat: "hazardous", steps: ["Cadangkan dan hapus datamu.", "Bawa ke pengepul limbah elektronik atau program tukar tambah toko HP."], tip: "HP mengandung emas, kobalt, dan logam tanah jarang — daur ulang bisa memulihkannya." },
  { name: "Obat kedaluwarsa", cat: "hazardous", steps: ["Biarkan dalam kemasan aslinya.", "Bawa ke titik pengembalian obat di apotek.", "JANGAN dibuang ke toilet."], tip: "Obat yang dibuang ke toilet berakhir di sungai dan air minum." },
  { name: "Termometer rusak (merkuri)", cat: "hazardous", steps: ["JANGAN sentuh merkuri dengan tangan kosong.", "Buka ventilasi, kumpulkan butiran dengan karton ke wadah tertutup.", "Bawa ke titik limbah berbahaya."], tip: "Merkuri itu beracun — tumpahan kecil pun perlu dibersihkan dengan hati-hati." },
  { name: "Kaleng semprot (aerosol)", cat: "hazardous", steps: ["Habiskan isinya dulu kalau aman.", "JANGAN ditusuk atau dibakar.", "Bawa ke titik limbah berbahaya."], tip: "Kaleng bertekanan bisa meledak di truk sampah." },
  { name: "Kaleng cat (berisi cat)", cat: "hazardous", steps: ["Tutup rapat.", "Bawa ke titik limbah berbahaya.", "Kaleng kosong yang catnya sudah kering boleh masuk tong biru."], tip: "Sisa cat adalah limbah kimia — jangan pernah dituang ke saluran air." },
  { name: "Lampu CFL", cat: "hazardous", steps: ["Bungkus dengan koran.", "Bawa ke titik limbah berbahaya atau limbah elektronik."], tip: "Lampu CFL mengandung merkuri. Lampu LED juga limbah elektronik — jangan dibuang ke tong." },
  { name: "Lampu neon (tabung)", cat: "hazardous", steps: ["Bungkus hati-hati supaya tidak pecah.", "Bawa ke titik limbah berbahaya."], tip: "Lampu neon mengandung uap merkuri." },
  { name: "Oli bekas", cat: "hazardous", steps: ["Kumpulkan di wadah tertutup.", "Bawa ke bengkel atau titik limbah berbahaya."], tip: "Satu liter oli bekas bisa mencemari satu juta liter air." },
  { name: "Wadah pestisida", cat: "hazardous", steps: ["JANGAN dibilas ke saluran air.", "Tutup rapat dan bawa ke titik limbah berbahaya."], tip: "Sisa pestisida beracun bagi manusia dan satwa liar." },
  { name: "Penghapus cat kuku", cat: "hazardous", steps: ["Jaga botolnya tetap tertutup.", "Bawa ke titik limbah berbahaya."], tip: "Aseton mudah terbakar — jauhkan dari panas dan jangan dibuang ke tong." },
  { name: "Laptop bekas", cat: "hazardous", steps: ["Cadangkan dan hapus datamu.", "Bawa ke pengepul limbah elektronik."], tip: "Laptop mengandung baterai dan logam berat — tidak boleh masuk TPA." },
  { name: "Charger / kabel rusak", cat: "hazardous", steps: ["Gulung rapi.", "Bawa ke pengepul limbah elektronik."], tip: "Kabel mengandung tembaga — pengepul limbah elektronik mendaur ulangnya." },
  { name: "Cartridge tinta", cat: "hazardous", steps: ["Masukkan ke kantong supaya tidak bocor.", "Bawa ke toko printer atau titik limbah elektronik."], tip: "Banyak toko bisa mengisi ulang cartridge — pakai ulang lebih baik daripada daur ulang." },
  { name: "Botol pemutih (berisi sisa cairan)", cat: "hazardous", steps: ["Biarkan tutupnya terpasang.", "Bawa ke titik limbah berbahaya.", "Botol yang sudah kosong dan dibilas boleh masuk tong biru."], tip: "Pemutih itu korosif — jangan pernah dicampur dengan bahan kimia lain." },

  // ---- RESIDU (tong abu-abu) ----
  { name: "Kotak styrofoam", cat: "residual", steps: ["Masukkan ke tong abu-abu.", "Buang dulu sisa makanannya."], tip: "Styrofoam 95% udara dan hampir tidak pernah didaur ulang — hindari kalau bisa." },
  { name: "Popok bayi bekas", cat: "residual", steps: ["Gulung dan bungkus rapat.", "Masukkan ke tong abu-abu."], tip: "Popok butuh 500+ tahun untuk terurai — popok kain adalah alternatif rendah sampah." },
  { name: "Pembalut", cat: "residual", steps: ["Bungkus dengan kertas.", "Masukkan ke tong abu-abu."], tip: "Pembalut kain dan menstrual cup bisa mengurangi sampah ini sampai hampir nol." },
  { name: "Tisu bekas", cat: "residual", steps: ["Masukkan ke tong abu-abu."], tip: "Tisu bekas terlalu lemah dan kotor untuk didaur ulang — kompos hanya kalau kertas polos dan kering." },
  { name: "Tisu basah", cat: "residual", steps: ["Masukkan ke tong abu-abu.", "Jangan pernah dibuang ke toilet."], tip: "Kebanyakan tisu basah mengandung serat plastik dan menyumbat saluran air." },
  { name: "Puntung rokok", cat: "residual", steps: ["Pastikan sudah benar-benar padam.", "Masukkan ke tong abu-abu."], tip: "Filter rokok terbuat dari plastik — tidak bisa terurai." },
  { name: "Piring keramik pecah", cat: "residual", steps: ["Bungkus pecahan tajam dengan koran.", "Masukkan ke tong abu-abu."], tip: "Keramik meleleh pada suhu lebih tinggi daripada kaca, jadi tidak bisa didaur ulang bersama botol." },
  { name: "Cermin pecah", cat: "residual", steps: ["Bungkus pecahan tajam dengan koran.", "Masukkan ke tong abu-abu."], tip: "Cermin punya lapisan reflektif — bukan kaca yang bisa didaur ulang." },
  { name: "Barang karet rusak", cat: "residual", steps: ["Masukkan ke tong abu-abu."], tip: "Karet sulit didaur ulang di skala rumah tangga — pakai ulang atau alihfungsikan dulu." },
  { name: "Permen karet", cat: "residual", steps: ["Bungkus dengan kertas.", "Masukkan ke tong abu-abu."], tip: "Permen karet dibuat dari polimer plastik." },
  { name: "Debu dan sapuan", cat: "residual", steps: ["Sapu dan masukkan ke tong abu-abu."], tip: "Sapuan mengandung campuran kotoran dan mikroplastik — masuk tong abu-abu." },
  { name: "Rambut", cat: "residual", steps: ["Masukkan ke tong abu-abu."], tip: "Rambut terurai sangat lambat, jadi kebanyakan panduan rumah tangga memasukkannya ke sampah residu." },
  { name: "Kotoran hewan peliharaan", cat: "residual", steps: ["Masukkan ke kantong dan tutup rapat.", "Masukkan ke tong abu-abu."], tip: "Kotoran hewan membawa kuman — jangan dikompos bersama sampah makanan." },
  { name: "Kotak pizza berminyak", cat: "residual", steps: ["Masukkan ke tong abu-abu."], tip: "Kardus yang berminyak tidak bisa didaur ulang — sobek bagian tutup yang bersih untuk tong biru." },
  { name: "Sedotan plastik", cat: "residual", steps: ["Masukkan ke tong abu-abu."], tip: "Sedotan terlalu kecil untuk mesin sortir — lebih baik tidak pakai, atau pakai sedotan yang bisa dipakai ulang." },
  { name: "Bungkus permen", cat: "residual", steps: ["Masukkan ke tong abu-abu."], tip: "Bungkus permen adalah lapisan plastik dan foil — tidak bisa didaur ulang." },
  { name: "Bungkus keripik (berlapis foil)", cat: "residual", steps: ["Kibaskan remah-remahnya.", "Masukkan ke tong abu-abu."], tip: "Bungkus berlapis foil adalah bahan campuran — tidak bisa dipisahkan." },
  { name: "Mainan rusak (plastik campuran)", cat: "residual", steps: ["Lepas dulu baterainya (tong merah).", "Sisanya masuk tong abu-abu."], tip: "Mainan mencampur banyak jenis plastik dan logam — donasikan mainan yang masih bisa dipakai." },
  { name: "Cotton bud", cat: "residual", steps: ["Masukkan ke tong abu-abu.", "Jangan pernah dibuang ke toilet."], tip: "Cotton bud adalah salah satu sampah yang paling sering ditemukan saat bersih-bersih pantai." },
  { name: "Plester luka", cat: "residual", steps: ["Masukkan ke tong abu-abu."], tip: "Plester bekas adalah sampah higienis — masuk tong abu-abu." },
  { name: "Masker bekas", cat: "residual", steps: ["Potong tali telinganya.", "Masukkan ke tong abu-abu."], tip: "Memotong talinya mencegah hewan terlilit." },
  { name: "Bungkus rokok (berlapis foil)", cat: "residual", steps: ["Masukkan ke tong abu-abu."], tip: "Lapisan foil membuat bungkusnya tidak bisa didaur ulang." }
];

const CATEGORIES = {
  organic:    { label: "Organik",          bin: "Tong hijau",   color: "#2e7d32", bg: "#e8f5e9" },
  recyclable: { label: "Daur Ulang",       bin: "Tong biru",    color: "#1565c0", bg: "#e3f2fd" },
  hazardous:  { label: "Berbahaya (B3)",   bin: "Tong merah",   color: "#c62828", bg: "#fce8e8" },
  residual:   { label: "Residu",           bin: "Tong abu-abu", color: "#616161", bg: "#f5f5f5" }
};
