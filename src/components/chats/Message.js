import React from 'react'
import styled from 'styled-components'

const MessageContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;

    img {
        height : 50px;
        border-radius: 100%;
        border: 1px solid lightgrey;
    }
`
const MessageInfo = styled.div`
    padding-left : 10px;

    h4 {
        span {
            color: gray;
            font-weight: 300;
            margin-left: 4px;
            font-size : 10px;
        }
    }
`

export const Message = ({message, timeStamp, user,image}) => {

    const hora = new Date(timeStamp).getHours();
    const minutos = new Date(timeStamp).getMinutes();
    const segundos = new Date(timeStamp).getSeconds();

    const formateo = `${hora} : ${minutos}: ${segundos}`;

    return (
        <MessageContainer>
            <img src={image} alt="" width={50} height={50}/>
            <MessageInfo>
                <h4>
                    {user}{' '}
                    <span>
                        { formateo }
                    </span>
                </h4>
                <p>{message}</p>
            </MessageInfo>
        </MessageContainer>
    )
}
