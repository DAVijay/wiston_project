module.exports = {
    development: {
        port: process.env.PORT || 8080,
        saltingRounds: 10
      },
    url: 'mongodb://localhost:27017/wiston-projects',
    secret : 'fb_marketing_api'
}