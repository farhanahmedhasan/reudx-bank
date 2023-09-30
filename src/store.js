import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";

import customerReducer from "./features/customers/customerSlice.js";
import accountReducer from "./features/accounts/accountSlice.js";

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store