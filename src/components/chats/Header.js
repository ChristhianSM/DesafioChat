import React from 'react'
import styled from 'styled-components'
import Avatar from '@mui/material/Avatar'
import SearchIcon from '@mui/icons-material/Search';
import HelpIcon from '@mui/icons-material/Help';
import AccessTimeIcon from '@mui/icons-material/AccessTime'


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
`

const HeaderSearch = styled.div`
    flex: 0.4;
    opacity: 1;
    border-radius:6px;
    background-color: white;
    text-align: center;
    align-items: center;
    display: flex;
    padding: 0 50px;
    color: gray;
    border: 1px gray solid;

    > input {
        background-color: transparent;
        border: none;
        text-align: center;
        outline: none;
        min-width :30vw;
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

const HeaderAvatar = styled(Avatar)`
    cursor: pointer;

    :hover {
        opacity: 0.8;
    }
`
export const Header = () => {
    return (
        <HeaderContainer>
            {/* Header Left */}
            <HeaderLeft>
                <HeaderAvatar 
                    
                />
                <AccessTimeIcon />
            </HeaderLeft>
            
            {/* Header Search */}
            <HeaderSearch>
                <SearchIcon />
                <input 
                    type="text" 
                    placeholder='Busque algun chat'
                />
            </HeaderSearch>
            {/* Header Right */}

            <HeaderRight>
                <HelpIcon />
            </HeaderRight>
        </HeaderContainer>
    )
}
