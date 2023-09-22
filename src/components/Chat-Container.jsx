import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./Chat-Input";
import Messages from "./Messages";
import axios from "axios";
import { getMessageRoute, sendMessageRoute } from "../utils/APIRoutes";

const ChatContainer = ({ currentChat, currentUser }) => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const getMessages = async () => {
            const { data } = await axios.post(getMessageRoute, {
                from: currentUser._id,
                to: currentChat._id,
            });
            if (data.status === true) {
                setMessages(data.messages);
            }
        };
        getMessages();
    }, [currentChat]);

    const handleSendMsg = async (msg) => {
        try {
            const data = await axios.post(sendMessageRoute, {
                from: currentUser._id,
                to: currentChat._id,
                message: msg,
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            {currentChat && (
                <Container>
                    <div className="chat-header">
                        <div className="user-details">
                            <div className="avatar">
                                <img
                                    src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                                    alt={"avatar"}
                                />
                            </div>
                            <div className="username">
                                <h3>{currentChat.username}</h3>
                            </div>
                        </div>
                        <Logout />
                    </div>
                    <div className="chat-messages">
                        {messages.map((message) => {
                            return (
                                <div>
                                    <div
                                        className={`message ${
                                            message.fromSelf
                                                ? "sent"
                                                : "received"
                                        }`}
                                    >
                                        <div className="content">
                                            <p>{message.message}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <ChatInput handleSendMsg={handleSendMsg} />
                </Container>
            )}
        </>
    );
};
const Container = styled.div`
    padding-top: 1rem;
    display: grid;
    grid-template-rows: 10% 78% 12%;
    gap: 1rem;
    overflow: hidden;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        grid-auto-rows: 15% 70% 15%;
    }
    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
        .user-details {
            display: flex;
            align-items: center;
            gap: 1rem;
            .avatar {
                img {
                    height: 3rem;
                }
            }
            .username {
                h3 {
                    color: white;
                }
            }
        }
    }
    .chat-messages {
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;

        .message {
            display: flex;
            align-items: center;
            .content {
                max-width: 40%;
                overflow-wrap: break-word;
                padding: 1rem;
                font-size: 1.1rem;
                border-radius: 1rem;
                color: #d1d1d1;
            }
        }
        .sent {
            justify-content: flex-end;
            .content {
                background-color: #4f04ff21;
            }
        }
        .received {
            justify-content: flex-start;
            .content {
                background-color: #9900ff20;
            }
        }
    }
`;
export default ChatContainer;
