import axios from "axios"

export default class Post {
    getPost() {
        const url = "http://localhost:8000/api/get-post"
        return axios.get(url)
    }
}
