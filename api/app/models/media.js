var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var mediaSchema = new Schema({
    name: String,
    upc: Number,
    year: Number,
    picture_urls: Array,
    type: {type: String, enum: [
        'VHS','Laserdisc','DVD','Blu-ray',
    ]},
    video:{
        codec: {type: String, enum: ['H.264','H.265','VC-1','MPEG']},
        resolution: { type: String, enum: [
            '480i',
            '480p',
            '576p',
            '720i',
            '720p',
            '1080i',
            '1080p'
        ] },
    },
    audio: Array,
});

module.exports = mongoose.model('MediaObj', mediaSchema);