import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Notes from '../components/Notes'
import styled from 'styled-components'

const Container = styled.div`
`

const Home = () => {
    const [text,setText] = useState("")
    return (
        <Container>
            <Navbar setText={setText} />
            <Notes text={text}/>
        </Container>
    )
}

export default Home
