import * as ACTIONS          from "../actions/actionsTitle";
import {ActionType}          from "../types/reduxStoreTypes";
import {UserStateInterface}  from "../types/reduxStoreTypes";


const initialState = {
    uId: '',
    myPage: false
}

const userState = (state: UserStateInterface = initialState, action: ActionType) => {

    switch (action.type) {

        case ACTIONS.AUTH_USER:
            return {
                ...state,
                uId: action.payload.uId,
                myPage: action.payload.myPage
            };


        default: // need this for default case
            return state
    };

}

export default userState;