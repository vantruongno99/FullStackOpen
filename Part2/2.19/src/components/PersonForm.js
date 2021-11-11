import React from 'react'
import '../index.css'
const PersonForm = ({onSubmit, newName, handleNameChange, newNumber, handleNumberChange}) =>
  <form onSubmit={onSubmit}>
        <div>
            name:&nbsp;&nbsp;&nbsp;&nbsp; <input  value={newName} onChange={handleNameChange}  />
        </div>
        <div>
            number:&nbsp; <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
            <button className="addButton" type="submit">add</button>
        </div>
    </form>

export default PersonForm