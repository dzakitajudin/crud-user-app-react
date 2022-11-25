import { combineReducers } from "@reduxjs/toolkit";
import usersReducers from "./reducer";

const rootReducer = combineReducers({
    data: usersReducers
});

export default rootReducer;