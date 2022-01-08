import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            return {
                ...state,
                uid :action.payload.uid,
                name : action.payload.name,
                email : action.payload.email,
                photo : action.payload.photo,
            };
        case types.setContactos:
            return {
                ...state,
                contactos : action.payload
            };
        

        default:
            return state;
    }
}