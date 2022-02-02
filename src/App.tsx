import React, { useEffect } from "react";
import { CountriesListPage } from "./components/CountriesListPage";
import { Navbar } from "./components/Navbar";
import { Route, Routes, BrowserRouter} from "react-router-dom";
import { RegistrationPage } from "./components/RegistrationPage";
import { LoginPage } from "./components/LoginPage";
import { State } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./store/actions";
import { SlotMachinePage } from "./components/SlotMachinePage";

const App = () => {
  const user = useSelector((state: State) => state.user);
  const dispatch = useDispatch();

  const autoLogin = async (token: string) => {
    const request = await fetch("/auth/autoLogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({token: token})
    });
    const response = await request.json();
    if (!request.ok) {
      console.error(response.error);
    } else { //if token is legitimate, it will return an user and the user will be saved to the state
      dispatch(loginUser(response.user));
    }
  };

  useEffect(() => {
    //if user state is empty but token exists, it means user needs to be automatically logged in
    const token = localStorage.getItem("token");
    if (token && !user) {
      autoLogin(token);
    }
  }, []);

  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<CountriesListPage />} />
          <Route path='/slotMachine' element={<SlotMachinePage />} />
          <Route path='/register' element={<RegistrationPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
    </BrowserRouter>
  );
};
export default App;