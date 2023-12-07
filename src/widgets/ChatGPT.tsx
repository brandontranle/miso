import { useState } from "react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import "./ChatGPT.css"

const API_KEY = "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";
const systemMessage = {
    role: "system",
    content: "Talk like a cat." //change this to make chatgpt respond hoever you want
}

interface MessageModel {
    message?:string;
    sentTime?:string;
    sender?:string;
    direction: 'outgoing';
    position: "single" | "first" | "normal" | "last" | 0 |  1 | 2 | 3;
}

export const ChatGPT = ({ handleMinimize, isMinimized }) => {

    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState([{
        message: "Hello, I am CatGPT!",
        sender: "ChatGPT"
      
        //position: 'single',
        //direction: 'outgoing'
        }
    ]);

    const handleSend = async (message: string) => {
        const newMessage = {
            message,
            sender: "user",
            direction: 'outgoing', // Assuming "outgoing" is the direction for user messages
            position: "single" // Adjust as needed based on the position in the conversation
        }; // []
    
        const newMessages = [...messages, newMessage];
        setMessages(newMessages);
        // Process message to ChatGPT
        
        //set typing indciator
        setTyping(true);
        await processMessageToChatGPT(newMessages);
    };

    async function processMessageToChatGPT(chatMessages) {
        //from documentation: chatMessages { sender: "user" or "ChatGPT", message: "message content"}
                            //apiMessages {role: "user" or "assistant", content: "message content"}
                                        //these are properties from the API
        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if (messageObject.sender == "ChatGPT")
            {
                role = "assistant"
            }
            else {
                role = "user"
            }
            return { role: role, content: messageObject.message }
        });


        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [systemMessage, //the message we defined for chatGPT behavior
                        ...apiMessages] //all the messages from the chat with chatGPT
        }

        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: { //from API: 
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
            
        }).then((data) => {
            return data.json();
        }).then((data) => {
            console.log(data);
            console.log(data.choices[0].message.content);
            setMessages(
                [...chatMessages, {
                    message: data.choices[0].message.content,
                    sender: "ChatGPT"
                    }
                ]
            );
            setTyping(false);
        });
    }

    return (
        <div className="catgpt-widget">
        <div className="widget-header">
            <p className="widget-title">CatGPT</p>
            <button className="minimize-symbol" onClick={() => handleMinimize()}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="2"
                viewBox="0 0 15 2"
                fill="none"
            >
                <path
                d="M1.83081 1L14 1"
                stroke="#4E4E4E"
                strokeWidth="2"
                strokeLinecap="round"
                />
            </svg>
            </button>
        </div>
        <>
            <div className="widget-line"></div>
            <div className="widget-content">
                <div className="chatgpt">
                    <MainContainer>
                        <ChatContainer>
                            <MessageList 
                                scrollBehavior="smooth"
                                typingIndicator={typing ? <TypingIndicator content ="CatGPT is typing"/> : null}
                            >
                                {messages.map((message, i) => {
                                        console.log(message)
                                        return <Message key = {i} model= {message} />
                                    })}
                            </MessageList>
                            <MessageInput placeholder='Type message here' onSend={handleSend}/>
                        </ChatContainer>
                    </MainContainer>
                </div>
            </div>
        </>
        </div>
    );
};

export default ChatGPT;
