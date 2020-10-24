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

4. *#memesticker* _<teks atas>_ | _<teks bawah>_
Untuk membuat sticker meme dengan teks atas dan bawah
Penggunaan: kirim gambar dengan caption _*#meme aku atas | kamu bawah*_, atau juga bisa dengan membalas gambar yang sudah ada.

Lain-lain:
1. *#translate* _<kode bahasa>_
Untuk mengartikan pesan menjadi bahasa yang ditentukan.
Penggunaan: Balas/quote/reply pesan yang ingin kamu translate dengan _*#translate id*_ <- id adalah kode bahasa. kode bahasa dapat dilihat di *https://bit.ly/33FVldE*

2. *#resi* _<kurir>_ _<nomer resi>_
Untuk memeriksa status pengiriman barang, daftar kurir: jne, pos, tiki, wahana, jnt, rpx, sap, sicepat, pcp, jet, dse, first, ninja, lion, idl, rex.
Penggunaan: kirim pesan dengan format _*#resi jne 1238757632*_

3. *#makememe* _<teks atas>_ | _<teks bawah>_
Untuk membuat meme dengan teks atas dan bawah
Penggunaan: kirim gambar dengan caption _*#meme aku atas | kamu bawah*_, atau juga bisa dengan membalas gambar yang sudah ada.

4. *#meme*
Mengirim meme random (bener bener random gabisa diatur meme apa)

5. *#say* [id, jp, ar, en] _<teks>_
Mengubah teks menjadi suara dengan batas teks 250 kata
Penggunaan : #say id anak babi kalian

6. *#wiki* _<kata kunci>_
Mencari penjelasan berdasarkan wikipedia sesuai dengan kata kunci yang dikirimkan
Penggunaan : #wiki robot

7. *#ceklokasi*
Cek lokasi penyebaran covid-19 di daerah sekitarmu (kelurahan).
Penggunaan: kirimkan lokasimu lalu balas/quote/reply lokasi yang kamu kirim dengan _*#ceklokasi*_

8. *#tnc*
Menampilkan Syarat dan Kondisi Bot.

9. *#donasi*
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