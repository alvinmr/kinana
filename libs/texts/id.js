const textMenu = (pushname) => {
    return `halo, ${pushname}! 👋️
nih menu menunya🎉
sticker creator:
1. *#sticker*
Untuk merubah gambar menjadi sticker. 
Penggunaan: kirim gambar dengan caption #sticker atau balas gambar yang sudah dikirim dengan #sticker

2. *#sticker* _<url / link gambar>_
Untuk merubah gambar dari url menjadi sticker. 
Penggunaan: kirim pesan dengan format *#sticker https://memegenerator.net/img/instances/46952448.jpg*

3. *#gifsticker* _<Giphy URL>_ / *#stickergif* _<Giphy URL>_
Untuk merubah gif menjadi sticker (Giphy Only)
Penggunaan: Kirim pesan dengan format *gifsticker https://media.giphy.com/media/JUvI2c1ddyzkwK4RlV/giphy.gif*


Lain-lain:
1. *#tr* _<kode bahasa>_
Untuk mengartikan pesan menjadi bahasa yang ditentukan.
Penggunaan: Balas/quote/reply pesan yang ingin kamu translate dengan _*#translate id*_ <- id adalah kode bahasa. kode bahasa dapat dilihat di *https://bit.ly/33FVldE*

2. *#say* [id, jp, ar, en] _<teks>_
Mengubah teks menjadi suara dengan batas teks 250 kata
Penggunaan : #say id anak babi kalian

3. *#wiki* _<kata kunci>_
Mencari penjelasan berdasarkan wikipedia sesuai dengan kata kunci yang dikirimkan
Penggunaan : #wiki anjing

4. *#arti _<nama kamu>_* (SEMENTARA MASI BELOM BISA)
Mencari arti nama
Penggunaan : #artinama yanto

5. *#kecocokan* _<nama 1>_ | _<nama 2>_ (SEMENTARA MASI BELOM BISA)
Mengecek kecocokan pasangan berdasarkan nama
Penggunaan : #kecocokan jodi | akbar

6. *#gabut*
Memberi sebuah saran agar kamu ga gabut
Penggunaan : #gabut

7. *#apakah* _<pertanyaanmu>_
Menjawab sebuh pertanyaanmu
Penggunaan : #apakah aku ganteng bot ?

8. *#siapakah* _<pertanyaanmu>_
Random ngetag orang yang ada di grup mu
Penggunaan : #siapakah orang paling babi ?

9. *#twt* _<link post twitter>_
mendownload postingan video / foto di twitter
Penggunaan : #twt https://twitter.com/txtdrpemerintah/status/1335928302939242497


Info Bot :

1. *#tnc*
Menampilkan Syarat dan Kondisi Bot.

2. *#donasi*
menampilkan informasi donasi.

semoga bermanfaat y`
}

const textAdmin = () => {
    return `
⚠ [ *Admin Group dan Owner Only* ] ⚠ 
Berikut adalah beberapa fitur admin grup yang ada pada bot ini!

1. *#kick* @user
Untuk mengeluarkan member dari grup (bisa lebih dari 1).

2. *#promote* @user
Untuk mempromosikan member menjadi Admin grup.

3. *#demote* @user
Untuk demosikan Admin grup.

4. *#tagall*
Untuk mention semua member grup.

5. *#del*
Untuk menghapus pesan bot (balas pesan bot dengan #del)`
}

const textDonasi = () => {
    return `
Hai, terimakasih telah menggunakan bot ini, untuk mendukung bot ini kamu dapat membantu dengan berdonasi melalui link berikut:
1. Saweria: https://saweria.co/alvinmr
Donasi akan digunakan untuk pengembangan dan pengoperasian bot ini.
Terimakasih.`
}

const textTnC = () => {
    return `
Source code / bot ini merupakan program open-source (gratis) yang ditulis menggunakan Javascript, kamu dapat menggunakan, menyalin, memodifikasi, menggabungkan, menerbitkan, mendistribusikan, mensublisensikan, dan atau menjual salinan dengan tanpa menghapus author utama dari source code / bot ini.
Dengan menggunakan source code / bot ini maka anda setuju dengan Syarat dan Kondisi sebagai berikut:
- Source code / bot tidak menyimpan data anda di server kami.
- Source code / bot tidak bertanggung jawab atas sticker yang anda buat dari bot ini serta video, gambar maupun data lainnya yang anda dapatkan dari Source code / bot ini.
- Source code / bot tidak boleh digunakan untuk layanan yang bertujuan/berkontribusi dalam: 
    • seks / perdagangan manusia
    • perjudian
    • perilaku adiktif yang merugikan 
    • kejahatan
    • kekerasan (kecuali jika diperlukan untuk melindungi keselamatan publik)
    • pembakaran hutan / penggundulan hutan
    • ujaran kebencian atau diskriminasi berdasarkan usia, jenis kelamin, identitas gender, ras, seksualitas, agama, kebangsaan
Thanks To : https://github.com/YogaSakti/imageToSticker
Source Code : https://github.com/alvinmr/whatsapp-botver2
NodeJS WhatsApp library: https://github.com/open-wa/wa-automate-nodejs
Best regards, Alvin.`
}

module.exports = {
    textAdmin,
    textDonasi,
    textMenu,
    textTnC
}