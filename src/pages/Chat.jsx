import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/Chat-Container";
const Chat = (props) => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(undefined);
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("chat-app-user");
        const fetchUser = async () => {
            setCurrentUser(await JSON.parse(user));
            setIsLoaded(true);
        };
        if (!user) {
            navigate("/login");
        } else if (user) {
            fetchUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const getAllUSers = async (id) => {
            const { data } = await axios.get(`${getUsersRoute}/${id}`);
            if (data.status) {
                setContacts(data.contacts);
            }
        };
        if (currentUser) {
            if (currentUser.isAvatarSet) {
                getAllUSers(currentUser._id);
            } else {
                navigate("/set-avatar");
            }
        }
    }, [currentUser]);
    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };
    return (
        <Container>
            <div className="container">
                <Contacts
                    contacts={contacts}
                    currentUser={currentUser}
                    handleChatChange={handleChatChange}
                />
                {isLoaded && currentChat ? (
                    <ChatContainer
                        currentChat={currentChat}
                        currentUser={currentUser}
                    />
                ) : (
                    <Welcome currentUser={currentUser} />
                )}
            </div>
        </Container>
    );
};

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background-color: #131324;
    .container {
        height: 85vh;
        width: 85vw;
        background-color: #00000076;
        display: grid;
        grid-template-columns: 25% 75%;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            grid-template-columns: 35% 65%;
        }
    }
`;

export default Chat;
