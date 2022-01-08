import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes
  } from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { Chat } from '../components/chats/Chat';
import { Header } from '../components/chats/Header';
import { SideBar } from '../components/chats/SideBar';


import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login, startContactos, startLogin } from '../actions/auth';

const Body = styled.div`
    display: flex;
    height: 100vh;
`

export const AppRouter = () => {

    const dispatch = useDispatch();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    
    // Agregar el usuario a la base de datos 
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user?.uid) {
                const dataUser = {
                    uid: user?.uid,
                    name : user?.displayName,
                    email : user?.email,
                    photo : user?.photoURL
                }
                dispatch(startLogin(dataUser));
                dispatch(startContactos(user.uid))
            }
        })
    }, [dispatch])

    return (
        <Router>
            {
                !user
                ? <LoginScreen />
                :
                <>
                    <Header/>
                    <Body>
                        <SideBar 
                            name = {user.displayName}
                        />
                        <Routes>
                            <Route exact path = "/" element = {<Chat />} />
                        </Routes>
                    </Body>
                </>
            }
        </Router>
    )
}
