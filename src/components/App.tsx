import React from 'react';
import Board from './Board'
import { Container } from 'react-bootstrap'
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewGameModal from './NewGameModal';
import NavigationBar, { PlayerWinRecords } from './NavigationBar';
import { TicTacToePlayer } from '../utilities/tic-tac-toe';

interface AppState extends PlayerWinRecords {
  winner: string
  displayWinnerModal: boolean
}

class App extends React.Component {
  readonly state: AppState = {
    playerOneWins: 0,
    playerTwoWins: 0,
    winner: "No one",
    displayWinnerModal: false
  }

  dismissModal = () => this.setState((prevState) => ({ displayWinnerModal: false}))

  presentModal = () => this.setState((prevState) => ({displayWinnerModal: true}))

  startNewGame = () => {
    if(this.state.displayWinnerModal)
      this.dismissModal()
  }

  setNewWinner = (player: TicTacToePlayer) => {
    switch(player) {
      case TicTacToePlayer.PLAYER_ONE:
        this.setState({ winner: "Player 1"})
        break
      case TicTacToePlayer.PLAYER_TWO:
        this.setState({ winner: "Player 2"})
        break
      default:
        break
    }
  }

  updatePlayerScore = (player: TicTacToePlayer) => {
    switch(player) {
      case TicTacToePlayer.PLAYER_ONE:
        this.setState((prevState: AppState) => ({playerOneWins: prevState.playerOneWins + 1}))
        break
      case TicTacToePlayer.PLAYER_TWO:
        this.setState((prevState: AppState) => ({playerTwoWins: prevState.playerTwoWins + 1}))
        break
      default:
        break
    }
  }

  render() {
    const { playerOneWins, playerTwoWins, displayWinnerModal } = this.state

    return (
      <div className="App">
        <NavigationBar playerOneWins={playerOneWins} playerTwoWins={playerTwoWins}/>
        <Container>
          <Board onGameWin={(player: TicTacToePlayer) => {
              this.updatePlayerScore(player)
              this.setNewWinner(player)
              this.presentModal()
            }
          }/>
        </Container>
        {
          this.state.displayWinnerModal && 
            <NewGameModal 
              show={displayWinnerModal} 
              playerName={this.state.winner} 
              onDismiss={this.dismissModal}
              onNewGame={this.startNewGame}
            />
        } 
      </div>
    );
  }
}

export default App;


