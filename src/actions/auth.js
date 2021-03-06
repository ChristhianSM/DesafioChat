import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"
import { types } from "../types/types"


export const startLogin = (data) => {
    return async (dispatch) => {
        const newContactos = {
            contactos : ['Cristina', 'Percy', 'Javier', 'Alicia', 'Jaime', 'Lucia', 'Carrion', 'Tadeo', 'Renzo'], 
            chats : ['Jaime', 'Lucia', 'Carrion', 'Tadeo', 'Renzo'],
            info : data
        }
        await setDoc(doc(db, `user/${data.uid}`), newContactos);
       
        dispatch(login(data));
    }
}

export const startContactos = (uid) => {
    return async (dispatch) => {
        const contactosSnap = await getDoc(doc(db, `user/${uid}`));

        dispatch(setContactos( contactosSnap.data().contactos));
        dispatch(setChats( contactosSnap.data().chats));
    }
}

export const cambiarNombreUsuario = (name) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;
        // await updateDoc(doc(db, `user/${uid}`), {
        //     name
        // })
    }
}

export const setContactos = (contactos) => {
    return {
        type: types.setContactos,
        payload : contactos
    }
}

export const setChats = (chats) => {
    return {
        type: types.setChats,
        payload : chats
    }
}

export const  login= (data) => {
    return {
        type: types.login,
        payload : data
    }
}