import React, { FormEvent, useState } from "react";
import styled from "styled-components";

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //to avoid refreshing the page
    const newUserObj = {
      username: username,
      email: email,
      password: password
    };

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
        placeholder="Email address..." 
        type="text"
        autoComplete="off"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField 
        placeholder="Password..." 
        type="password"
        autoComplete="off"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <SubmitButton type="submit">Register</SubmitButton>
    </Form>
  );
};
