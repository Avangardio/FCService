import {ChatMessagesType, ChatProfilesType, ChatsElementType} from "../../redux/types/reduxStoreTypes";

export default function CheckChatFilter(chat: { chatProfiles: ChatProfilesType; messages: ChatMessagesType[] }, activeFilter: string, uId: string){
    const {messages} = chat;
    if(messages.length === 0) return false;
    if(activeFilter === 'none') return true;
    if(messages.slice(-1)[0].unRead! === true && messages.slice(-1)[0].from !== uId) return true;
    return false;
}