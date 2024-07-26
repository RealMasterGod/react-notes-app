import { BorderBottom, SearchOutlined } from '@mui/icons-material'
import React, { useState } from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { tabs } from '../responsive'

const Container = styled.div`
    height: 80px;
    /* border: 1px solid white; */
    background-color: black;
    color: white;
    width: 50%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    ${mobile({
        width: '100%',
    })}
    ${tabs({
        width: '100%',
    })}
`

const Title = styled.h1`
    font-size: 40px;
    flex: 1;
    ${props => props.show ? mobile({display: 'none'}) : mobile({display: 'block'})}
    ${props => props.show ? tabs({display: 'none'}) : tabs({display: 'block'})}

`

const Search = styled.div`
    display: flex;
    align-items: center;
    flex: 2;
    ${props => props.show && mobile({justifyContent: 'space-between', width: '100%'}) };
    ${mobile({
        flex: 'unset',
    })};
    ${props => props.show && tabs({justifyContent: 'space-between', width: '100%'}) };
    ${tabs({
        flex: 'unset',
    })};
`

const Input = styled.input`
    /* width: 30vw; */
    padding: 10px;
    background-color: transparent;
    color: white;
    border-radius: 30px;
    width: 100%;
    ${mobile({
        borderRadius: '0',
        border: 'none',
        borderBottom: '1px solid grey'
    })};
    ${props =>props.show ? mobile({display: 'block'}) : mobile({display: 'none'})}
    ${tabs({
        borderRadius: '0',
        border: 'none',
        borderBottom: '1px solid grey'
    })};
    ${props =>props.show ? tabs({display: 'block'}) : tabs({display: 'none'})}

`

const SearchIcon = styled.button`
    font-size: 40px;
    margin-left: 10px;
    padding: 5px;
    margin-right: 5px;
    cursor: pointer;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1b1b1b;
    border-radius: 15px;
    color: white;
`

const Navbar = ({setText}) => {
    const [showSearch,setShowSearch] = useState(false)
    return (
        <Container>
            <Title show={showSearch}>
                Notes
            </Title>
            <Search show={showSearch}>
                <Input show={showSearch} type="text" placeholder='Keyword...' autoFocus onChange={e => setText(e.target.value)} />
                <SearchIcon  onClick={() => setShowSearch(prev => !prev)}>
                    <SearchOutlined fontSize='inherit'/>
                </SearchIcon>
            </Search>
        </Container>
    )
}

export default Navbar
