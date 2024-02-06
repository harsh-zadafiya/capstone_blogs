import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userReducer from "./user/user.reducer";

const store = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat([logger]),
});

export default store;
