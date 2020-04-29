import React from 'react';
import { TicTacToePlayer } from '../utilities/tic-tac-toe'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUbuntu, faWindows } from '@fortawesome/free-brands-svg-icons'

interface SquareProps {
    displayValue: string,
    position: number,
    onPlayerSelected: (position: number) => void
}

const getDisplayJSX = (displayValue: string): JSX.Element => {
    switch(displayValue) {
        case TicTacToePlayer.PLAYER_ONE:
            return <FontAwesomeIcon icon={faWindows} color="#43D1F7" size="5x"/>
        case TicTacToePlayer.PLAYER_TWO:
            return <FontAwesomeIcon icon={faUbuntu} color="#FF5733" size="5x"/>
        default:
            return <div>{displayValue}</div>
    }
}
  
const Square = (props: SquareProps) => {
    const { displayValue } = props
    return (
        <div className="cell" onClick={() => {props.onPlayerSelected(props.position)}}>
            {getDisplayJSX(displayValue)}
        </div>
    )
}

export default Square