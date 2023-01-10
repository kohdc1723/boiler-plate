import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { useNavigate } from 'react-router-dom';
import Auth from "../../../hoc/auth";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onNameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const onEmailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const onConfirmPasswordChangeHandler = (event) => {
    setConfirmPassword(event.target.value);
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      return alert("confirm password is different");
    }

    let body = {
      name: name,
      email: email,
      password: password
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        navigate("/login");
      } else {
        alert("register fail");
      }
    });
  };

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100vh"}}>
      <form style={{display: "flex", flexDirection: "column"}} onSubmit={onSubmitHandler}>
        <label>Name</label>
        <input type="text" value={name} onChange={onNameChangeHandler}/>

        <label>Email</label>
        <input type="email" value={email} onChange={onEmailChangeHandler}/>

        <label>Password</label>
        <input type="password" value={password} onChange={onPasswordChangeHandler}/>

        <label>Confirm Password</label>
        <input type="password" value={confirmPassword} onChange={onConfirmPasswordChangeHandler}/>
        
        <br/>
        <button>Sign In</button>
      </form>
    </div>
  )
}

export default Auth(RegisterPage, false);