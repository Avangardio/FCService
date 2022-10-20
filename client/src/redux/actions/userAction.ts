import * as ACTIONS from "./actionsTitle";
import {ChatMessagesType, ChatProfilesType, ChatsElementType} from "../types/reduxStoreTypes";

const authUser = (uId: string, myPage: boolean) => ({
    type: ACTIONS.AUTH_USER,
    payload: {
        uId,
        myPage
    }
});

const setFilter = (filter: string) => ({
    type: ACTIONS.SET_FILTER,
    payload: {
        filter
    }
});

const initFeed = (chats: ChatsElementType) => ({
    type: ACTIONS.INIT_FEED,
    payload: {
        chats
    }
});

const newMessage = (chatId: string, message: { date: string; chatUsers: any[]; unRead: boolean; messageId: number; from: string; body: string; contentType: string; picture: string | undefined; currentChat: string }, chatProfiles: ChatProfilesType) => ({
    type: ACTIONS.NEW_MESSAGE,
    payload: {
        chatId,
        chatProfiles,
        message
    }
});

const markAsRead = (chatId: string, host: string) => ({
    type: ACTIONS.MARK_AS_READ,
    payload: {
        chatId,
        host
    }
});

const loadNewChat = (chat: ChatsElementType) => ({
    type: ACTIONS.LOAD_NEW_CHAT,
    payload: chat
});



export default  {
    markAsRead  ,
    setFilter   ,
    authUser    ,
    initFeed    ,
    newMessage  ,
    loadNewChat
}