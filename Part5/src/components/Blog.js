import React, { useState } from 'react'
const Blog = ({ blog, handleLikes, handleRemove, user }) => {

	const [expanded, setExpanded] = useState(false)
	const hideWhenExpanded = { display: expanded ? 'none' : '' }
	const showWhenExpanded = { display: expanded ? '' : 'none' }

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 2,
		marginBottom: 5,
	}
	return (
		<div>
			<div style={Object.assign({}, blogStyle, hideWhenExpanded)}>
				{blog.title} <button onClick={() => setExpanded(!expanded)}>view</button>
			</div>
			<div style={Object.assign({}, blogStyle, showWhenExpanded)}>
				{blog.title} <button onClick={() => setExpanded(!expanded)}>hide</button> <br />
				{blog.author}<br />
				{blog.url}<br />
				{blog.likes}{' '}
				<button className='like' onClick={() => handleLikes(blog.id, blog)}>like</button> <br />
				{user.username === blog.user.username &&
          <button type='button' onClick={() => handleRemove(blog.id)}>remove</button>}
			</div>
		</div>
	)
}

export default Blog