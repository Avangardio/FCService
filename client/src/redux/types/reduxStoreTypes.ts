//message & feedState types
export type         ChatProfilesType   = {
    firstName    ?: string
    lastName     ?: string
    profilePhoto ?: string
    uId          ?: string
    [key: string]: any
}
export type         ChatMessagesType   = {
    chatId          ?:  string
    messageId       :  number
    from            ?:  string
    date            ?:  string
    contentType     ?:  string
    body            ?:  string
    answerTo        ?:  number
    replyFrom       ?:  number
    unRead          ?:  boolean
    picture         ?:  string
}
export type         ChatsElementType = {
    [key: string]: {
        chatProfiles: ChatProfilesType
        messages    : ChatMessagesType[]
    }
}

export type          ChatSetupType   = {
    chatId          : string
    host            : string
    operation       ?: string
    message         ?: ChatMessagesType
}

export type         FeedChatsType = {
    chats           : ChatsElementType
}
export interface    FeedStateInterface   {
    filter          : string
    feedElements    : FeedChatsType
}
//message & feedState types end

//user & userState types
export interface    UserStateInterface   {
    uId: string,
    myPage?: boolean
}
export type         UserActionPayload  = {
    uId: string
    myPage: boolean
}

//user & userState types end
export type         ReduxStoreType     = {
    userState   : UserStateInterface
    feedState   : FeedStateInterface
}


// Action type
export interface ActionType {
    type: string
    payload: ChatsElementType & UserActionPayload & ChatSetupType & string
}
// action types end

export type DispatchType = (args: ActionType) => ActionType