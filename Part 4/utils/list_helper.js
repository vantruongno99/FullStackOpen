const _ = require('lodash');

const totalLikes = (blogs) => blogs.reduce((sum, item) => sum += item.likes, 0);

const favoriteBlog = (blogs) => blogs.reduce((favorite, blog) => (favorite.likes > blog.likes ? favorite : game));

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return { message: 'Blog list is empty' };
  }

  blogs = _.chain(blogs).groupBy('author').groupBy('length').value();
  const maxNumberOfBlogs = Number(_.chain(blogs).keys().max().value());
  let authorMostBlogs = blogs[maxNumberOfBlogs][0][0].author;

  if (typeof authorMostBlogs === 'undefined') {
    authorMostBlogs = 'No author';
  }
  return {
    author: authorMostBlogs,
    blogs: maxNumberOfBlogs,
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return { message: 'Blog list is empty' };
  }

  const authorMostLikes = _.chain(blogs).groupBy('author').map((blogs, author) => {
    let likes = 0; // accumulate the likes per author
    _.each(blogs, (blog) => {
      likes += blog.likes;
    });
    return {
      author,
      likes,
    };
  }).orderBy('likes', 'desc')
    .first()
    .value();

  return authorMostLikes;
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
