// Initial State
const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false
}

//The reducer
export default function accountReducer(state= initialStateAccount, action){
    switch (action.type){
        case "account/deposit":
            return {
                ...state,
                balance: state.balance + action.payload,
                isLoading: false
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

        case "account/convertingCurrency":
            return {
                ...state,
                isLoading: true,
            }

        default:
            return state;
    }
}

//Action creator functions
function deposit(amount, currency){
    if (currency === "USD") return {type: "account/deposit", payload:amount}

    return async function (dispatch, getState){
        dispatch({type: "account/convertingCurrency"})
        //API CALL
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
        const data = await res.json()
        const convertedAmount = data.rates.USD

        //Return Dispatch
        dispatch({type: "account/deposit", payload: convertedAmount})
    }
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