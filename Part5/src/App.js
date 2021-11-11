import React, { useState, useEffect, useRef } from 'react'
import jwt_decode from 'jwt-decode'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import Togglable from './components/Togglable'
import Notificaton from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/Blogform'
const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null)

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		)
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			if (jwt_decode(user.token).exp < Date.now() / 1000) {
				handleLogout()
			}
			blogService.setToken(user.token)
			setUser(user)
		}
	}, [])

	const blogFormRef = useRef()

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username, password,
			})
			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(user)
			)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setErrorMessage('Wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const addBlog = (blogObject) => {
		try {
			blogFormRef.current.toggleVisibility()
			blogService.create(blogObject).then(returnedBlog =>
				setBlogs(blogs.concat(returnedBlog))
			)
			setErrorMessage(`${blogObject.title} has been addded`)
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		} catch (error) {
			setErrorMessage('Wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const handleLikes = async (id, blog) => {
		try {
			const updatedBlog = {
				likes: blog.likes + 1
			}
			const returnedBlog = await blogService.update(id, updatedBlog)
			setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
			console.log(returnedBlog)
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		} catch (error) {
			console.log(error)
			setErrorMessage('Wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const handleRemove = async (id) => {
		try {
			const selectedBlog = blogs.find(n => n.id === id)
			if (window.confirm(`remove blog ${selectedBlog.title} by ${selectedBlog.author}`)) {
				console.log('1')
				await blogService.remove(id)
				setBlogs(blogs.filter(n => n.id !== id))
			}
		} catch (error) {
			setErrorMessage('Wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}


	const blogForm = () => (
		<Togglable buttonLabel='creat new blog' ref={blogFormRef}>
			<BlogForm createBlog={addBlog} />
		</Togglable>
	)

	const handleLogout = (event) => {
		event.preventDefault()
		window.localStorage.clear()
		setUser(null)

	}

	if (user === null) {
		return (
			<div>
				<Notificaton message={errorMessage} />
				<h2>Log in to application</h2>
				<Togglable buttonLabel='login'>
					<LoginForm
						username={username}
						password={password}
						handleUsernameChange={({ target }) => setUsername(target.value)}
						handlePasswordChange={({ target }) => setPassword(target.value)}
						handleSubmit={handleLogin}
					/>
				</Togglable>
			</div>
		)
	}

	return (
		<div>
			<Notificaton message={errorMessage} />
			<h2>blogs</h2>
			<p>
				{user.name} logged in <button onClick={handleLogout}>logout</button>
			</p>
			{blogForm()}
			<Blogs blogs={blogs} handleLikes={handleLikes} handleRemove={handleRemove} user={user} />


		</div>
	)
}

export default App