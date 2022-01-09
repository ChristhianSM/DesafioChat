import React from 'react'
import styled from 'styled-components'
import Avatar from '@mui/material/Avatar'
import SearchIcon from '@mui/icons-material/Search';
import HelpIcon from '@mui/icons-material/Help';
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { useSelector } from 'react-redux';


const HeaderContainer = styled.div`
    display : flex;
    position: fixed;
    width : 100%;
    align-items : center;
    padding : 10px 0;
    background-color : #ededed;
    color: white;
`

const HeaderLeft = styled.div`
    flex : 0.3;
    display : flex;
    align-items : center;
    margin-left : 20px;

    > .MuiSvgIcon-root {
        margin-left : auto;
        margin-right : 30px
    }

    img {
        width: 60px;
        height: 60px;
        border-radius: 100%;
    }
`
const HeaderRight = styled.div`
    flex: 0.3;
    display: flex;
    align-items: flex-end;
    
    > .MuiSvgIcon-root {
        margin-left : auto;
        margin-right : 20px
    }

`

export const Header = ({name}) => {

    const {photo} = useSelector(state => state.auth);

    return (
        <HeaderContainer>
            {/* Header Left */}
            <HeaderLeft>
                <img src={photo} alt="avatar" />
                <AccessTimeIcon />
            </HeaderLeft>

            {/* Header Right */}

            <HeaderRight>
                <HelpIcon />
            </HeaderRight>
        </HeaderContainer>
    )
}
