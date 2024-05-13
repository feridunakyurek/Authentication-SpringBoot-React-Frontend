import React from "react";
import { CardContent, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

function Comment(props) {
  const { text, userId, userName } = props;

  return (
    <CardContent>
      <TextField
        disabled
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
        }}
        style={{ color: "black", backgroundColor: "white" }}
        multiline
        fullWidth
        value={text}
        inputProps={{ maxLength: 25 }}
        id="outlined-adornment-amount"
      />
    </CardContent>
  );
}

export default Comment;
