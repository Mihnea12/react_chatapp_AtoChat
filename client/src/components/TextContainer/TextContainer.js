import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';
import logo from '../../icons/logo.png';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
      <img src={logo} alt="logo"/>
    </div>
    {
      users
        ? (
          <div>
            <h1>People currently chatting:</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;