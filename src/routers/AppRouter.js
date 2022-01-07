import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes
  } from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { Chat } from '../components/chats/Chat';
import { Header } from '../components/chats/Header';
import { SideBar } from '../components/chats/SideBar';

import styled from 'styled-components'

const Body = styled.div`
    display: flex;
    height: 100vh;
`

export const AppRouter = () => {
    return (
        <Router>
            <Header />
            <Body>
                <SideBar />
                <Routes>
                    <Route exact path = "/chat" element = {<Chat />} />
                </Routes>
            </Body>
        </Router>
    )
}
