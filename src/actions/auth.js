import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase"
import { types } from "../types/types"


export const startLogin = (data) => {
    return async (dispatch) => {
        const newContactos = {
            contactos : ['Cristina', 'Percy', 'Javier'] 
        }
        await addDoc(collection(db, `user/${data.uid}/contactos`), newContactos);
        await addDoc(collection(db, `user/${data.uid}/info`), data);
        dispatch(login(data));
    }
}

export const startContactos = (uid) => {
    return async (dispatch) => {
        console.log(uid)
        const contactosSnap = await getDocs(query(collection(db, `user/${uid}/contactos`)))
        const contactos = [];
        
        contactosSnap.forEach( snapHijo => {
            contactos.push({
                id: snapHijo.id,
                ...snapHijo.data()
            })
        })

        console.log(contactos);
        dispatch(setContactos(contactos));
    }
}

export const setContactos = (contactos) => {
    return {
        type: types.setContactos,
        payload : contactos
    }
}

export const  login= (data) => {
    console.log(data)
    return {
        type: types.login,
        payload : data
    }
}