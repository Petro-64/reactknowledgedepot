import React, { Component } from 'react';

function AvatarMy (props)  {
    const firstLetter = props.userName;
    let result;
    if(!!firstLetter){
        result = firstLetter.substring(0, 1);
    } else {
        result = "?";
    }
    return (
        <div className="avatarWrapper">
            {result}   
        </div>
    );
}

export default AvatarMy;

