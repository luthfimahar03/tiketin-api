const OneSignal = require('onesignal-node')

module.exports = new OneSignal.Client({
    userAuthKey: process.env.ONESIGNAL_USER_AUTH_KEY,
    app: {
        appAuthKey: process.env.ONESIGNAL_APP_KEY,
        appId: process.env.ONESIGNAL_APP_ID
    }
})
  