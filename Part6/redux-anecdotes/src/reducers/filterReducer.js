const filterReducer = (state = '', action) => {
    console.log('action', action)
    switch (action.type) {
        case 'FILTER': return action.message
        default: return state

    }
}

export const filter = (content) => {
    return ({
        type: 'FILTER',
        message : content
      })

}


export default filterReducer