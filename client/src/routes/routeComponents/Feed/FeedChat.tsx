import allActions from '../../../redux/actions/userAction';
import React, {useState, useRef, useEffect, ChangeEvent} from 'react';
import {useSelector, useDispatch, useStore} from 'react-redux';
import {SocketIO} from  '../../../components/socket/socketIO'
import {ReduxStoreType, FeedChatsType, ChatsElementType, ChatMessagesType} from "../../../redux/types/reduxStoreTypes";
import {StringParam, useQueryParam} from "use-query-params";
import feedState from "../../../redux/reducers/feedReducer";
import {useMediaQuery} from "react-responsive";
import {toast} from "react-toastify";
import {strict} from "assert";
const socket = SocketIO.instance.socket;

export default function FeedChat() {

    const dispatch = useDispatch();
    const feedStore = useSelector((state: ReduxStoreType) => state.feedState.feedElements.chats);
    const uId = useSelector((state: ReduxStoreType) => state.userState.uId);

    const isDesktopOrMobile = useMediaQuery({
        query: '(min-width: 500px)'
    });

    const [selectedId, setSelectedId] = useQueryParam('chat', StringParam);
    const [typedMessage, setTypedMessage] = useState<string>('');
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [uploadedFile, setUploadedFile] = useState<string>('');


    const chatParent = useRef<HTMLDivElement>(null)
    const currentChat = [selectedId, uId].sort().join(``);
    const chat = feedStore[currentChat];

    const values = feedStore[currentChat] ? feedStore[currentChat].messages : null;
    const profiles  = chat ? Object.keys(chat.chatProfiles).map(key => chat.chatProfiles[key]) : null;

    useEffect(() => {
        if(!uId) return;
        if(!chat) {
            socket.emit("LOAD_NEW_CHAT", {uId, pageId: selectedId});
        }

        socket.on('LOAD_NEW_CHAT_ANSWER', function (data){
            console.log(data)
            dispatch(allActions.loadNewChat(data));
            console.log(feedStore);
        });
        socket.on('UPLOAD_PHOTO_ANSWER', function (file){
            setUploadedFile(file);
        });

        return (() => {
            socket.off("LOAD_NEW_CHAT_ANSWER");
            socket.off('UPLOAD_PHOTO_ANSWER' );
        });
    }, [selectedId]);

    useEffect(() => {
        if(!values || !uId || values.length === 0) return;
        socket.emit('READ_CHAT_MESSAGES', {chatId: currentChat, to: values[0].messageId, host: uId});
        dispatch(allActions.markAsRead(currentChat, selectedId!));
    }, [values?.length]);

    useEffect(() => {
        if(!feedStore || Object.entries(feedStore).length === 0 || scrolled) return;
            const domNode = chatParent.current;
            if(domNode) domNode.scrollIntoView();
            setScrolled(true);
    }, [feedStore, scrolled]);



    if(!chat || !uId) return (<div>Loading...</div>);


    function uploadFile(event: ChangeEvent<HTMLInputElement>){
        const file = event.target.files![0];
        file.size < 2097152*2 ? socket.emit('UPLOAD_PHOTO', file, file.name) : toast.error('Файл слишком большой!');
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const getMessage = feedStore[currentChat].messages.slice(-1)[0];
        const newMessageProfiles = feedStore[currentChat].chatProfiles;
        const newMessageId = getMessage ? getMessage.messageId + 1 : 1;

        const message = {
            body: typedMessage? typedMessage : ' ',
            from: uId,
            messageId: newMessageId,
            currentChat,
            contentType: uploadedFile ? 'picture' : 'text',
            date: new Date(Date.now()).toISOString(),
            chatUsers: profiles!.map(profile => profile.uId).sort(),
            picture: uploadedFile ? uploadedFile : undefined,
            unRead: true
        };

        dispatch(allActions.newMessage(currentChat, message, newMessageProfiles));
        socket.emit('SEND_MESSAGE', {senderId: uId, chatId: currentChat, message, chatProfiles: newMessageProfiles});
        setScrolled(false);
        setTypedMessage('');
        setUploadedFile('');
    };

    const headerUser = profiles?.find(profile => profile.uId === selectedId);
    let elements = values?.map((chat, index , array)=> {
        if (!chat) return;
        const prevMessage = index > 0              ? array[index - 1] : null;
        const nextMessage = index < array.length-1 ? array[index + 1] : null;
        const {messageId, body, from, chatId, contentType, unRead, picture} = chat;
        const messageHeader  = profiles?.find(profile => profile.uId === from);
        const prevSameOrigin = from === prevMessage?.from;
        const nextSameOrigin = from === nextMessage?.from;
        let classes = 'ChatMessage';
        if(prevSameOrigin)  classes = classes + ' NextMessage';
        if(nextSameOrigin)  classes = classes + ' NextMessageSame';
        if(!nextSameOrigin) classes = classes + ' NextMessageNew';
        if(unRead) classes = classes + ' Unread';
        return (
            <div className={classes}>
                {prevSameOrigin ||
                <div>
                    <img className="ChatHeaderImage" src={messageHeader.profilePhoto} alt={"missing"}/>
                </div>
                }
                <div  key={messageId} className={prevSameOrigin ? "ChatHeaderContainer NextMessage" : "ChatHeaderContainer"}>
                    {prevSameOrigin || <span className="ChatHeaderTitle">{messageHeader.firstName}</span>}
                    <span className="ChatUserText">{body}</span>
                    {picture ? <img className={'CurrenChatPicture'} src={picture}/> : null}
                </div>
            </div>
       )
    });
    if(!headerUser) return (
        <div>Пользователя не существует</div>
    );
    // {uploadedFile ? <img src={uploadedFile}/> : null}
    return (
        <div className={isDesktopOrMobile ? 'CurrentChat' : 'CurrentChat Mobile'}>
            <div className='CurrentChatHeader'>
                <span className="ChatHeaderTitle">{headerUser.firstName + " " + headerUser.lastName}</span>
                <img  className="ChatHeaderImage" src={headerUser.profilePhoto} alt={"missing"}/>
            </div>
            <div className="">
            <div className='ChatMessagesContainer'>
                {elements}
                <div ref={chatParent}/>
            </div>
            </div>
            <form className={'CurrentChatForm'} onSubmit={handleSubmit}>
                <textarea placeholder='Отправить сообщение' value={typedMessage} style={{resize: "none"}} onChange={event => setTypedMessage(event.target.value)}/>
                <input type='file' onChange={uploadFile} accept={'image/png, image/jpeg'} id={'ChatImageLoad'}/>
                <input type={'button'} onClick={() => document.querySelector<HTMLElement>('#ChatImageLoad')!.click()}/>
                <div>
                {uploadedFile ? <img className='ChatImagePreview' src={uploadedFile}/> : null}
                </div>
                <button type="submit"></button>
            </form>
        </div>
    )
};


//последний элемент ref={chatParent} гдеь элементс