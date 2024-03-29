import { configureStore } from "@reduxjs/toolkit";
import sampleReducers from "./sample.reducers";
import { createLogger } from "redux-logger";
import carListingReducers from "./car-listing/carListing.reducers";
import isLoginReducers from "./isLogin.reducers";
import userDataReducers from "./userData.reducers";
import transactionHistoryReducers from "./transaction-history/history.reducers";
import blogCompareReducers from "./compare-cars/blogCompare.reducers";

const logger = createLogger();

const store = configureStore({
  reducer: {
    sample: sampleReducers,
    blogListing: carListingReducers,
    blogCompare: blogCompareReducers,
    loginStatus: isLoginReducers,
    user: userDataReducers,
    history: transactionHistoryReducers,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
