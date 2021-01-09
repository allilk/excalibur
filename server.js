
// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port
// API MODELS
var mongoose   = require('mongoose');
const uri = "";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }); // connect to our database

var MediaObj     = require('./app/models/media');
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
router.route('/media')
    // create a media (accessed at POST http://localhost:8080/api/media)
    .post(function(req, res) {

        var media = new MediaObj();      // create a new instance of the media model
        media.name = req.body.name;  // set the media name (comes from the request)
        media.year = req.body.year;
        media.video.resolution = req.body.resolution;
        media.audio = req.body.audio;
        // save the media and check for errors
        media.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'media created!' });
        });
    })
    // get all the media (accessed at GET http://localhost:8080/api/media)
    .get(function(req, res) {
        MediaObj.find(function(err, media) {
            if (err)
                res.send(err);

            res.json(media);
        });
    });
router.route('/media/:media_id')
    // get the media with that id (accessed at GET http://localhost:8080/api/media/:media_id)
    .get(function(req, res) {
        MediaObj.findById(req.params.media_id, function(err, media) {
            if (err)
                res.send(err);
            res.json(media);
        });
    })
    .put(function(req, res) {

        // use our media model to find the media we want
        MediaObj.findById(req.params.media_id, function(err, media) {

            if (err)
                res.send(err);

            media.name = req.body.name;  // update the medias info
            media.video.resolution = req.body.resolution;
            media.audio = req.body.audio;
            // save the media
            media.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'media updated!' });
            });

        });
    })
    .delete(function(req, res) {
        MediaObj.remove({
            _id: req.params.media_id
        }, function(err, media) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);