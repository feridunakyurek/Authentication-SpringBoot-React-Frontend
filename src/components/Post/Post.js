import React from "react";
import "./Post.scss"

function Post(props) {
  const { title, text } = props; // Destructuring kullanarak props'u doğru şekilde alın

  return (
    <div className="postContainer">
      title: {title}, text: {text}
    </div>
  );
}

export default Post;
