import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react'

export default function UpdateComponent() {

  const [isShow, invokeModal] = useState(false)
  const initModal = () => {
      return invokeModal(!isShow)
  }
  return <>
    <Button variant="success" onClick={initModal}>
        Edit
    </Button>

    <Modal show={isShow}>
        <Modal.Header closeButton onClick={initModal}>
            <Modal.Title>Modifier un Post</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            This is my react Boostrap Madal
        </Modal.Body>

        <Modal.Footer>
            <Button variant="danger" onClick={initModal}>
                Close
            </Button>
            <Button variant="dark" onClick={initModal}>
                Update
            </Button>
        </Modal.Footer>
    </Modal>
  </>
}
