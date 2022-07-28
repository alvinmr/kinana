module.exports = options = (headless, start) => {
    const options = {
        headless: headless,
        qrRefreshS: 20,
        qrTimeout: 0,
        authTimeout: 0,
        autoRefresh: true,
        multiDevice: true,
        restartOnCrash: start,
        cacheEnabled: false,
        killProcessOnBrowserClose: true,
        throwErrorOnTosBlock: false,
    }

    return options
}