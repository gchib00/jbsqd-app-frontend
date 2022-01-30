import React from "react";
import { createStore } from "redux";
import allReducers from "./store/reducers";
import { Provider } from "react-redux";
import { CountriesListPage } from "./components/CountriesListPage";
import { Navbar } from "./components/Navbar";
import { Route, Routes, BrowserRouter} from "react-router-dom";
import { RegistrationPage } from "./components/RegistrationPage";
import { LoginPage } from "./components/LoginPage";

const App = () => {
  const store = createStore(allReducers);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Navbar />
        <Routes>
          <Route path='/' element={<CountriesListPage />} />
          <Route path='/register' element={<RegistrationPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;