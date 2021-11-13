import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const filterrdAnecdotes = anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    const dispatch = useDispatch()

    const addVote = anecdote => {
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`you voted for ${anecdote.content}` , 10 ))
    }

    return (<div>
        {filterrdAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => addVote(anecdote)}>vote</button>
                </div>
            </div>
        )}
    </div>)
}

export default AnecdoteList