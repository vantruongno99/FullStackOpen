import React from 'react'

const Filter = ({ filter, onChange }) => {
    return (
        <div>
            <form>
                <div>Filter show with:&nbsp; <input value={filter} onChange={onChange} /></div>
            </form>
        </div>
    )
}

export default Filter