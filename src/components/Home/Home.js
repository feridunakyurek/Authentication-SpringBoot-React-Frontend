import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";

function Home() {
  const [error, setError] = useState(null); //ilk durum null. error olmayacak.
  const [isLoaded, setIsLoaded] = useState(false); //ilk durum false. yükleme olmayacak.
  const [postList, setPostList] = useState([]); //ilk durum boş liste. postlar olmayacak.

  const refreshPosts = () => {
    fetch("/posts")
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
  };

  useEffect(() => {
    refreshPosts();
  }, [postList]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div
        fixed
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#cfe8fc",
        }}
      >
        <PostForm
          userId={1}
          userName={"ddd"}
          refreshPosts={refreshPosts}
        ></PostForm>
        {postList.map((post) => (
          <Post
            text={post.text}
            postId={post.id}
            likes={post.postLikes}
            title={post.title}
            userId={post.userId}
            userName={post.userName}
          ></Post>
        ))}
      </div>
    );
  }
}

export default Home;
