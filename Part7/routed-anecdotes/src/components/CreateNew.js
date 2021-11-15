import React, { useState } from 'react'
import { useField } from '../hooks'
const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      'content' : content.value,
      'author' : author.value,
      'info' : info.value,
      votes: 0
    })
    props.notify(`a new ${content.value} has been added`)
    resetForm()
  }

  const resetForm = () =>{
    content.onReset() 
    author.onReset()
    info.onReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form >
        <div>
          content
          <input name='content' {...content} />
        </div>
        <div>
          author
          <input name='author' value={author} {...author} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} {...info} />
        </div>
        <button onClick={handleSubmit}>create</button>
        <button onClick={resetForm}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew