const initialState = {
    message: null,
    timeoutID: null
}


const notificationReducer = (state = 'Welcome!!', action) => {
    console.log('action', action)
    switch (action.type) {
        case 'NOTIFICATION': if (state.timeoutID) {
            clearTimeout(state.timeoutID)
        }
            return {
                message: action.data,
                timeoutID: null
            }
        case 'NO_NOTIFICATION': return {
            message: null,
            timeoutID: null
        }

        case 'SET_TIMEOUT_ID':
            return {
                message: state.message,
                timeoutID: action.data
            }

        default:
            return state
    }

}



export const setNotification = (message, time = 5) => {
    return async dispatch => {
        dispatch({
            type: 'NOTIFICATION',
            data: message
        })
        const timeoutId = setTimeout(() => {
            dispatch({
                type: 'NO_NOTIFICATION',
            })
        }, time * 1000)
        dispatch(createSetTimeoutAction(timeoutId))
    }
}

const createSetTimeoutAction = (timeoutID) => ({
    type: 'SET_TIMEOUT_ID',
    data: timeoutID
})


export default notificationReducer