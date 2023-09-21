import React, { useState } from "react";
import styled from "styled-components";
import Picker, { EmojiStyle } from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
const ChatInput = ({ handleSendMsg }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");
    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };
    const handleEmojiClick = (emoji, event) => {
        setMsg((prevInput) => prevInput + emoji.emoji);
    };

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg("");
        }
    };
    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                    {showEmojiPicker && (
                        <Picker
                            emojiStyle={EmojiStyle.APPLE}
                            onEmojiClick={handleEmojiClick}
                        />
                    )}
                </div>
            </div>
            <form
                className="input-container"
                onSubmit={(event) => sendChat(event)}
            >
                <input
                    type="text"
                    placeholder="type your message here"
                    value={msg}
                    onChange={(event) => {
                        setMsg(event.target.value);
                    }}
                />
                <button className="submit">
                    <IoMdSend />
                </button>
            </form>
        </Container>
    );
};

const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    background-color: #080420;
    padding: 0 2rem;
    padding-bottom: 0.3rem;
    .button-container {
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;
        .emoji {
            position: relative;
            svg {
                font-size: 1.5rem;
                color: #ffff00c8;
                cursor: pointer;
            }
            .EmojiPickerReact {
                position: absolute;
                top: -470px;
                --epr-bg-color: #080420;
                --epr-category-label-bg-color: #080420;
                --epr-search-input-bg-color: transparent;
                --epr-highlight-color: #9a86f3;

                box-shadow: 0px 2px 2px #9a86f3;
                border-color: #4f46a5;
            }
        }
    }
    .input-container {
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        background-color: #ffffff34;
        input {
            width: 90%;
            height: 60%;
            background-color: transparent;
            color: white;
            border: none;
            padding-left: 1rem;
            font-size: 1.2rem;
            &::selection {
                background-color: #9186f3;
            }
            &:focus {
                outline: none;
            }
        }
        button {
            padding: 0.3rem 2rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #9186f3;
            border: none;
            svg {
                font-size: 2rem;
                color: white;
                cursor: pointer;
            }
        }
    }
`;

export default ChatInput;
