import React, { useContext } from "react";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Registration from "./pages/Registration";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Context } from "../App";
import { observer } from "mobx-react-lite";

const Router = () => {
  const { store } = useContext(Context);

  return (
    <BrowserRouter>
      <Routes>
        {store.isAuth ? (
          <Route path="/" element={<Users />} />
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default observer(Router);
