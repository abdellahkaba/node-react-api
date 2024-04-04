import React, { useEffect, useState } from 'react'
import postService from '../services/postService'

export default function ShowComponent() {

    const [posts,setPosts] = useState({})

    const fetchPosts = async () => {
        setPosts(await postService.getPost())
    }
    useEffect(() => {
        fetchPosts()
    },[])
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
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                )
            }
        </div>
    </>
}
