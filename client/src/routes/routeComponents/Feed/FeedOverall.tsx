import React, { useState, useRef, useEffect } from 'react';
import {useSelector, useDispatch, useStore} from 'react-redux';
import {SocketIO} from  '../../../components/socket/socketIO'
import {ReduxStoreType, FeedChatsType, ChatsElementType} from "../../../redux/types/reduxStoreTypes";
import {StringParam, useQueryParam} from "use-query-params";
import {useMediaQuery} from "react-responsive";

import ContentTypeCheck from "../../../components/utities/ContentTypeCheck";
import contentTypeCheck from "../../../components/utities/ContentTypeCheck";
import CheckChatFilter from "../../../components/utities/CheckChatFilter";
import FindUsersChat from "../../Components/FindUsersChat";

const socket = SocketIO.instance.socket;

export default function FeedOverall() {

    const dispatch = useDispatch();
    const uId = useSelector((state: ReduxStoreType) => state.userState.uId);
    const feedStore = useSelector((state: ReduxStoreType) => state.feedState.feedElements.chats);
    const activeFilter = useSelector((state: ReduxStoreType) => state.feedState.filter);
    useEffect(() => {
        if(!uId) return;
        socket.on("FIND_USERS_INPUT_ANSWER", function (data){
            console.log(data);
            });
        return (()=> {
            socket.off('FIND_USERS_INPUT_ANSWER');
        })
    }, [uId])

    const isDesktopOrMobile = useMediaQuery({
        query: '(min-width: 500px)'
    });
    const [currentChat, setCurrentChat] = useQueryParam('chat', StringParam);
    const [findId, setFindId]                = useState  <string>  ('');

    function handleSubmit (event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        socket.emit('FIND_USERS_INPUT', findId);
       // setCurrentChat(`id${findId}`)
    };


    function handleClick(event: React.MouseEvent<HTMLElement>){
        event.preventDefault();
        const target = event.target as HTMLElement;
        const targetId = target.closest('div.ChatHeaderContainer')!.getAttribute("data-id");
        if(targetId !== null) setCurrentChat(targetId);
        setCurrentChat(targetId);
    };
//.filter(chat => CheckChatFilter(chat))
    let values = Object.keys(feedStore).map(key => feedStore[key]).filter(chat => CheckChatFilter(chat, activeFilter, uId)).sort((chat1, chat2) => {
        let result;
        chat1.messages?.slice(-1)[0].date! < chat2?.messages.slice(-1)[0].date! ? result = 1 : result = -1;
        return result;
    });
    let elements = values.map((chat, index)=> {
        if(chat.messages.length === 0) return;
            const {messageId, body, from, chatId, contentType, unRead} = chat.messages.slice(-1)[0];
            const [profile1, profile2]  = Object.keys(chat.chatProfiles).map(key => chat.chatProfiles[key]);
            let headerUser;
            if(!profile2)  headerUser = profile1
            else  headerUser = uId !== profile1.uId ? profile1 : profile2;
            let messageText;
            contentTypeCheck(contentType!) ?  messageText = contentTypeCheck(contentType!) : messageText = body!;

            return (
                <div data-id={headerUser.uId} key={headerUser.uId} className={unRead === true && from !== uId ? "ChatHeaderContainer Unread" : "ChatHeaderContainer"} onClick={(event) => {handleClick(event)}}>
                    <span className="ChatHeaderTitle">{headerUser.firstName + " " + headerUser.lastName}</span>
                    <img  className="ChatHeaderImage" src={headerUser.profilePhoto} alt={"missing"}/>
                    <div  className={unRead === true && from === uId ? "ChatMessageField Unread" : "ChatMessageField"}>
                        <img className="ChatUserImage" src={chat.chatProfiles[from!].profilePhoto}/>
                        <div>{chat.chatProfiles[from!].firstName + ":"}</div>
                        <div className="ChatUserText">{messageText}</div>
                    </div>
                </div>
            )
        });

    return (
        <div className={isDesktopOrMobile ? "ChatOverall" : 'ChatOverall Mobile'}>
                <FindUsersChat source={'chat'} />
            <div>
                {elements}
            </div>
         </div>
    )

};