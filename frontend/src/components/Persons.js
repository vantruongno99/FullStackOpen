import React from 'react';
import DeleteButton from './DeleteButton'
import '../index.css'

const Persons = ({persons , handleOnDelete}) =>{ 
    return persons.map(person =>
        <ul className="personList" >
        <li key={person.id}>
                {person.name} - {person.number}
                <DeleteButton person = {person}
                handleOnDelete = {handleOnDelete}/>
        </li>
        </ul>
    )
}
export default Persons