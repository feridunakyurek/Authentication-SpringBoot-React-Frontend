import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

function PostForm(props) {
  const { userId, userName } = props;
  const [expanded] = useState(false);
  const [text, SetText] = useState("");
  const [title, SetTitle] = useState("");

const savePost = () => {
    fetch("http://localhost:8080/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        userId: userId,
        title: title,
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
    console.log("Title: " + title + " Text: " + text);
    savePost();
  };

  const handleTitle = (value) => {
    SetTitle(value);
  };

  const handleText = (value) => {
    SetText(value);
  };

  return (
    <div className="postContainer">
      <Card sx={{ width: 900 }}>
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
          title={
            <TextField
              id="outlined-adornment-amount"
              multiline
              placeholder="Title"
              inputProps={{ maxLength: 25 }}
              fullWidth
              onChange = {(i) => handleTitle(i.target.value)}
            />
          }
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <TextField
              id="outlined-adornment-amount"
              multiline
              placeholder="Text"
              inputProps={{ maxLength: 250 }}
              fullWidth
              InputProps={{
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
                      Post
                    </Button>
                  </InputAdornment>
                ),
              }}
              onChange = {(i) => handleText(i.target.value)}
            />
          </Typography>
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent></CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

export default PostForm;
