import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom"
import Menu from './components/Menu'
import CreateNew from './components/CreateNew'
import About from './components/About'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const notify = (content)  =>{
    setNotification(content)
    setTimeout(() => {
      setNotification("")
    }, 10000);
  }

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useRouteMatch('/anecdotes/:id')

  const anecdote = match
    ? anecdotes.find(anecdote => parseInt(anecdote.id) == parseInt(match.params.id))
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Router>
        <Menu />
        {notification}
        <Switch>
          <Route path="/anecdotes/:id">
            <Anecdote anecdote={anecdote} />
          </Route>
          <Route path="/anecdotes">
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
          <Route path="/createnew">
            <CreateNew addNew={addNew} notify = {notify} />
          </Route>
          <Route path="/about">
            <About />
          </Route>

        </Switch>
        <div>
          <i>Note app, Department of Computer Science 2021</i>
        </div>
      </Router>

    </div>
  )
}

export default App;