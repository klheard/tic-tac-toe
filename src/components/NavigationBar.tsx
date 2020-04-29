import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Nav, Navbar } from 'react-bootstrap';
import { faHashtag } from '@fortawesome/free-solid-svg-icons'

export interface PlayerWinRecords {
    playerOneWins: number,
    playerTwoWins: number,
}

// Basic NavBar, displays current win streak
export default function NavigationBar(props: PlayerWinRecords) {
    const { playerOneWins, playerTwoWins } = props
    
    return (
    <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand href="#home">
            <FontAwesomeIcon icon={faHashtag} /> {' '}
            {"Tic-Tac-Toe"}
        </Navbar.Brand>
  
        <Nav className="ml-auto">
            <Navbar.Text>{`P1: ${playerOneWins}`}</Navbar.Text>
            <span style={{paddingRight: "15px"}} />
            <Navbar.Text>{`P2: ${playerTwoWins}`}</Navbar.Text>
        </Nav>
    </Navbar>
    )
}