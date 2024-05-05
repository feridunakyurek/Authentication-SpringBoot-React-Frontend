import React, { useEffect, useState } from "react";
import Post from "../Post/Post";

function Home() {
  const [error, setError] = useState(null); //ilk durum null. error olmayacak.
  const [isLoaded, setIsLoaded] = useState(false); //ilk durum false. yükleme olmayacak.
  const [postList, setPostList] = useState([]); //ilk durum boş liste. postlar olmayacak.

  useEffect(() => {
    fetch("http://localhost:8080/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <container fixed style={{
        height: "100vh",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#cfe8fc",
      }}>
        
        {postList.map((post) => (
          <Post title={post.title} text={post.text}></Post>
        ))}
        
      </container>
    );
  }
}

export default Home;
