const translate = require('@vitalets/google-translate-api')

const trans = (text, lang) => new Promise( (resolve, reject) => {
        console.log(`Translate into ${lang}`)
        translate(text, {client: 'gtx', to: lang})
            .then((res) => resolve(res.text))
            .catch((err) => reject(err))    
    })


module.exports = {
    trans
}