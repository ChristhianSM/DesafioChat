import { addDoc, collection } from 'firebase/firestore'
import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { enterRoom } from '../../actions/rooms'
import { db } from '../../firebase'

const SidebarOptionContainer =  styled.div`
    display: flex;
    align-items: center;
    font-size: 12px;
    padding-left: 2px;
    cursor: pointer;

    :hover{
        background-color: gray;
    }

    h3 {
        font-weight: 500;
    }

    h3 span {
        padding : 15px;
    }

    
`
const SidebarOptionChannel =  styled.h3`
    padding : 10px 0;
    font-weight: 300;
`


export const SidebarOption = ({Icon, title, addChannelOption,id}) => {
    const dispatch = useDispatch();

    const addChannel = async () => {
        const channelName = prompt("Ingrese el nombre dle canal");
        if (channelName) {
            try {
                const docRef = await addDoc(collection(db, "rooms"), {
                  name : channelName
                });
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
        }
    }

    const selectChannel = () => {
        if (id) {
            dispatch(enterRoom(id));
        }
    }

    return (
        <SidebarOptionContainer
            onClick={addChannelOption ?  addChannel : selectChannel}
        >
            {Icon && <Icon  fontSize = 'small' style = {{padding: "10px"}}></Icon>}
            {
                Icon 
                ? <h3>{title}</h3>
                : (
                    <SidebarOptionChannel>
                        <span>#</span>{title}
                    </SidebarOptionChannel>
                  )
            }
        </SidebarOptionContainer>
    )
}
