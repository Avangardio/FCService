import * as ACTIONS             from "../actions/actionsTitle"    ;
import {ActionType}             from "../types/reduxStoreTypes";
import userState from "./stateReducer";

const initialState = {
    loadedPages: []
}

const pageState = (state = initialState, action: ActionType) => {

    switch (action.type){

        case ACTIONS.LOAD_PAGE:
            return {
                ...state,
                loadedPages: [...state.loadedPages, action.payload]
            };

        default:
            return state

    };
}
export default pageState;