import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiLogOutCircle } from "react-icons/bi";
const Logout = (props) => {
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.removeItem("chat-app-user");
        navigate("/login");
    };
    return (
        <LogoutButton onClick={handleClick}>
            <BiLogOutCircle />
        </LogoutButton>
    );
};

const LogoutButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #9a86f3;
    border: none;
    cursor: pointer;
    svg {
        font-size: 1.3rem;
        color: #ebe7ff;
    }
`;

export default Logout;
