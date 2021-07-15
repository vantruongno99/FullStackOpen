import React from 'react'

const Filter = ({ filter, onChange }) => {
    return (
        <div>
            <form>
                <div>Filter show with: <input value={filter} onChange={onChange} /></div>
            </form>
        </div>
    )
}

export default Filter