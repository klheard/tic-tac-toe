import React from 'react';
import { Modal , Button} from 'react-bootstrap'

interface NewGameProps {
    show: boolean,
    onDismiss: () => void,
    onNewGame: () => void,
    playerName: string
}

export default function (props: NewGameProps) {
    const { onDismiss, playerName, show} = props

    return (
      <Modal
        show={show}
        onHide={onDismiss}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Winner Winner Chicken Dinner!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>{`${playerName} has won!`}</h4>
                <p>
                    How about a new game?
                </p>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onDismiss}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }