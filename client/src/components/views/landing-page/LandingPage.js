import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Auth from "../../../hoc/auth";

function LandingPage() {
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/api/hello").then((response) => {
            console.log(response);
        });
    }, []);

    const onClickSignOutHandler = () => {
        axios.get("/api/users/logout").then(response => {
            if (response.data.success) {
                navigate("/login");
                console.log("logout success");
            } else {
                alert("logout failure");
            }
        });
    };
  
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
        }}>
            <h2>Landing Page</h2>
            <button onClick={onClickSignOutHandler}>Sign Out</button>
        </div>
    );
}

export default Auth(LandingPage, null);