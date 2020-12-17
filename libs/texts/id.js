const textMenu = (pushname) => {
    return `halo, ${pushname}! 👋️
nih menu menunya🎉
sticker creator:
*#sticker*
Untuk merubah gambar/video menjadi sticker. 
Penggunaan: kirim gambar/video dengan caption #sticker atau balas gambar yang sudah dikirim dengan #sticker

*#sticker* _<url / link gambar/video>_
Untuk merubah gambar/video dari url menjadi sticker. 
Penggunaan: kirim pesan dengan format *#sticker https://memegenerator.net/img/instances/46952448.jpg*

*#gifsticker* _<Giphy URL>_ / *#stickergif* _<Giphy URL>_
Untuk merubah gif menjadi sticker (Giphy Only)
Penggunaan: Kirim pesan dengan format *gifsticker https://media.giphy.com/media/JUvI2c1ddyzkwK4RlV/giphy.gif*


Lain-lain:
*#tr* _<kode bahasa>_
Untuk mengartikan pesan menjadi bahasa yang ditentukan.
Penggunaan: Balas/quote/reply pesan yang ingin kamu translate dengan _*#translate id*_ <- id adalah kode bahasa. kode bahasa dapat dilihat di *https://bit.ly/33FVldE*

*#say* [id, jp, ar, en] _<teks>_
Mengubah teks menjadi suara dengan batas teks 250 kata
Penggunaan : #say id anak babi kalian

*#wiki* _<kata kunci>_
Mencari penjelasan berdasarkan wikipedia sesuai dengan kata kunci yang dikirimkan
Penggunaan : #wiki anjing

*#arti _<nama kamu>_*
Mencari arti nama
Penggunaan : #arti yanto

*#kecocokan* _<nama 1>_ | _<nama 2>_
Mengecek kecocokan pasangan berdasarkan nama
Penggunaan : #kecocokan jodi | akbar

*#zodiac* _<zodiac>_ 
Ramalan zodiac harian
Penggunaan : #zodiac aries

*#gabut*
Memberi sebuah saran agar kamu ga gabut
Penggunaan : #gabut

*#apakah* _<pertanyaanmu>_
Menjawab sebuh pertanyaanmu
Penggunaan : #apakah aku ganteng bot ?

*#siapakah* _<pertanyaanmu>_
Random ngetag orang yang ada di grup mu
Penggunaan : #siapakah orang paling babi ?

*#twt* _<link post twitter>_
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