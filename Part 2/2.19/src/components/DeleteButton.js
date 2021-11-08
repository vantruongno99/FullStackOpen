import React from 'react'
import '../index.css'
const DeleteButton = ({ person, handleOnDelete }) => {
    return <button className="deleteButton"
        onClick={() => handleOnDelete(person)}>
        delete
            </button>
}

export default DeleteButton