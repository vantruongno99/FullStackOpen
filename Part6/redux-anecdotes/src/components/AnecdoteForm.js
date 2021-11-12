import React from 'react'
import { useDispatch } from 'react-redux'
import { add } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        event.target.newAnecdote.value = ''
        dispatch(add(content))
    }

    return (<div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div><input name='newAnecdote' /></div>
            <button type='submit '>create</button>
        </form>
    </div>)
}

export default AnecdoteForm