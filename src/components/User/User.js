import React from "react";
import { useParams } from "react-router-dom"; //userId'yi almak için.

function User() {
    const { userId } = useParams();
    return (
        <div>
            User {userId}
        </div>
    );
}

export default User;