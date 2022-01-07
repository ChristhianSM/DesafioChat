import { Button } from '@mui/material';
import React, { useRef, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import styled from 'styled-components';
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase';
// import firebase from 'firebase/firestore'

const ChatInputContainer = styled.div`
    border-radius :  20px;

    form {
        position: relative;
        display: flex;
        justify-content: center;

        input {
            position: fixed;
            bottom: 30px;
            width:60%;
            border: 1px solid gray;
            border-radius: 3px;
            padding: 20px;
            outline: none;
        }

        button {
            display: none !important;
        }
    }
`
export const ChatInput = ({channelName, channelId, chatRef}) => {
    const [input, setInput] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!channelId) {
            return false;
        }

        try {
            const docRef = await addDoc(collection(db,`rooms/${channelId}/messages`), {
                message: input,
                timeStamp : new Date().getTime(),
                user : 'Christhian',
                image : 'https://i.pinimg.com/originals/e9/57/2a/e9572a70726980ed5445c02e1058760b.png'
            })

            setInput('');
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
    return (
        <ChatInputContainer>
            <form action="">
                <input 
                    value={input}
                    onChange={ e => setInput(e.target.value)}
                    type="text" 
                    placeholder={`Mensaje para ${channelName}`}
                />
                <Button 
                    hidden 
                    type = 'submit'
                    onClick={sendMessage}
                >
                    <SendIcon />
                </Button>
            </form>
        </ChatInputContainer>
    )
}
