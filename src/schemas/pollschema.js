const { model, Schema } = require('mongoose');

let vote = new Schema({
    Guild: String,
    Msg: String,
    UpMembers: Array,
    DownMembers: Array,
    UpVote: Number,
    DownVote: Number,
    Owner: String
});

module.exports = model('vote', vote);