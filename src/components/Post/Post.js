/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Comment from "../Comment/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";
import CommentForm from "../Comment/CommentForm";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Post(props) {
  const { userId, userName, title, text, postId, likes } = props; // Destructuring kullanarak props'u doğru şekilde alın
  const [error, setError] = useState(null); //ilk durum null. error olmayacak.
  const [expanded, setExpanded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const isInitialMount = useRef(true);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [likeId, setLikeId] = useState(null);
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
    console.log(commentList);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if(!isLiked){
      saveLike();
      setLikeCount(likeCount + 1)
    }
    else{
      deleteLike();
      setLikeCount(likeCount - 1)
    }
      
   };

  const refreshComments = () => {
    fetch("/comments?postId=" + postId)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommentList(result);
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      );

    setRefresh(false);
  };

  const saveLike = () => {
    fetch("/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        userId: userId,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const deleteLike = () => {
    fetch("/likes/" + likeId, {
      method: "DELETE",
    })
      .catch((err) => console.log(err));
  };

  const checkLikes = () => {
    var likeControl = likes.find((like) => like.userId === userId);
    if (likeControl != null) {
      setIsLiked(true);
      setLikeId(likeControl.id);
    }
  };

  useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else refreshComments();
  }, [refresh]);

  useEffect(() => {
    checkLikes();
  }, []);

  return (
    <div className="postContainer">
      <Card sx={{ width: 900, margin: "20px" }}>
        <CardHeader
          style={{ textAlign: "left", fontSize: "20px" }}
          avatar={
            <Link
              style={{
                textDecoration: "none",
                boxShadow: "none",
                color: "inherit",
              }}
              to={{ pathname: "/users/" + userId }}
            >
              <Avatar
                sx={{ bgcolor: red[500] }}
                aria-label="recipe"
                style={{
                  background:
                    "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  color: "white",
                }}
              >
                {userName[0].toUpperCase()}
              </Avatar>
            </Link>
          }
          title={title}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={handleLike} aria-label="add to favorites">
            <FavoriteIcon style={isLiked ? { color: "red" } : null} />
          </IconButton>
          {likeCount}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ModeCommentRoundedIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Container fixed>
            {error
              ? "error"
              : isLoaded
              ? commentList.map((comment) => (
                  <Comment
                    userId={1}
                    userName={"User"}
                    text={comment.text}
                  ></Comment>
                ))
              : "Loading"}
            <CommentForm
              userId={1}
              userName={"User"}
              postId={postId}
            ></CommentForm>
          </Container>
        </Collapse>
      </Card>
    </div>
  );
}

export default Post;
