import React, { useEffect, useState } from 'react'
import postService from '../services/postService'
import UpdateComponent from './UpdateComponent'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

export default function ShowComponent() {

    const [posts,setPosts] = useState({})
    const [message,setMessage] = useState('')

    const fetchPosts = async () => {
        setPosts(await postService.getPost())
    }
    useEffect(() => {
        fetchPosts()
    },[])

    const deletePost = async (id,e) => {
      var response = await  postService.deletePost(id)
      if(response.data.success == true){
        alert(response.data.msg)
        document.getElementById(id).parentElement.parentElement.remove()
        setMessage('Post supprimer avec success')
    }else{
        setMessage('Post non supprimer')
    }
    
        setTimeout(() => {
            setMessage('')
        },3000)
    }

    console.log(posts)
    return <>
        <div className='App'>
            <h1>La liste des Post</h1>
            {
                posts.data != undefined && posts.data.data.length > 0 && (
                    <table style={{width:'100%'}} border='1'>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Image</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                posts.data.data.map(
                                    post => (
                                        <tr key={post._id}>
                                            <td>{post.title}</td>
                                            <td>{post.date}</td>
                                            <td>
                                                <img src={'http://localhost:8000/api/images/'+post.image} style={{width: '100px',height:'100px'}} />
                                            </td>
                                            <td>
                                                <button
                                                id={post._id}
                                                onClick={(e)=> deletePost(post._id,e)}
                                                 >Delete</button>
                                            </td>
                                            <td>
                                                <UpdateComponent id={post._id} title={post.title} date={post.date}/>
                                            </td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                )
            }
            <p>{message}</p>
        </div>
    </>
}
