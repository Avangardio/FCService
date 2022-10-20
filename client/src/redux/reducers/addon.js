import { ADD_ELE, TOGGLE_ELE, SET_STATE } from "../actions/actionTypes";
import actions from "../actions/actions";

const initialState = {
    zalupa: ""
}

    const storeY  =  (state = initialState, action) => {
        switch (action.type) {

            case SET_STATE:
                return state;


            default:
                return state;
        }
        ;
    }

    export default storeY;