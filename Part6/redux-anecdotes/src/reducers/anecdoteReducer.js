import anecdoteService from '../services/anecdote'

const anecdoteReducer = (state = [], action) => {
  console.log('action', action)
  switch (action.type) {
    case 'VOTE': {
      return state.map(anecdote => anecdote.id !== action.data.id ? anecdote : action.data)
    }
    case 'ADD_ANECDOTE': {
      return [...state, action.data]
    }
    case 'INIT_ANECDOTES':
      return action.data
  }

  return state
}

export const initializeAanecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}


export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const voteAnecdote = anecdote =>{
  return async dispatch =>{
    const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const updatedAnecdote = await anecdoteService.update(anecdote.id, votedAnecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export default anecdoteReducer