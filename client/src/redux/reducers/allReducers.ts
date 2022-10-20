import { combineReducers } from "redux";

import userState    from "./stateReducer";
import feedState    from "./feedReducer";

const rootReducer = combineReducers({
    userState: userState,
    feedState: feedState,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;