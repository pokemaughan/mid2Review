var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Candidate = mongoose.model('Candidate');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/voting', function(req, res, next) {
  console.log("in Voting Get");
  Candidate.find(function(err, candidates){
    if(err){ return next(err); }
    res.json(candidates);
  });
});

router.post('/voting', function(req, res, next) {
  console.log("in Voting Post");
  var candidate = new Candidate(req.body);
  candidate.save(function(err,candidate){
    if(err){return next(err);}
    res.json(candidate);
  });
});

router.param('candidate', function(req, res, next, id){
  console.log("in Candidate Param");
  var query = Candidate.findById(id);
  query.exec(function(err, candidate){
    if(err) {return (next(err));}
    if(!candidate){return next(new Error("can't find candidate"))};    req.candidate = candidate;
    return next();
  });
});

router.get('/voting/:candidate', function(req,res){
  console.log("in voting candidate");
  res.json(req.candidate);
});

router.put('/voting/:candidate/upvote', function(req, res, next){
  req.candidate.upvote(function(err, candidate){
    if(err) {return next(err);}
    res.json(candidate);
  });
});

router.delete('/voting/:candidate', function (req, res) {
  console.log("In Delete");
  req.candidate.remove();
  res.sendStatus(200);
});

module.exports = router;
