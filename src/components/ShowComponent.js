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
        </div>
    </>
}
