import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        event.target.newAnecdote.value = ''
        dispatch(createAnecdote(content))
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