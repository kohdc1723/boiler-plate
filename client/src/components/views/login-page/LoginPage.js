import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { useNavigate } from 'react-router-dom';
import Auth from "../../../hoc/auth";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: email,
      password: password
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        navigate("/");
      } else {
        alert("error");
      }
    });
  };

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100vh"}}>
      <form style={{display: "flex", flexDirection: "column"}} onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={email} onChange={onEmailChangeHandler}/>
        <label>Password</label>
        <input type="password" value={password} onChange={onPasswordChangeHandler}/>
        <br/>
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default Auth(LoginPage, false);