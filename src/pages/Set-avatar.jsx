import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from "../utils/APIRoutes";
import axios from "axios";
import { Buffer } from "buffer";
import ShowAvatars from "../components/ShowAvatars";
import loader from "../assets/images/loader.gif";

const SetAvatar = (props) => {
    const avatarsApi = "https://api.multiavatar.com/45678945";
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const toastOptions = {
        position: "bottom-right",
        autoClose: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    };
    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOptions);
        } else {
            const user = await JSON.parse(
                localStorage.getItem("chat-app-user")
            );
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar],
            });
            if (!data.isSet) {
                toast.error(
                    "Error setting avatar, please try again",
                    toastOptions
                );
            } else if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user));
                navigate("/");
            }
        }
    };
    useEffect(() => {
        const data = [];
        const fetchAvatars = async () => {
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(
                    `${avatarsApi}${Math.round(Math.random() * 1000)}`
                );
                if (!image) {
                    return false;
                }
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        };
        fetchAvatars();
    }, []);
    useEffect(() => {
        if (!localStorage.getItem("chat-app-user")) {
            navigate("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {isLoading ? (
                <Container>
                    <img src={loader} alt="loader" className="loader" />
                </Container>
            ) : (
                <Container>
                    <div className="title-container">
                        <h1>Pick an avatar as your profile picture</h1>
                    </div>
                    <div className="avatars">
                        {avatars.map((avatar, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`avatar ${
                                        selectedAvatar === index
                                            ? "selected"
                                            : ""
                                    }`}
                                >
                                    <img
                                        src={`data:image/svg+xml;base64,${avatar}`}
                                        alt={"avatar"}
                                        onClick={() => setSelectedAvatar(index)}
                                    ></img>
                                </div>
                            );
                        })}
                    </div>
                    <button className="submit-btn" onClick={setProfilePicture}>
                        Set as Profile Picture
                    </button>
                </Container>
            )}
            <ToastContainer />
        </>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;
    .loader {
        max-inline-size: 100%;
    }
    .title-container {
        h1 {
            color: white;
        }
    }
    .avatars {
        display: flex;
        gap: 2rem;
        .avatar {
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            transition: 0.5s ease-in-out;
            img {
                height: 6rem;
            }
        }
        .selected {
            border: 0.4rem solid #4e0eff;
        }
    }
    .submit-btn {
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
`;

export default SetAvatar;
