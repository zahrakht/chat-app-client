import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import NotFound from "./Not-found";
import Chat from "./Chat";
const Router = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/Login" element={<Login />}></Route>
                <Route path="/" element={<Chat />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
