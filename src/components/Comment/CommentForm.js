import React from "react";
import { CardContent, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

function CommentForm(props) {
  const { userName, userId, postId } = props;
  const [text, setText] = React.useState("");

  const saveComment = () => {
    fetch("/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        userId: userId,
        text: text,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleSubmit = () => {
    saveComment();
    setText("");
  };

  const handleChange = (value) => {
    setText(value);
  };

  return (
    <CardContent>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Link
                style={{
                  textDecoration: "none",
                  boxShadow: "none",
                  color: "inherit",
                }}
                to={{ pathname: "/users/" + userId }}
              >
                <Avatar
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
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Button
                variant="contained"
                style={{
                  background:
                    "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  color: "white",
                }}
                onClick={handleSubmit}
              >
                Comment
              </Button>
            </InputAdornment>
          ),
        }}
        multiline
        fullWidth
        value={text}
        id="outlined-adornment-amount"
        inputProps={{ maxLength: 250 }}
        onChange={(i) => handleChange(i.target.value)}
        style={{ color: "black", backgroundColor: "white" }}
      />
    </CardContent>
  );
}

export default CommentForm;
