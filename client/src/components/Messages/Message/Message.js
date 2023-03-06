import React from 'react';


import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: {user, text, buffer, image}, name, file}) => {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if(user === trimmedName){
        isSentByCurrentUser = true;
    }
    console.log("DAAAAA")
    console.log(file);
    return (
        image
        ? (
            isSentByCurrentUser
            ? (
            
            <div className="messageContainer justifyEnd">
                <p className="sentText pr-10">{trimmedName}</p>
                <div className="messageBox backgroundBlue">
                    <img className = "messageText colorWhite"src={`data:image/png;base64,${buffer}`} alt = "msg"/>
                </div>
            
            </div>
            )
            : (
            <div className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
                    <img className = "messageText colorDark" src={`data:image/png;base64,${buffer}`} alt= "msg"/>
                </div>
                <p className="sentText pl-10">{user}</p>
            </div>
            )
        )
        : (
            isSentByCurrentUser
            ? (
            <div className="messageContainer justifyEnd">
                <p className="sentText pr-10">{trimmedName}</p>
                <div className="messageBox backgroundBlue">
                    <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                </div>
            
            </div>
            )
            : (
            <div className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
                    <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                </div>
                <p className="sentText pl-10">{user}</p>
            </div>
            )
        )
    )
}
   


export default Message;