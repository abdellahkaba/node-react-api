import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react'
import postService from '../services/postService';


export default function UpdateComponent(props) {

  const [isShow, invokeModal] = useState(false)
  const initModal = () => {
      return invokeModal(!isShow)
  }

  //form update
 
  const [title,setTitle] = useState(props.title)
  const [date,setDate] = useState(props.date)
  const [id,setId] = useState(props.id)
  const [selectedFile,setSelectedFile] = useState('')
  const [message,setMessage] = useState(' ')

  const handleSubimit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('id',id)
    formData.append('title',title)
    formData.append('date',date)

    if(selectedFile != '' && selectedFile.length != 0){
        formData.append('image', selectedFile)
    }
    console.log(formData)
    const response = await postService.update(formData)
    if(response.data.success == true){
        alert(response.data.msg)
       // setMessage('Post creee avec success')
    }else{
        alert(response.data.msg)
    }
    initModal()
  }

  return <>
    <Button variant="success" onClick={initModal}>
        Edit
    </Button>

    <Modal show={isShow}>
        <Modal.Header closeButton onClick={initModal}>
            <Modal.Title>Modifier un Post</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubimit}>

            <Modal.Body>
                <input 
                    type='text' 
                    name='title'
                    value={title}
                    placeholder='Entrer le Post Title'
                    onChange={(e) => setTitle(e.target.value)}
                    required 
                />
                <br/><br/>
                <input 
                    type='date'
                    name='date'
                    value={date}
                    placeholder='Entrer la date'
                    onChange={(e) => setDate(e.target.value)}
                    required 
                />
                <br/><br/>
                <input 
                    type='file' 
                    placeholder='Choisir une image'
                    onChange={(e) => setSelectedFile(e.target.files[0])}                    
                /> 
                <br/><br/>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="danger" onClick={initModal}>
                    Close
                </Button>
                <Button type='submit' variant="primary">
                    Update
                </Button>
            </Modal.Footer>
        </form>
    </Modal>
    <p>{message}</p>
  </>
}
