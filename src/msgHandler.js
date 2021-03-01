const {
    color,
    processTime,
    isUrl
} = require('../utils/index.js')
const {
    trans
} = require("../utils/translate.js")
const moment = require('moment-timezone')
const {
    decryptMedia
} = require('@open-wa/wa-automate')
const axios = require('axios')
const Text = require('../libs/texts/id.js')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
require('dotenv').config()


moment.tz.setDefault('Asia/Makassar').locale('id')

const msgHandler = async (client, message) => {
    try {
        const {
            type,
            id,
            from,
            t,
            sender,
            isGroupMsg,
            chat,
            caption,
            isMedia,
            mimetype,
            quotedMsg,
            quotedMsgObj,
            mentionedJidList
        } = message
        let {
            body
        } = message
        const {
            name,
            formattedTitle
        } = chat
        let {
            pushname
        } = sender
        const commands = caption || body || ''
        const command = commands.toLowerCase().split(' ')[0] || ''
        const args = commands.split(' ')

        const msgs = (message) => {
            if (!command.startsWith('#')) return 'Message'
            if (message.length >= 10) {
                return `${message.substr(0, 15)}`
            } else {
                return `${message}`
            }
        }

        const mess = {
            wait: '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar',
            error: {
                St: '[ ERROR ] Kirim gambar/video dengan caption *#sticker* atau reply gambar/video yang sudah dikirim',
                Qm: '[ ERROR ] Terjadi kesalahan, mungkin themenya tidak tersedia!',
                Yt3: '[ ERROR ] Terjadi kesalahan, tidak dapat meng konversi ke mp3!',
                Yt4: '[ ERROR ] Terjadi kesalahan, mungkin error di sebabkan oleh sistem.',
                Ig: '[ ERROR ] Terjadi kesalahan, mungkin karena akunnya private',
                Ki: '[ ERROR ] Bot tidak bisa mengeluarkan admin group!',
                Ad: '[ ERROR ] Tidak dapat menambahkan target, mungkin karena di private',
                Iv: '[ ERROR ] Link yang anda kirim tidak valid!'
            }
        }

        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
        const apiKey = process.env.API_KEY
        const botNumber = await client.getHostNumber()
        const blockNumber = await client.getBlockedIds()
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
        const ownerNumber = '6289670455568@c.us'
        const isOwner = sender.id === ownerNumber
        const isBlocked = blockNumber.includes(sender.id) === true
        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
        const family = JSON.parse(require('fs').readFileSync('./libs/family100.json'))
        const index = family.findIndex(fam => fam.groupId === groupId)
        if (!isGroupMsg) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mMSG\x1b[1;37m]', time, color(msgs(command)), 'from', color(pushname))
        if (isGroupMsg) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mMSG\x1b[1;37m]', time, color(msgs(command)), 'from', color(pushname), 'in', color(name || formattedTitle))
        if (isBlocked) return


        if (index >= 0) {
            // Cek apakah sender sudah terdaftar di room family dan cek apakah game sudah dimulai
            if (family[index].userId.includes(sender.id) && family[index].start) {
                // Cek apakah jawaban sama dengan yang dikirim user dan jawaban tidak ada di dalam list jawaban bener
                if (Object.keys(family[index].jawaban).includes(commands.toLowerCase()) && !family[index].jawaban[`${commands.toLowerCase()}`].userId) {
                    // Push jawaban bener                    
                    family[index].jawaban[`${commands.toLowerCase()}`].userId = sender.id
                    // Push score key idchat kalo belom ada
                    if (typeof (family[index].score[sender.id]) == 'undefined') {
                        Object.assign(family[index].score, {
                            [sender.id]: 1
                        })
                    } else {
                        // Nambahin score tiap jawaban bener
                        family[index].score[sender.id] += 1
                    }
                    var dataString = JSON.stringify(family)
                    require('fs').writeFileSync('./libs/family100.json', dataString)

                    // Buat nampilin jawaban yang bener sesuai key dari jawaban
                    var jawaban = family[index].soal
                    jawaban += "\n\n"
                    // Ngefilter jawaban yang ada di array jawaban sesuai dari array jawabanBener
                    var i = 1;
                    Object.keys(family[index].jawaban).forEach(key => {
                        if (family[index].jawaban[key].userId) {
                            jawaban += `\n${i}. ${key} @${family[index].jawaban[key].userId.replace(/@c.us/g, '')}`
                        } else {
                            jawaban += `\n${i}. ${key.split(',').join(',').replace(/[a-zA-z0-9]/g, '_ ').replace(/\s/g, '  ')}`
                        }
                        i++
                    })
                    //Cek kalo udah bener semua bakal nampilin pemain poin paling banyak
                    if (Object.values(family[index].jawaban).every(val => val.userId != false)) {
                        function getKeysWithHighestValue(o) {
                            var keys = Object.keys(o);
                            keys.sort(function (a, b) {
                                return o[b] - o[a];
                            })
                            console.log(keys);
                            return keys.splice(0, 1)
                        }
                        var menang = getKeysWithHighestValue(family[index].score)
                        console.log(menang);
                        await client.sendTextWithMentions(from, `${jawaban}\n\nSelamat!! berhasil terjawab semua, pemenangnya adalah @${menang.toString().replace(/@c.us/g, '')} dengan berhasil menjawab ${family[index].score[menang]}`)
                        family.splice(index, 1)
                        var dataString = JSON.stringify(family)
                        require('fs').writeFileSync('./libs/family100.json', dataString)
                    } else {
                        await client.sendTextWithMentions(from, jawaban)
                    }
                }
            }
        }

        switch (command) {
            case '#tnc':
                await client.reply(from, Text.textTnC(), id)
                break;

            case '#donasi':
                await client.reply(from, Text.textDonasi(), id)
                break;

            case '#help':
            case '#menu':
                await client.reply(from, Text.textMenu(pushname), id)
                if (isGroupAdmins) return await client.sendText(from, Text.textAdmin())
                break;

            case '#speed':
            case '#ping':
                await client.reply(from, `Pong!!!!\nSpeed: ${processTime(t, moment())} s`, id)
                break;

            case '#bc':
                if (!isOwner) return await client.reply(from, 'ogah kau bukan yang buat bot ini', id)
                let msg = body.slice(4)
                const allChat = await client.getAllChatIds()
                for (let ids of allChat) {
                    var idc = await client.getChatById(ids)
                    if (!idc.isReadOnly) await client.sendText(ids, `-BROADCAST BOT-\n\n${msg}`)
                }
                await client.reply(from, `Broadcast sukses, total chat ${allChat.length}`, id)
                break;

            case '#st':
            case '#sticker':
            case '#stiker':
                if (isMedia && type === 'image' || type === 'video') {
                    console.log(message);
                    const mediaData = await decryptMedia(message, uaOverride)
                    const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                    if (type === 'image') return await client.sendImageAsSticker(from, imageBase64, {
                        author: 'bot-alpin',
                        keepScale: true,
                        pack: 'gatau'
                    })
                    if (type === 'video') return await client.sendMp4AsSticker(from, imageBase64, {
                        author: 'bot-alpin',
                        keepScale: true,
                        pack: 'gatau'
                    })
                } else if (quotedMsg && quotedMsg.type == 'image' || quotedMsg.type == 'video') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                    if (quotedMsg.type === 'image') return await client.sendImageAsSticker(from, imageBase64, {
                        author: 'bot-alpin',
                        keepScale: true,
                        pack: 'gatau'
                    })
                    if (quotedMsg.type === 'video') return await client.sendMp4AsSticker(from, imageBase64, {
                        author: 'bot-alpin',
                        keepScale: true,
                        pack: 'gatau'
                    })
                } else if (args.length === 2) {
                    const url = args[1]
                    if (isUrl(url)) {
                        await client.sendStickerfromUrl(from, url, {
                                method: 'get'
                            }, {
                                author: 'bot-alpin',
                                keepScale: true,
                                pack: 'gatau'
                            })
                            .catch(err => console.log('Caught exception: ', err))
                    } else {
                        await client.reply(from, mess.error.Iv, id)
                    }
                } else {
                    await client.reply(from, mess.error.St, id)
                }
                break;



            case '#translate':
            case '#tr':
                if (args.length === 1) return await client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
                if (!quotedMsg) return client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
                const quoteText = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : '';
                trans(quoteText, args[1])
                    .then((result) => client.reply(from, `${result}`, id))
                    .catch((err) => console.log(err))
                break

            case '#bosen':
            case '#gabut':
                const boredText = await axios.get('http://www.boredapi.com/api/activity/')
                trans(boredText.data.activity, 'id')
                    .then((result) => client.reply(from, `Coba ${result.toLowerCase()}`, id))
                    .catch((err) => console.log(err))
                break;

            case '#apa':
            case '#apakah':
                const apakah = require('node-gtts')('id')
                const answer = ['iya', 'tidak', 'mungkin']
                if (args.length === 1) return await client.reply(from, 'apakah apa babi, yang jelas napa', id)
                let randomAnsw = Math.floor(Math.random() * answer.length)
                apakah.save('./libs/tts/resID.mp3', answer[randomAnsw], () => {
                    client.sendPtt(from, './libs/tts/resID.mp3', id)
                })
                break;

            case '#berapakah':
                await client.reply(from, `babi kau ${pushname}`, id)
                break;

            case '#arti':
                if (args.length === 1) return await client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
                var nama = body.slice(6)

                axios.get(`https://api.be-line.me/primbon/nama?nama=${nama}`)
                    .then(async (res) => {
                        await client.reply(from, `Nama : ${nama}\n${res.data.result}`, id)
                    })
                    .catch(async () => {
                        await client.reply(from, 'kayanya ada yang salah deh', id)
                    })
                break;

            case '#zodiac':
            case '#zodiak':
                if (args.length === 1) return await client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
                var zodiak = args[1]
                axios.get(`https://api.be-line.me/primbon/bintang?zodiac=${zodiak}`)
                    .then(async (res) => {
                        client.sendImage(from, res.data.result.img, 'zodiak.jpg', `Zodiac : ${zodiak} \n${res.data.result.information}`, id)
                    })
                    .catch(async () => {
                        await client.reply(from, 'kayanya ada yang salah deh', id)
                    })
                break;

            case '#kecocokan':
                if (args.length === 1) return await client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
                if (args[2] !== '|') return await client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
                const nama1 = args[1]
                const nama2 = args[3]
                axios.get(`https://lolhuman.herokuapp.com/api/jodoh/${nama1}/${nama2}?apikey=${process.env.API_KEY}`)
                    .then(async (res) => {
                        var hasilJodoh = `Hasilnya adalah :
                        Positif : ${res.data.result.positif}
                        Negatif : ${res.data.result.negatif}
                        
                        Deskripsi : ${res.data.result.deskripsi}`
                        await client.reply(from, hasilJodoh, id)
                    })
                    .catch(async () => {
                        await client.reply(from, 'kayanya ada yang salah deh', id)
                    })
                break;


            case '#wiki':
                if (args.length === 1) return await client.reply(from, 'kirim perintah *#wiki*\ncontoh : #wiki babi', id)
                const query = body.slice(6)
                axios.post(`https://id.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${query}`)
                    .then(async (res) => {
                        const qAwal = res.data.query.pages
                        const value = Object.values(qAwal)
                        value[0].extract ? await client.reply(from, value[0].extract, id) : await client.reply(from, 'wah maaf ga nemu nih di wiki', id)

                    })
                    .catch(async () => {
                        await client.reply(from, 'kayanya ada yang salah deh', id)
                    })
                break;

            case '#cari':
            case '#google':
                if (args.length === 1) return await client.reply(from, 'kirim perintah *#google*\ncontoh : #google babi', id)
                const queryGoogle = body.slice(8)
                axios.get(`https://api.be-line.me/googlesearch?search=${queryGoogle}&page=1`)
                    .then(async (res) => {
                        var result = 'Berikut hasil yang kudapetin di gugel\n\n';
                        for (var i = 0; i < res.data.result.length; i++) {
                            result += `-${res.data.result[i].title}\n${res.data.result[i].url}\n\n`
                        }
                        await client.reply(from, result, id)
                    })
                    .catch((err) => console.log(err))
                break;

            case '#say':
                if (args.length === 1) return await client.reply(from, 'Kirim perintah *#say* [id, en, jp, ar] [teks],\ncontoh *#say* id halo anak babi', id)
                const ttsId = require('node-gtts')('id')
                const ttsEn = require('node-gtts')('en')
                const ttsJp = require('node-gtts')('ja')
                const ttsAr = require('node-gtts')('ar')
                const dataText = body.slice(8)
                if (dataText === '') return await client.reply(from, 'bodoh kh?', id)
                if (dataText >= 250) return await client.reply(from, 'jangan kebanyakan babi', id)
                let dataBahasa = body.slice(5, 7)
                if (dataBahasa == 'id') {
                    ttsId.save('./libs/tts/resID.mp3', dataText, () => {
                        client.sendPtt(from, './libs/tts/resID.mp3', id)
                    })
                } else if (dataBahasa == 'en') {
                    ttsEn.save('./libs/tts/resEN.mp3', dataText, () => {
                        client.sendPtt(from, './libs/tts/resEN.mp3', id)
                    })
                } else if (dataBahasa == 'jp') {
                    ttsJp.save('./libs/tts/resJP.mp3', dataText, () => {
                        client.sendPtt(from, './libs/tts/resJP.mp3', id)
                    })
                } else if (dataBahasa == 'ar') {
                    ttsAr.save('./libs/tts/resAR.mp3', dataText, () => {
                        client.sendPtt(from, './libs/tts/resAR.mp3', id)
                    })
                } else {
                    await client.reply(from, 'Masukkan data bahasa : [id] untuk indonesia, [en] untuk inggris, [jp] untuk jepang, dan [ar] untuk arab', id)
                }
                break;

            case '#delall':
                if (!isGroupMsg) return await client.reply(from, 'Perintah ini cuma bisa dipake dalam group', id)
                if (!isOwner) return await client.reply(from, 'yeeu lu sapa bukan yang buat bot ini enak aje', id)
                const allChatDel = await client.getAllChatIds()
                for (let ids of allChatDel) {
                    var idc = await client.getChatById(ids)
                    if (!idc.isReadOnly) await client.deleteChat(ids)
                }
                await client.reply(from, `delete sukses, total chat dihapus ${allChatDel.length}`, id)

                break;

            case '#tagall':
                if (!isGroupMsg) return await client.reply(from, 'Perintah ini cuma bisa dipake dalam group', id)
                if (!isGroupAdmins) return await client.reply(from, 'Perintah ini cuma bisa dipake sama admin', id)
                console.log(quotedMsg);
                const grupMem = await client.getGroupMembers(groupId)
                let tag = `-Tag All-\n`
                if (args[1]) {
                    tag += `\nPesan : ${body.slice(8)}\n`
                } else if (quotedMsg) {
                    const quoteTextTag = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : quotedMsg.type == 'video' ? quotedMsg.caption : ''
                    tag += `\nPesan : ${quoteTextTag}\n`
                }
                let idMem
                for (let i = 0; i < grupMem.length; i++) {
                    idMem = grupMem[i].id
                    tag += `\n@${idMem.replace(/@c.us/g, '')}`
                }
                await client.sendTextWithMentions(from, tag)
                break;

            case '#sapa':
            case '#siapa':
            case '#siapakah':
                if (!isGroupMsg) return await client.reply(from, 'Perintah ini cuma bisa dipake dalam group', id)
                const jawaban = body.slice(1)
                const siapakah = body.slice(10)
                if (jawaban == 'siapakah') return await client.reply(from, 'Nanya yang jelas babi', id)
                if (siapakah.length <= 3) return await client.reply(from, 'Nanya yang jelas babi', id)
                const grupMem2 = await client.getGroupMembers(groupId)
                const randomTag = grupMem2[Math.floor(Math.random() * grupMem2.length)].id
                await client.sendTextWithMentions(from, `${jawaban} \njawaban : @${randomTag.replace(/@c.us/g, '')}`)
                break;

            case '#1cak':
                await client.sendImage(from, `https://lolhuman.herokuapp.com/api/onecak?apikey=${process.env.API_KEY}`, 'meme.jpg', '', id)
                    .catch(async (err) => {
                        await client.reply(from, 'Kayanya ada yang salah, coba hubungi admin', id)
                    })
                break;

            case '#bot':
                const text = body.slice(5)
                if (args.length === 1) return await client.reply(from, 'kirim perintah *#bot*\ncontoh : #bot maen yu', id)
                const simi = await axios.get(`https://lolhuman.herokuapp.com/api/simi?apikey=${process.env.API_KEY}&text=${text}`)
                if (simi.data.status != 200) return await client.reply(from, 'sori kaka fitur ini lagi limit. biar ga sering limit, kuy donasi ke https://saweria.co/alvinmr', id)
                await client.reply(from, simi.data.result, id)
                break;

            case '#twt':
                if (args.length === 1) return await client.reply(from, 'kirim perintah *#twt*\ncontoh : #twt https://twitter.com/dsyrhmw/status/1339135315047378944', id)
                await client.reply(from, mess.wait, id)
                const linkTwt = args[1]
                const isValidLink = linkTwt.match(new RegExp(/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/))
                if (!isValidLink) return await client.reply(from, 'hayo bukan link post twitter nih hehehew. coba lagi', id)
                const twt = await axios.get(`https://lolhuman.herokuapp.com/api/twitter?apikey=${process.env.API_KEY}&url=${linkTwt}`)
                const media = twt.data.result[0]
                if (!media) return await client.reply(from, 'sori kaka fitur ini lagi limit. biar ga sering limit, kuy donasi ke https://saweria.co/alvinmr', id)
                if (media.type == 'mp4') {
                    await client.sendFileFromUrl(from, media.link, 'twt.mp4', 'Nih vidnya', id)
                } else {
                    await client.reply(from, 'Maap nich cuma bisa download video hehe')
                }
                break;

            case '#ig':
                if (args.length === 1) return await client.reply(from, 'kirim perintah *#ig*\ncontoh : #ig https://www.instagram.com/p/CJi8O9TH1ky/', id)
                const linkIg = args[1]
                const isValidLinkIg = linkIg.match(new RegExp(/(https?:\/\/(?:www\.)?instagram\.com\/p\/([^/?#&]+)).*/g))
                if (!isValidLinkIg) return await client.reply(from, 'hayo bukan link post Instagram nih hehehew. coba lagi', id)
                const ig = await axios.get(`https://lolhuman.herokuapp.com/api/instagram?apikey=${process.env.API_KEY}&url=${linkIg}`)
                if (ig.data.status != 200) return await client.reply(from, 'sori kaka fitur ini lagi limit. biar ga sering limit, kuy donasi ke https://saweria.co/alvinmr', id)
                await client.sendImage(from, ig.data.result, 'ig.jpg', 'Nih photonya', id)
                break;

            case '#play':
                const search = body.slice(6)
                if (search.match(new RegExp(/(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w-_]+)/gmi))) {
                    var reqApi = await axios.get(`https://lolhuman.herokuapp.com/api/ytaudio?apikey=${process.env.API_KEY}&url=${search}`)
                    try {
                        client.reply(from, `Searching :  *"${reqApi.data.result.title}"* \nTunggu bentar ya`, id)
                        var fileBase = await client.downloadFileWithCredentials(reqApi.data.result.audio.link[3].link)
                        await client.sendPtt(from, `data:${mimetype};base64,${fileBase.toString('base64')}`, id)
                    } catch (error) {
                        await client.reply(from, 'ada yang salah nih, hubungi admin sana', id)
                        console.log(error);
                    }
                } else {
                    var reqApi = await axios.get(`https://lolhuman.herokuapp.com/api/ytplay?apikey=${process.env.API_KEY}&query=${search}`)
                    try {
                        client.reply(from, `Searching :  *"${reqApi.data.result.info.title}"* \nTunggu bentar ya`, id)
                        var fileBase = await client.download(reqApi.data.result.audio[4].link)
                        await client.sendPtt(from, fileBase, id)
                    } catch (error) {
                        await client.reply(from, 'ada yang salah nih, hubungi admin sana', id)
                        console.log(error);
                    }
                }

                break;


            case '#tulis':
            case '#nulis':
                const tulisan = body.slice(7)
                if (args.length === 1) return await client.reply(from, 'kirim perintah *#nulis*\ncontoh : #nulis apa aja', id)
                const nulis = await axios.get(`https://st4rz.herokuapp.com/api/nulis?text=${tulisan}`)
                if (nulis.data.status != 200) return await client.reply(from, 'sori kaka fitur ini lagi limit. biar ga sering limit, kuy donasi ke https://saweria.co/alvinmr', id)
                await client.sendImage(from, nulis.data.result, 'tulis.jpg', 'nih tulisannya gan', id)
                break;

            case '#fam':
            case '#family100':
                if (!isGroupMsg) return await client.reply(from, 'Perintah ini cuma bisa dipake dalam group', id)
                if (family.some(e => e.groupId === groupId)) {
                    await client.sendText(from, 'Game family 100 sudah dimulai. ketik *#nyerah* untuk menghentikan permainan')
                } else {
                    var fam = await axios.get(`https://lolhuman.herokuapp.com/api/tebak/family100?apikey=${process.env.API_KEY}`)

                    var dataJawaban = Object.values(fam.data.result.aswer).map(value => value.toLowerCase())
                    console.log(dataJawaban);
                    var dataSoal = fam.data.result.question
                    family.push({
                        "groupId": groupId,
                        "soal": dataSoal,
                        "jawaban": dataJawaban.reduce((acc, curr) => (acc[curr] = {
                            userId: ''
                        }, acc), {}),
                        "userId": [],
                        "score": {},
                        "start": false
                    })
                    var dataString = JSON.stringify(family)
                    require('fs').writeFileSync('./libs/family100.json', dataString)
                    await client.sendText(from, 'Game Family 100 akan dimulai, ketik *#join* untuk bergabung dalam game')
                }
                break;

            case '#join':
                if (!isGroupMsg) return await client.reply(from, 'Perintah ini cuma bisa dipake dalam group', id)
                if (family[index].start) return await client.reply(from, 'Sori yah kamu gabisa join soalnya lagi main xixi', id)
                if (family.some(e => e.groupId === groupId)) {
                    if (!family[index].userId.includes(sender.id)) {
                        family[index].userId.push(sender.id)
                        var dataString = JSON.stringify(family)
                        require('fs').writeFileSync('./libs/family100.json', dataString)
                        var user = `Pemain Family 100\n`
                        var userId
                        for (var i = 0; i < family[index].userId.length; i++) {
                            userId = family[index].userId
                            user += `\n${i+1}. @${userId[i].toString().replace(/@c.us/g, '')}`
                        }
                        user += `\nTunggu yang lain dulu yuk, terus ketik *#start* buat mulai yah`
                        await client.sendTextWithMentions(from, user)
                    } else {
                        await client.sendText(from, 'kamu udah gabung hey')
                    }
                } else {
                    await client.sendText(from, 'ketik *#family100* dulu dong')
                }
                break;

            case '#start':
                if (!isGroupMsg) return await client.reply(from, 'Perintah ini cuma bisa dipake dalam group', id)
                if (family[index].start && !family[index].userId.includes(sender.id)) return await client.sendText(from, 'udah dimulai gamenya gan, tunggu nanti waktu selesai ya haha')
                if (!family[index].start) {
                    if (family[index].userId.includes(sender.id)) {
                        if (family[index].userId.length) {
                            family[index].start = true
                            var soal = family[index].soal
                            soal += "\n\n"
                            var i = 1;
                            Object.keys(family[index].jawaban).forEach(key => {
                                soal += `\n${i}. ${key.split(',').join(',').replace(/[a-zA-z0-9]/g, '_ ').replace(/\s/g, '  ')}`
                                i++
                            })
                            await client.sendText(from, soal)
                            var dataString = JSON.stringify(family)
                            require('fs').writeFileSync('./libs/family100.json', dataString)
                        } else {
                            await client.sendText(from, 'kayaknya peserta dalam game belum ada nih. ketik *#join* buat gabung')
                        }
                    }
                } else {
                    await client.sendText(from, 'Udah dimulai njer')
                }
                break;

            case '#ganti':
                // Nanti dah kayanya keren
                break;

            case '#nyerah':
                if (!isGroupMsg) return await client.reply(from, 'Perintah ini cuma bisa dipake dalam group', id)
                if (!family[index].userId.includes(sender.id)) return await client.sendText(from, 'Sape elu main nyerah aja ga ikot maen')
                if (family.some(e => e.groupId && family[index].start)) {
                    if (family[index].userId.includes(sender.id)) {
                        // Random ngisi jawaban yang kosong
                        var randomProperty = function (obj) {
                            var keys = Object.keys(obj);
                            return obj[keys[keys.length * Math.random() << 0]];
                        };
                        var randomJawaban = randomProperty(Object.values(family[index].jawaban).filter(val => !val.userId))
                        randomJawaban.userId = "6283114427102@c.us *(ADMIN)*"

                        // Write soal + jawaban kembali
                        var nyerah = family[index].soal
                        nyerah += "\n\n"
                        var i = 1;
                        Object.keys(family[index].jawaban).forEach(key => {
                            if (family[index].jawaban[key].userId) {
                                nyerah += `\n${i}. ${key} @${family[index].jawaban[key].userId.replace(/@c.us/g, '')}`
                            } else {
                                nyerah += `\n${i}. ${key.split(',').join(',').replace(/[a-zA-z0-9]/g, '_ ').replace(/\s/g, '  ')}`
                            }
                            i++
                        })
                        nyerah += `\n\nPermainan selesai, makasih uda make bot ini. kuy donasi bantu aku untuk beli laptop baru #HelpBotBeliLaptop di https://saweria.co/alvinmr`
                        await client.sendTextWithMentions(from, nyerah)
                        family.splice(index, 1)
                        var dataString = JSON.stringify(family)
                        require('fs').writeFileSync('./libs/family100.json', dataString)
                    }
                } else {
                    // console.log();
                    await client.sendText(from, 'mau nyerah apaan, belom mulai')
                }
                break;

                // Fitur group
            case '#kick':
                if (!isGroupMsg) return await client.reply(from, 'mau ngapain make command ini ? ini bukan grup woi', id)
                if (!isGroupAdmins) return await client.reply(from, 'ups cuma bisa admin grup xixixi', id)
                if (!isBotGroupAdmins) return await client.reply(from, 'gagal, jadiin aku admin dulu lahhh', id)
                if (mentionedJidList.length === 0) return await client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
                if (mentionedJidList[0] === botNumber) return await client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
                await client.sendTextWithMentions(from, `Siap diterima, mengeluarkan:\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
                for (let i = 0; i < mentionedJidList.length; i++) {
                    if (groupAdmins.includes(mentionedJidList[i])) return await client.sendText(from, 'Gagal, kamu tidak bisa mengeluarkan admin grup.')
                    await client.removeParticipant(groupId, mentionedJidList[i])
                }
                break;

            case '#promote':
                if (!isGroupMsg) return await client.reply(from, 'mau ngapain make command ini ? ini bukan grup woi', id)
                if (!isGroupAdmins) return await client.reply(from, 'ups cuma bisa admin grup xixixi', id)
                if (!isBotGroupAdmins) return await client.reply(from, 'gagal, jadiin aku admin dulu lahhh', id)
                if (mentionedJidList.length != 1) return await client.reply(from, 'gagal, cuma bisa buat 1 user yahh xixixi', id)
                if (groupAdmins.includes(mentionedJidList[0])) return await client.reply(from, 'Maaf, user tersebut sudah menjadi admin. [Bot is Admin]', id)
                if (mentionedJidList[0] === botNumber) return await client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
                await client.promoteParticipant(groupId, mentionedJidList[0])
                await client.sendTextWithMentions(from, `Siap diterima, menambahkan @${mentionedJidList[0].replace('@c.us', '')} sebagai admin.`)
                break;

            case '#demote':
                if (!isGroupMsg) return await client.reply(from, 'mau ngapain make command ini ? ini bukan grup woi', id)
                if (!isGroupAdmins) return await client.reply(from, 'ups cuma bisa admin grup xixixi', id)
                if (!isBotGroupAdmins) return await client.reply(from, 'gagal, jadiin aku admin dulu lahhh', id)
                if (mentionedJidList.length !== 1) return await client.reply(from, 'gagal, cuma bisa buat 1 user yahh xixixi', id)
                if (!groupAdmins.includes(mentionedJidList[0])) return await client.reply(from, 'gagal, dia bukan admin ngapain mau di demote ?', id)
                if (mentionedJidList[0] === botNumber) return await client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
                await client.demoteParticipant(groupId, mentionedJidList[0])
                await client.sendTextWithMentions(from, `Siapp diterima, menghapus jabatan @${mentionedJidList[0].replace('@c.us', '')}.`)
                break;

            case '#del':
                // if (!isGroupAdmins) return await client.reply(from, 'ups cuma bisa admin grup xixixi', id)
                if (!quotedMsg) return await client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
                if (!quotedMsgObj.fromMe) return await client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
                console.log(quotedMsgObj);
                await client.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
                break;

            case '#bye':
                if (!isGroupMsg) return await client.reply(from, 'mau ngapain make command ini ? ini bukan grup woi', id)
                if (!isGroupAdmins) return await client.reply(from, 'ups cuma bisa admin grup xixixi', id)
                client.sendText(from, 'Good bye... ( ⇀‸↼‶ )').then(() => client.leaveGroup(groupId))
                break;


            default:
                break;
        }



        if (commands.toLowerCase().includes(await client.getHostNumber())) return await client.reply(from, 'apa', id)




    } catch (error) {
        console.log(color('[ERROR]', 'red'), error);

    }
}

module.exports = msgHandler