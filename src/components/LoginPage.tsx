import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
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
  margin: 8px 0px 8px 0px;
}
&:hover {
  background-color: #0A46E4;
  border-color: #0A46E4;
}
`;
const RegisterLink = styled.div`
  margin: 5px auto 5px auto;
`;
export const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setError(""); //make sure error gets removed (in case it was visible)
    e.preventDefault(); //to avoid refreshing the page
    const userObj = {
      username: username,
      password: password
    };
    const request = await fetch("/auth/login", { //pass credentials to the backend
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userObj)
    });
    const response = await request.json();
    if (!request.ok) { //display error message if request fails
      return response.message ? setError(response.message) : setError(response.error);
    } else {
      //save token to localStorage so that user can be automatcally logged in after they reconnect to the app
      localStorage.setItem("token", response.token);
    }
  };

  return(
    <Form onSubmit={(e) => handleSubmit(e)}>
      <InputField 
        placeholder="Username..." 
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputField 
        placeholder="Password..." 
        type="password"
        autoComplete="off"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <SubmitButton type="submit">Login</SubmitButton>
      <ErrorMessage text={error} />
      <RegisterLink>
        Don&apos;t have an account yet? <Link to="/register">Register</Link>  
      </RegisterLink>
    </Form>
  );
};
