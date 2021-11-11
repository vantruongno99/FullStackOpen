import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs , handleLikes , handleRemove ,user }) => {
	return (
		<div>
			{blogs.sort((a, b) => b.likes - a.likes).map(blog =>
				<Blog key={blog.id} blog={blog} handleLikes={handleLikes} handleRemove={handleRemove} user={user} />
			)}
		</div>
	)
}

export default Blogs
