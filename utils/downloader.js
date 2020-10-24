const { twitter } = require('video-url-link')
const { promisify } =  require('util')

const twtGetInfo = promisify(twitter.getInfo)

const twt = (url) => new Promise((resolve, reject) => {
    console.log('GET Metadata from =>', url)
    twtGetInfo(url, {})
        .then((content) => resolve(content))
        .catch((err) => {
            console.log(err)
            reject(err)
        })
}) 

module.exports = {
    twt
}

