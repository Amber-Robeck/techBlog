const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');


Post.belongsTo(User, {
  foreignKey: 'user_Id',
  onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
  foreignKey: 'post_Id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_Id',
  onDelete: 'CASCADE'
});

//New relationships for updated models
User.hasMany(Post, {
  foreignKey: 'user_Id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_Id',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
  foreignKey: 'user_Id',
  onDelete: 'CASCADE'
});


module.exports = {
  User,
  Comment,
  Post
};