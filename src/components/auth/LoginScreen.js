import { Button } from '@mui/material'
import { getAuth, signInWithPopup } from 'firebase/auth'
import React from 'react'
import styled from 'styled-components'
import { googleAuthProvider } from '../../firebase'

const LoginContainer = styled.div`
    background-color : #f8f8f8;
    height: 100vh;
    display: grid;
    place-items: center;
`

const LoginInnerContainer =  styled.div`
    padding : 50px;
    text-align: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

    button {
        margin-top: 10px;
        padding : 10px;
        cursor: pointer;
    }
`

// const Google
export const LoginScreen = () => {

    const handleSign = (e) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider);
    }

    return (
        <LoginContainer>
            <LoginInnerContainer>
                <div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                </div>
                <Button 
                    onClick={handleSign}
                ><b>Sign in with google</b></Button>
            </LoginInnerContainer>
        </LoginContainer>
    )
}
