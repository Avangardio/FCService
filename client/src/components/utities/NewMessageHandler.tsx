import React, {useState, useRef, useEffect, lazy, ReactPropTypes} from 'react';
import {ChatProfilesType} from "../../redux/types/reduxStoreTypes";
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
    newMessage: {
        chatProfiles: ChatProfilesType
        message: any
    }
}
//senderProfile: ChatProfilesType, message: string
export default function NewMessage({newMessage}: Props) {
    const navigate = useNavigate();
    const {body, from} = newMessage.message;
    const {firstName, lastName, profilePhoto, uId} = newMessage.chatProfiles[from];

    function handleClick(event: React.MouseEvent<HTMLElement>){

        navigate(`/Feed?chat=${uId}`);
    }

    return (
        <div className="NewMessageNotification" onClick={event => handleClick(event)}>
            <div className='HeaderContainer'>
                <span>{firstName + " " + lastName}</span>
                <img src={profilePhoto} alt='missing'/>
            </div>
            <div>{body}</div>
        </div>
    );

}