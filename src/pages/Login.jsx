import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
import axios from "axios";
const Login = (props) => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    const toastOptions = {
        position: "bottom-right",
        autoClose: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { username, password } = values;
            const { data } = await axios.post(loginRoute, {
                username,
                password,
            });
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            } else if (data.status === true) {
                localStorage.setItem(
                    //TODO:add jwt
                    "chat-app-user",
                    JSON.stringify(data.user)
                );
                navigate("/");
            }
        }
    };
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleValidation = () => {
        const { username, password } = values;
        if (username.trim().length === 0 || password.trim().length === 0) {
            toast.error("Username and password are required", toastOptions);
            return false;
        }
        return true;
    };

    useEffect(() => {
        if (localStorage.getItem("chat-app-user")) {
            navigate("/");
        }
    }, []);
    return (
        <>
            <FromContainer>
                <form
                    onSubmit={(event) => {
                        handleSubmit(event);
                    }}
                >
                    <div className="title">
                        <h1>Chatty</h1>
                    </div>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={(event) => handleChange(event)}
                        min={3}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(event) => handleChange(event)}
                    />
                    <button type="submit">Login</button>
                    <span>
                        Don't Have an Account?{" "}
                        <Link to="/register">register</Link>{" "}
                    </span>
                </form>
            </FromContainer>
            <ToastContainer />
        </>
    );
};

const FromContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .title {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        h1 {
            color: #e6f9f5;
            text-transform: uppercase;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: #e6f9f5;
            width: 100%;
            font-size: 1rem;
            &:focus {
                border: 0.1rem solid #997af0;
                outline: none;
            }
        }
        button {
            background-color: #997af0;
            color: white;
            padding: 1rem;
            border-radius: 0.4rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
            &:hover {
                background-color: #4e0eff;
            }
        }
        span {
            color: white;
            a {
                color: #4e0eff;
            }
        }
    }
`;

export default Login;
