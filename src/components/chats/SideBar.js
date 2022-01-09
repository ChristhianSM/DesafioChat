import React, { useState } from 'react'
import styled from 'styled-components'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateIcon from '@mui/icons-material/Create';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AddIcon from '@mui/icons-material/Add';

import { SidebarOption } from './SidebarOption';
import { addDoc, collection } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { cambiarNombreUsuario } from '../../actions/auth';

const SidebarContainer = styled.div`
    background-color : #ededed;
    flex: 0.3;
    margin-top: 70px;
    max-width:260px;
    border-top: 1px solid #49274b;

    > hr {
        margin-top: 10px;
        margin-bottom : 10px;
    }
`

const Header = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid;
    padding: 13px;
    justify-content: space-between;

    > .MuiSvgIcon-root {
        padding:8px;
        color: #492744;
        font-size: 18px;
        background-color: white;
        border-radius: 999px;
        cursor: pointer;
    }
`

const Info = styled.div`
    flex : 1;

    > h2 {
        font-size: 15px;
        font-weight : 900;
        margin-bottom:5px;
    }

    h3 {
        display : flex;
        font-size: 13px;
        align-items: center;
    }

    h3 .MuiSvgIcon-root {
        margin-right: 5px;
        color: green;
        font-size: 13px;
        background-color: white;
        border-radius: 999px;
    }

`

const SidebarOptionContainer = styled.div`
    .title {
        display : flex;
        align-items: center;
        font-size : 15px;
    }

    .contactos { 
        height: 150px;
        overflow-y :scroll
    }

    input {
        outline: none;
        padding : 5px;
        margin : 0 10px;
        margin-bottom: 10px;
    }
`

export const SideBar = () => {

    const dispatch = useDispatch();
    
    const [channels] = useCollection(collection(db, 'rooms'));

    // Traemos del estado los contactos y los chats
    const {contactos, chats , name} = useSelector(state => state.auth);

    // Variable de filtro de contactos
    const [contactosFiltrados, setcontactosFiltrados] = useState([])
    const [chatsFiltrados, setchatsFiltrados] = useState([])

    // Para los inputs
    const [inputContacto, setInputContacto] = useState("");
    const [inputChat, setInputChat] = useState("");

    const  handleInputContacto = (e) => {
        setInputContacto(e.target.value);
        setcontactosFiltrados(filtrar(e.target.value)) ;
    }
    
    const filtrar = (terminoBusqueda) => {
        const resultadoBusqueda = contactos.filter( contacto => {
            if (contacto.toLowerCase().includes(terminoBusqueda.toLowerCase())) {
                return contacto
            }
        })

        return resultadoBusqueda;
    }

    const  handleInputChat = (e) => {
        setInputChat(e.target.value);
        setchatsFiltrados(filtrar(e.target.value)) ;
    }


    // Cambiar Nombre del usuario
    const handleChangeName = () => {
        dispatch(cambiarNombreUsuario());
    }
    return (
        <SidebarContainer>
            <Header>
                <Info>
                    <h2>{name}</h2>
                    <h3>
                        <FiberManualRecordIcon />
                        Conectado
                    </h3>
                </Info>
                <CreateIcon 
                    onClick = {handleChangeName} 
                />
            </Header>
            {/* Options */}
            <SidebarOptionContainer>
                <div className='title'>
                    <PeopleAltIcon  fontSize = 'small' style = {{padding: "10px"}}></PeopleAltIcon>
                    <h3>Contactos</h3>
                </div>
                <form>
                    <input 
                        type="text"  
                        placeholder='Buscar Contacto'
                        onChange={handleInputContacto}
                        value={inputContacto}
                    />
                </form>
                <div className='contactos'>
                    {
                        contactosFiltrados.length > 0 
                        ?
                        contactosFiltrados.map( (contacto) => {
                            return (
                                <SidebarOption 
                                    key={contacto}
                                    Icon = {PeopleAltIcon}
                                    title = {contacto}
                                />
                            )
                        })
                        :
                        contactos?.map( (contacto) => {
                            return (
                                <SidebarOption 
                                    key={contacto}
                                    Icon = {PeopleAltIcon}
                                    title = {contacto}
                                />
                            )
                        })

                    }
                </div>
            </SidebarOptionContainer>
            
            <hr />
            <SidebarOptionContainer>
                <div className='title'>
                    <InsertCommentIcon  fontSize = 'small' style = {{padding: "10px"}}></InsertCommentIcon>
                    <h3>Chats</h3>
                </div>
                <input 
                    type="text"  
                    onChange={handleInputChat}
                    value={inputChat} 
                    placeholder='Buscar chat'
                    />
                <div className='contactos'>
                    {
                        chatsFiltrados.length > 0 
                        ?
                        chatsFiltrados.map( (contacto) => {
                            return (
                                <SidebarOption 
                                    key={contacto}
                                    Icon = {PeopleAltIcon}
                                    title = {contacto}
                                />
                            )
                        })
                        :
                        chats?.map( (chat) => {
                            return (
                                <SidebarOption 
                                    key={chat}
                                    Icon = {PeopleAltIcon}
                                    title = {chat}
                                />
                            )
                        })

                    }
                </div>
            </SidebarOptionContainer>
        
            <hr />

            <SidebarOption Icon = {AddIcon} addChannelOption  title = "Agregar Grupo"/>

            {
                channels?.docs.map( doc => (
                    <SidebarOption 
                        key={doc.id}
                        id = {doc.id}
                        title = {doc.data().name}
                    />
                ))
            } 
        </SidebarContainer>
    )
}
