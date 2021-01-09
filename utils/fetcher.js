const fetch = require('node-fetch')

export const fetchJson =  (url, options = '') =>{
    new Promise(async (resolve, reject) => {
        fetch(url, options)
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(err => {
                console.log(err)
                reject(err)
            }
            )
    })
}

export const fetchBase64 = async (url) => {
    const response = await fetch(url, {headers : {'User-Agent': 'okhttp/4.5.0'}})
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)
    const buffer = await response.buffer()
    const videoBase64 = `data:${response.headers.get('content-type')};base64,` + buffer.toString('base64')
    if (buffer) return videoBase64
}

