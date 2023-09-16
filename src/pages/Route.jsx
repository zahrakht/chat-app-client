import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import NotFound from "./Not-found";
import Chat from "./Chat";
import AddAvatar from "./Set-avatar";
const Router = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/set-avatar" element={<AddAvatar />}></Route>
                <Route path="/" element={<Chat />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
