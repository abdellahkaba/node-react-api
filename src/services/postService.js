import axios from "axios"

class Post {

    create(formData){
        const url = "http://localhost:8000/api/create-post"

        const config = {
            headers : {
                'Content-type' : 'multipart/form-data'
            }
        }
        return axios.post(url,formData,config)
    }
    getPost() {
        const url = "http://localhost:8000/api/get-post"
        return axios.get(url)
    }
    deletePost(id) {
        const url = "http://localhost:8000/api/delete-post/"+id
        return axios.delete(url)
    }
}

export default new Post()