import {ADD_USER, CHANGE_OPEN_THREAD, DEL_USER} from "./actions";

const defaultState = {
    user: {},
    openThread: null
};

export const rootReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                user: action.payload
            };
        case DEL_USER:
            return {
                ...state,
                user: action.payload
            };
        case CHANGE_OPEN_THREAD:
            return {
                ...state,
                openThread: action.payload
            }
        // case
    }
    return state;
};