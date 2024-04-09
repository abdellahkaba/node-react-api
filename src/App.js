import {  useQuery } from '@tanstack/react-query';
import './App.css';
import axios from 'axios';





function App() {

   const {data, error, isLoading} = useQuery({
      queryKey: ['posts'],
      queryFn: () => axios.get(`http://localhost:8000/api/get-post`).then((res) => res.data.data)
   })

   

   if (error) return <div>Il y'a une Erreur</div>
   if (isLoading) return <div>Loading</div>

  return (
    <div className="App">
      

       <div>
       {data && data.map((post, index) => (
          <div 
            key={index}>{post._id}
            <p>{post.title}</p>
            <p>{post.date}</p>

          </div>
          
       ))}
       </div>
    </div>
  )
}

export default App;
 