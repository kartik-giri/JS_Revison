import { useEffect, useState } from "react";
import { PostComponent } from "./Post"
import { Notification } from "./Notification";
import { Todos } from "./Todos";

const App = () => {
  const [post, setPost] = useState([]);
  
  //array of PostComponent
  const postComponents = post.map((posts)=>{
    //name, subtitle, time, image, description
    return <PostComponent name={posts.name} subtitle={posts.subtitle} time={posts.time} image ={posts.image} description={posts.description} />
  })
  const addPost =()=>{
    setPost([...post,{
      name: "harkirat",
      subtitle: "10000 followers",
      time: "2m ago",
      image: "https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg",
      description: "What to know how to win big? Check out how these folks won $6000 in bounties."
    }])
  }


  return (
    <>
         <Todos/>
      <div style={{ background: "#dfe6e9", height: "100vh", }}>
        <button onClick={addPost}>Add post</button>
        <div style={{ display: "flex", justifyContent: "center", justifyContent:"space-around" }}>
          <Notification/>
          <div>
            {postComponents}
          </div>
        </div>
      </div>
    </>
  )
}

export default App;