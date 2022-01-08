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
import { useSelector } from 'react-redux';

const SidebarContainer = styled.div`
    background-color : #ededed;
    flex: 0.3;
    margin-top: 60px;
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

export const SideBar = ({name}) => {

    const [channels, loading, error] = useCollection(collection(db, 'rooms'));

    const {contactos} = useSelector(state => state.auth);
    // Variable de filtro de contactos
    const [contactosFiltrados, setcontactosFiltrados] = useState([])

    // Para los inputs
    const [inputContacto, setInputContacto] = useState("");

    const  handleInput = (e) => {
        setInputContacto(e.target.value);
        filtrar(e.target.value) ;
    }
    
    const filtrar = (terminoBusqueda) => {
        const resultadoBusqueda = contactos.filter( contacto => {
            if (contacto.toLowerCase().includes(terminoBusqueda.toLowerCase())) {
                return contacto
            }
        })
        setcontactosFiltrados(resultadoBusqueda)
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
                <CreateIcon />
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
                        placeholder='Buscar Conatacto'
                        onChange={handleInput}
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
                <input type="text"  placeholder='Buscar chat'/>
                <SidebarOption Icon = {PeopleAltIcon} title = "Christhian"/>
                <SidebarOption Icon = {PeopleAltIcon} title = "Cristina"/>
                <SidebarOption Icon = {PeopleAltIcon} title = "Romualdo"/>
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
