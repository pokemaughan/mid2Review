var mongoose = require('mongoose');
var CommentSchema = new mongoose.Schema({
  Name: String,
  votes: {type: Number, default: 0},
});
CommentSchema.methods.upvote = function(cb){
  this.votes+=1;
  this.save(cb);
}
mongoose.model('Candidate', CommentSchema);
