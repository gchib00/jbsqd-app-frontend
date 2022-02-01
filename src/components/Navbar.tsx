import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { loginUser } from "../store/actions";
import { State } from "../types";

const Header = styled.header`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const AppName = styled.h2`
  color: #1652F0;
  margin-left: 15px;
`;
const Nav = styled.nav`
  margin-right: 15px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const NavItem = styled(Link)`
  color: #1652F0;
  border-bottom: 3px solid white;
  min-width: 90px;
  font-size: 1.2rem;
  padding: 22px 10px 22px 10px;
  text-align: center;
  text-decoration: none;
  &:hover {
    border: none;
    color: #1652F0;
    border-bottom: 3px solid #1652F0;
  }
`;

export const Navbar = () => {
  const user = useSelector((state: State) => state.user);
  const dispatch = useDispatch();
  
  const logoutUser = () => {
    if(user && confirm(`You are currently logged in as ${user.username}. Are you sure you want to log-out?`)){
      localStorage.removeItem("token"); //remove the user-token from the localStorage
      dispatch(loginUser(undefined)); //empty the user state
    }
  };
  
  return(
    <Header>
      <AppName>jbsqd-app</AppName>
      <Nav>
        <NavItem to="/">Main</NavItem>
        {user ? //if user is logged in, show "Logout" button, otherwise show "Login" option
          <NavItem to="#" onClick={logoutUser}>Logout</NavItem> //empty Link component that triggers fn to logout user
        :
          <NavItem to="/login">Login</NavItem>
        }
      </Nav>
    </Header>
  );
};
