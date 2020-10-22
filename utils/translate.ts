import translate from 'google-translate-open-api'

export const trans = (text, lang) => new Promise((resolve, reject) => {
    console.log(`Translate into ${lang}`)
    translate(text, {tld: 'cn', to: lang})
        .then((text) => resolve(text.data[0]))
        .catch((err) => reject(err))
    
})