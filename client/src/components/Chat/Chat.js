import React, { useState, useEffect }  from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import Compressor from 'compressorjs';

import './Chat.css';
import InfoBar from '../InfoBar/InfoBar.js';
import Input from '../Input/Input.js';
import Messages from '../Messages/Messages.js';
import TextContainer from '../TextContainer/TextContainer.js';
import UploadFile from '../UploadFile/UploadFile.js';

let socket;
//var connectionOptions = { "force new connections": true, "reconnectAttempts": "Infinity", "timeout": 10000, "transports": ["websockets"]};

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [file, setFile] = useState('');

    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, (error) => {
            if(error) {
                alert(error);
              }
        });

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })

        socket.on('roomData', ({ users }) => {
            setUsers(users);
        });

        socket.on('loadImage', (info) => {
            console.log(info.buffer);
            setMessages([...messages, info]);
        })
        return () => {
            socket.off()
          }
        
    },[messages]);

    //function for sending messages
    

    const sendMessage = (event) => {
        event.preventDefault();
        if(message){
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    const onChange = e => {
        setFile(e.target.files[0]);
    }

    const onFileUpload = (event) => {
        event.preventDefault();
        new Compressor(file, { quality: 0.6, success(result){
            socket.emit("image", result);
        }});
    };

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name} file={file}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
                <UploadFile onChange={onChange} onFileUpload={onFileUpload}/>
            </div>
            <TextContainer users={users}/>
        </div>
    )
}

export default Chat;