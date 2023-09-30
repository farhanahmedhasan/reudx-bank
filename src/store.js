import {combineReducers, createStore} from "redux";

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: ""
}

const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    createdAt:""
}

function accountReducer(state= initialStateAccount, action){
    switch (action.type){
        case "account/deposit":
            return {
                ...state,
                balance: state.balance + action.payload
            }

        case "account/withdraw":
            return {
                ...state,
                balance: state.balance - action.payload
            }

        case "account/requestLoan":
            if(state.loan) return state
            // TODO
            return {
                ...state,
                balance: state.balance + action.payload.amount,
                loan: state.loan + action.payload.amount,
                loanPurpose: action.payload.purpose
            }

        case "account/payLoan":
            return {
                ...state,
                balance: state.balance - state.loan,
                loan: 0,
                loanPurpose: ""
            }

        default:
            return state;
    }
}

function customerReducer(state = initialStateCustomer,action){
    switch (action.type){
        case "customer/createCustomer":
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt
            }

        case "customer/updateName":
            return {
                ...state,
                fullName: action.payload
            }

        default :
            return state
    }
}

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
})

const store = createStore(rootReducer)

//Action creator function
function deposit(amount){
    return {type: "account/deposit", payload:amount}
}
function withdraw(amount){
    return {type: "account/withdraw", payload:amount}
}
function requestLoan(amount, purpose){
    return {
        type: "account/requestLoan",
        payload:{amount, purpose}
    }
}
function payloan(){
    return {type: "account/payLoan"}
}

store.dispatch(deposit(500))
store.dispatch(withdraw(200))
console.log(store.getState())

store.dispatch(requestLoan(1000, "Buy a cheap car"))
console.log(store.getState())

store.dispatch(payloan())
console.log(store.getState())

function createCustomer(fullName, nationalID){
    return {
        type : "customer/createCustomer",
        payload: {
            fullName,
            nationalID,
            createdAt: new Date().toISOString()
        }
    }
}
function updateName(fullName){
    return {
        type: "customer/updateName",
        payload: fullName
    }
}

store.dispatch(createCustomer("Hasan Ali Mamun", "12454447"))
console.log(store.getState())

store.dispatch(updateName("Hasan Al Mamun"))
console.log(store.getState())