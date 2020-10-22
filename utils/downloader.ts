const { twitter } = require('video-url-link')
import { promisify } from 'util';

const twtGetInfo = promisify(twitter.getInfo)

export const twt = (url) => new Promise((resolve, reject) => {
    console.log('GET Metadata from =>', url)
    twtGetInfo(url, {})
        .then((content) => resolve(content))
        .catch((err) => {
            console.log(err)
            reject(err)
        })
    
}) 

