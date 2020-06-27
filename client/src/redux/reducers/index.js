
const initialState = {
    links: [],
    quizes: []
}
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LINKS_LOADED':
            return {
                ...state,
                links: action.payload
            }
        case 'QUIZ_LOADED':
            return {
                ...state,
                quizes: action.payload
            }
        default: return state
    }
}

export default reducer;