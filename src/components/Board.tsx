import React from 'react';
import { TicTacToePlayer } from '../utilities/tic-tac-toe'
import {Col, Row, Toast, Button} from 'react-bootstrap'
import Square from './Square'
import GameService, { TicTacToeService } from '../services/GameService';

const defaultBoardValue = ""

interface BoardProps {
    onGameWin: (player: TicTacToePlayer) => void
}

interface BoardState {
    currentPlayer: TicTacToePlayer
    showToast: boolean
    boardValues: Array<string>
    gameOver: boolean
}

const initialBoardState: BoardState = {
    currentPlayer: TicTacToePlayer.PLAYER_ONE,
    showToast: false,
    gameOver: false,
    boardValues: [
        defaultBoardValue, defaultBoardValue, defaultBoardValue,
        defaultBoardValue, defaultBoardValue, defaultBoardValue, 
        defaultBoardValue, defaultBoardValue, defaultBoardValue
    ]
}

export default class Board extends React.Component<BoardProps> {

    readonly state: BoardState = initialBoardState
    readonly gameService: TicTacToeService= new GameService(defaultBoardValue)

    // LifeCycle methods
    componentDidUpdate(prevProps: BoardProps, prevState: BoardState) {
        // If the board values have changed we may have a winner. If not switchPlayers
        if(prevState.boardValues !== this.state.boardValues) {
            if (this.gameService.checkBoardForWin(this.state.boardValues)) {
                this.setState({gameOver: true})
                this.displayWinner(this.state.currentPlayer)
            } else {
                this.switchPlayer()
            }
        }
    }

    // GUI Logc (State updating)
    private validatePlayerSelection = (position: number) => {
        if(this.state.gameOver === false) {
            const spaceAvaialble = this.gameService.positionIsAvailable(this.state.boardValues, position)
  
            if (spaceAvaialble) {
                this.selectPosition(position)
            } else {
                this.displayInvalidSelection()
                return
            }
        }
    }

    private displayInvalidSelection = () => {
        this.setState((prevState) => {
            return (
                {showToast: true}
            )
        }, () => {
            setTimeout(() => {
                this.setState({showToast: false})
            }, 2000)
        })
    }

    private selectPosition = (position: number) => {
        this.setState((prevState: BoardState) => {
            const newBoard = [...prevState.boardValues]
            newBoard[position] = this.state.currentPlayer
            
            return {
                boardValues: [...newBoard]
            }
        })
    }
    private switchPlayer = () => {
        this.setState((prevState: BoardState) => {
            const newCurrentPlayer = prevState.currentPlayer === TicTacToePlayer.PLAYER_ONE ? TicTacToePlayer.PLAYER_TWO : TicTacToePlayer.PLAYER_ONE
            return ({currentPlayer: newCurrentPlayer})
        })
    }

    private resetBoard = () => this.setState((prevState: BoardState) => ({ ...initialBoardState }))
  
    private displayWinner = (player: TicTacToePlayer) => this.props.onGameWin(player)
  
    public render() {
      const { boardValues, showToast, currentPlayer } = this.state
  
      return (
        <>
            <Row>
                <Col>
                    <br />
                    <h1 style={{fontFamily: "Roboto"}}>{`Current player: ${currentPlayer === TicTacToePlayer.PLAYER_ONE ? "Player One" : "Player Two"}`}</h1>
                    <br />
                </Col>
            </Row>
            <Row bsPrefix="row justify-content-md-center">
                <Col sm={6}>
                    <div className="grid">
                        <div className="cell">
                            <Square displayValue={boardValues[0]} position={0} onPlayerSelected={this.validatePlayerSelection} />
                        </div>
                        <div className="cell">
                            <Square displayValue={boardValues[1]} position={1} onPlayerSelected={this.validatePlayerSelection} />
                        </div>
                        <div className="cell">
                            <Square displayValue={boardValues[2]} position={2} onPlayerSelected={this.validatePlayerSelection} />
                        </div>
                        <div className="cell">
                            <Square displayValue={boardValues[3]} position={3} onPlayerSelected={this.validatePlayerSelection} />
                        </div>
                        <div className="cell">
                            <Square displayValue={boardValues[4]} position={4} onPlayerSelected={this.validatePlayerSelection} />
                        </div>
                        <div className="cell">
                            <Square displayValue={boardValues[5]} position={5} onPlayerSelected={this.validatePlayerSelection} />
                        </div>
                        <div className="cell">
                            <Square displayValue={boardValues[6]} position={6} onPlayerSelected={this.validatePlayerSelection} />
                        </div>
                        <div className="cell">
                            <Square displayValue={boardValues[7]} position={7} onPlayerSelected={this.validatePlayerSelection} />
                        </div>
                        <div className="cell">
                            <Square displayValue={boardValues[8]} position={8}onPlayerSelected={this.validatePlayerSelection} />
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <br />
                    <Button size="lg" onClick={this.resetBoard}>New Game</Button>
                </Col>
            </Row>
            {
                showToast && 
                    <Toast     
                        style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                    }}>
                        <Toast.Header>
                            <strong className="mr-auto">Invalid move</strong>
                        </Toast.Header>
                        <Toast.Body>That square already has a peice!</Toast.Body>
                    </Toast>
            }
        </>
      )
    }
  }