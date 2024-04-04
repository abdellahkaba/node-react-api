import React, { useState } from 'react'
import postService from '../services/postService.js'


export default function CreateComponet() {

    const [title,setTitle] = useState('')
    const [date,setDate] = useState('')
    const [image,setImage] = useState()
    const [message,setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

       const formData = new FormData()
       formData.append('title',title)
       formData.append('date',date)
       formData.append('image',image)

       const response = await postService.create(formData)
      console.log(response)

         
        
       e.target.reset()
       
    }

  return <>
        <div>
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text' 
                    value={title}
                    placeholder='Entrer le Post Title'
                    onChange={(e) => setTitle(e.target.value)}
                    required 
                />
                <br></br>
                <input 
                    type='date' 
                    value={date}
                    placeholder='Entrer la date'
                    onChange={(e) => setDate(e.target.value)}
                    required 
                />
                <br></br>
                <input 
                    type='file' 
                   // value={image}
                    placeholder='Choisir une image'
                    onChange={(e) => setImage(e.target.files[0])}
                    required 
                /> 
                <br></br>
                <button>Submit</button>
            </form>

            <p>{message}</p>
        </div>
  </>
}
