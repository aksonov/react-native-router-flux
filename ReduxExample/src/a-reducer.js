const INITIAL_STATE = {data: null};

export default (state = INITIAL_STATE, {type, payload}) => {
    switch (type) {
        case 'data':
            return {...state, data: payload};

        default:
            return state
    }
}