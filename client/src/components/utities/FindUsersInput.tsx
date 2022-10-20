import React, {useState, useRef, useEffect, lazy, ReactPropTypes, ReactNode} from 'react';
import {useNavigate} from "react-router-dom";

import {SocketIO} from  '../socket/socketIO';
import {ChatProfilesType} from "../../redux/types/reduxStoreTypes";

const socket = SocketIO.instance.socket;


export default function FindUsersInput({search}: string) {
    const [foundUsers, setFoundUsers] = useState<ReactNode[]>([]);
    useEffect(() => {
        socket.emit('FIND_USERS_INPUT', search);
        socket.on('FIND_USERS_INPUT_ANSWER', function ({users}: {users: ChatProfilesType[]}){
            setFoundUsers(users.map(user => {
                return (
                    <li>
                        <span className="ChatHeaderTitle">{user.firstName + " " + user.lastName}</span>
                        <img  className="ChatHeaderImage" src={user.profilePhoto} alt={"missing"}/>
                    </li>);
            }));
        });
        return(() => {
            socket.off('FIND_USERS_INPUT_ANSWER')
        });
    }, []);

    return (
        foundUsers ? <ol className={'FindUsersInput'}>{foundUsers}</ol> : <div></div>
    );
};
