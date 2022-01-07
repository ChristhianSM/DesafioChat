import React, { useEffect, useRef } from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import InfoIcon from '@mui/icons-material/Info';

import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import { ChatInput } from './ChatInput';
import { addDoc, collection, doc, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { Message } from './Message';

const ChatContainer = styled.div`
    flex : 0.7;
    flex-grow: 1;
    overflow-y : scroll;   
    margin-top : 60px; 
`

const HeaderChat =  styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
`
const HeaderLeft =  styled.div`
    display : flex;
    align-items : center;
    h4 {
        display: flex;
        text-transform:lowercase;
    }

    .MuiSvgIcon-root {
        margin-left:10px;
        font-size : 18px;
    }
`
const HeaderRight =  styled.div`
    p {
        display: flex;
        align-items:center;
        font-size:16px;

        .MuiSvgIcon-root {
            margin-right: 10px;
            font-size : 18px;
        }
    }
`

const ChatMessages = styled.div`

`

export const Chat = () => {
    const chatRef = useRef(null);
    const {idRoom} = useSelector(state => state.room);
    const [roomDetails] = useDocument(
        idRoom && doc(db, "rooms", idRoom)
    )
    
    const [roomMessage, loading] = useCollection(
        idRoom && collection(db, `rooms/${idRoom}/messages`)
    )

    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behavior : 'smooth',
        });
    }, [idRoom, loading])

    return (
        <ChatContainer> 
            <HeaderChat>
                <HeaderLeft>
                    <h4><strong>#{roomDetails?.data().name}</strong></h4>
                    <StarBorderIcon />
                </HeaderLeft>
                <HeaderRight>
                    <p>
                        <InfoIcon /> Details
                    </p>
                </HeaderRight>
            </HeaderChat>

            <ChatMessages>
                {
                    roomMessage?.docs.map( doc => {
                        const {message, timeStamp, user , image} = doc.data();

                        return (
                            <Message 
                                key={ doc.id}
                                message = {message}
                                timeStamp = {timeStamp}
                                user = {user}
                                image = {image}
                            />
                        )  
                    })
                }
            </ChatMessages>

            <ChatInput 
                chatRef = {chatRef}
                channelName={roomDetails?.data().name}
                channelId = {idRoom}
            />
        </ChatContainer>
    )
}
