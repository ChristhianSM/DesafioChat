import { types } from "../types/types";

const initialState = {
    idRoom : null
}
export const RoomsReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.enterRoom:
            return {
                ...state,
                idRoom : action.payload
            }
        default:
            return state;
    }
}
