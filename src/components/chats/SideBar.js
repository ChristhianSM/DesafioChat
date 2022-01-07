import React from 'react'
import styled from 'styled-components'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateIcon from '@mui/icons-material/Create';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppsIcon from '@mui/icons-material/Apps';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

import { SidebarOption } from './SidebarOption';
import { addDoc, collection } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';

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

export const SideBar = () => {

    const [channels, loading, error] = useCollection(collection(db, 'rooms'));
    return (
        <SidebarContainer>
            <Header>
                <Info>
                    <h2>Christhian</h2>
                    <h3>
                        <FiberManualRecordIcon />
                        Conectado
                    </h3>
                </Info>
                <CreateIcon />
            </Header>
            {/* Options */}
            <SidebarOption Icon = {InsertCommentIcon} title = "Threads"/>
            <SidebarOption Icon = {InboxIcon} title = "Mentions & reactions"/>
            <SidebarOption Icon = {DraftsIcon} title = "Saved Items"/>
            <SidebarOption Icon = {BookmarkIcon} title = "Channel browser"/>
            <SidebarOption Icon = {PeopleAltIcon} title = "People & groups"/>
            <SidebarOption Icon = {AppsIcon} title = "Apps"/>
            <SidebarOption Icon = {FileCopyIcon} title = "File browser"/>
            <SidebarOption Icon = {ExpandLessIcon} title = "Show Less"/>

            <hr />

            <SidebarOption Icon = {ExpandMoreIcon} title = "Channels"/>

            <hr />

            <SidebarOption Icon = {AddIcon} addChannelOption  title = "Add Channel"/>

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
