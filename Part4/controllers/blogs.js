const blogsRouter = require('express').Router();
const middleware = require('../utils/middleware');
const Blog = require('../models/blog');


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 });
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post('/',middleware.userExtractor, async (request, response) => {
  const user = request.user
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: user._id
  });
  const savedBlog = await blog.save();
  const respondBlog = await blog.populate('user', { username: 1, name: 1 });
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save({ validateModifiedOnly: true })
  response.json(respondBlog);
});

blogsRouter.delete('/:id',middleware.userExtractor, async (request, response) => {
  const user = request.user
  const deletedBlog = await Blog.findById(request.params.id);
  if(!deletedBlog){
    return response.status(404).json({ error: 'blog id not found' })
  }else if(deletedBlog.user.toString() !== user._id.toString()){
    return res.status(401).json({ error: 'unmatched blog and user' })
  }
  await deletedBlog.remove()
  response.status(204).end();
});

blogsRouter.put('/:id',middleware.userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({ error: 'blog id not found' })
  }
  else if (blog.user.toString() !== user._id.toString()) {
    response.status(404).end();
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true });
  if (updatedBlog) {
    const respondBlog = await updatedBlog.populate('user', { username: 1, name: 1 })
    response.json(respondBlog)
  }
  else {
    response.status(404).end();
  }
});

module.exports = blogsRouter;
