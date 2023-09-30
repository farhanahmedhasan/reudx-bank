// Initial State
const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: ""
}

//The reducer
export default function accountReducer(state= initialStateAccount, action){
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

//Action creator functions
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

export {deposit, withdraw, requestLoan, payloan}