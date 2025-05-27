const { model, Schema } = require('mongoose')
 
let welcomeschema = new Schema({
    Guild: String,
    Channel: String,
    Picture: String
})
 
module.exports = model('welcomeschema', welcomeschema);