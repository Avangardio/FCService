import * as ACTIONS             from "../actions/actionsTitle"    ;
import {FeedStateInterface}     from "../types/reduxStoreTypes";
import {ActionType}             from "../types/reduxStoreTypes";
import {act} from "react-dom/test-utils";

const initialState = {
    filter: 'none',
    feedElements: {
        chats: {}
    }
}

const feedState = (state: FeedStateInterface = initialState, action: ActionType) => {

    switch (action.type) {

        case ACTIONS.INIT_FEED:
            return {
                ...state,
                feedElements: action.payload
            };

        case ACTIONS.LOAD_NEW_CHAT:
            return {
              ...state,
              feedElements: {
                  chats: Object.assign({}, state.feedElements.chats, action.payload)
              }
            };

        case ACTIONS.SET_FILTER:
            return {
                ...state,
                filter: action.payload.filter
            }

        case ACTIONS.NEW_MESSAGE:
            let {chatId, message, chatProfiles} = action.payload;
            let updatedChats = state.feedElements.chats;
            if(!updatedChats[chatId]) updatedChats[chatId] = {chatProfiles, messages: []};
            updatedChats[chatId].messages = [...updatedChats[chatId].messages!, message!];
            return {
                ...state,
                feedElements: {
                    chats: Object.assign({}, updatedChats)
                }
            };
            //            allChats[action.payload.chatId].messages = [...allChats[action.payload.chatId].messages.map(chat => {
        //                 return {...chat, unRead: false}
        //             })]
        case ACTIONS.MARK_AS_READ:
            let allChats = state.feedElements.chats;
            allChats[action.payload.chatId].messages = allChats[action.payload.chatId].messages.map(chat => {
                if(chat.from === action.payload.host) return {...chat, unRead: false};
                return {...chat};
            });
            return {
                ...state,
                feedElements: {
                    chats: Object.assign({}, allChats)
                }
            };
        default:
            return state;
    };

}

    export default feedState;