import React from 'react'
import styled from 'styled-components'

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
const SidebarOptionChannel =  styled.div`
`


export const SidebarOption = ({Icon, title, addChannelOption}) => {

    const addChannel = () => {
        console.log("Hola")
    }

    const selectChannel = () => {

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
                        <span>$</span>{title}
                    </SidebarOptionChannel>
                  )
            }
        </SidebarOptionContainer>
    )
}
