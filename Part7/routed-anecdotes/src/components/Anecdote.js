import React from "react"

const Anecdote = ({ anecdote }) => {
  return(
    <div>
      <h2>{anecdote.content}</h2>
      <div>{anecdote.user}</div>
      has {anecdote.votes} votes
      <br />
      for more info see <a href={anecdote.info}>{anecdote.info}</a>
      <br /><br />
    </div >
  )}
  
export default Anecdote