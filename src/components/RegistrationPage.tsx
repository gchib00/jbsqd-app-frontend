import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginUser } from "../store/actions";
import { Credentials } from "../types";
import { ErrorMessage } from "./ErrorMessage";

const Form = styled.form`
  width: 340px;
  margin: 30px auto 10px auto;
  display: flex;
  flex-direction: column;
`;
const InputField = styled.input`
  height: 38px;
  padding-left: 8px;
  margin-top: 4px;
  border: 1px solid grey;
  border-radius: 4px;
  outline: none;
`;
const SubmitButton = styled.button`
  background-color: #1652F0;
  border: 1px solid #1652F0;
  height: 38px;
  font-size: 1.1rem;
  border-radius: 4px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  margin: 8px 0px 20px 0px;
}
&:hover {
  background-color: #0A46E4;
  border-color: #0A46E4;
}
`;

export const RegistrationPage = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const autoLogin = async (credentials: Credentials) => {
    const request = await fetch("/auth/login", { //pass credentials to the backend
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password
      })
    });
    const response = await request.json();
    if (!request.ok) { //display error message if request fails
      return response.message ? setError(response.message) : setError(response.error);
    } else {
      //save token to localStorage so that user can be automatcally logged in after they reconnect to the app
      localStorage.setItem("token", response.token);
      dispatch(loginUser(response.user)); //add user to the state
    }
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setError(""); //make sure error gets removed (in case it was visible)
    e.preventDefault(); //to avoid refreshing the page
    const newUserObj = {
      username: username,
      email: email,
      password: password,
      repeatedPassword: repeatedPassword
    };
    const request = await fetch("/auth/register", { //pass newUserObj to the backend
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUserObj)
    });
    if (!request.ok) { //display error message if request fails
      const response = await request.json();
      return response.message ? setError(response.message) : setError(response.error);
    } else { //if registration is successful, automatically log-in the user
      const credentials = {
        username: newUserObj.username,
        password: newUserObj.password
      };
      autoLogin(credentials);
      navigate("/"); //redirect user to the main page
    }
  };

  return(
    <Form onSubmit={(e) => handleSubmit(e)}>
      <InputField 
        placeholder="Username..." 
        type="text"
        required={true}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputField 
        placeholder="Email address..." 
        type="email"
        required={true}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField 
        placeholder="Password..." 
        type="password"
        required={true}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <InputField 
        placeholder="Repeat password..." 
        type="password"
        required={true}
        value={repeatedPassword}
        onChange={(e) => setRepeatedPassword(e.target.value)}
      />
      <SubmitButton type="submit">Register</SubmitButton>
      <ErrorMessage text={error} />
    </Form>
  );
};
