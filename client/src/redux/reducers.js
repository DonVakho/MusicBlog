const initialState = {
    loggedIn: false,
    userName: 'Guest'
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            state = {
                ...state,
                loggedIn: true,
                userName: action.payload
            }
            break;
        case 'LOG_OUT':
            state = {
                ...state,
                loggedIn: false,
                userName: 'Guest'
            }
            break;
        default:
            return state
    }
    return state;
}