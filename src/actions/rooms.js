import { types } from "../types/types"

export const enterRoom = (id) => {
    return {
        type: types.enterRoom,
        payload : id
    }
}