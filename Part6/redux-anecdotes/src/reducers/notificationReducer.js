const notificationReducer = (state = 'Welcome!!', action) => {
    console.log('action', action)
    switch (action.type) {
        case 'NOTIFICATION': return action.message
        default: return state

    }
}


export const setNotification = (message , time ) =>{
    return async dispatch =>{
      dispatch({
        type: 'NOTIFICATION',
        message: message
      })
      setTimeout(() => {
        dispatch({
          type: 'NOTIFICATION' ,
          message: ''
        })
      }, time * 1000)
    }
  }


export default notificationReducer