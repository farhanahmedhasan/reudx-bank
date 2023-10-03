import {createSlice} from "@reduxjs/toolkit";

// Initial State
const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false
}

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        deposit(state, action) {
            state.balance += action.payload
            state.isLoading = false
        },

        withdraw(state, action){
            state.balance -= action.payload
        },

        requestLoan: {
            prepare(amount,purpose){
                return {
                    payload: {
                        amount, purpose
                    }
                }
            },

            reducer(state, action){
                if(state.loan) return state

                state.balance = state.balance + action.payload.amount
                state.loan = action.payload.amount
                state.loanPurpose = action.payload.purpose
        }},

        payLoan(state){
            state.balance -= state.loan
            state.loan = 0
            state.loanPurpose = ""
        },

        convertingCurrency(state){
            state.isLoading = true
        }
    }
})

export const {
    withdraw,
    requestLoan,
    payLoan
} = accountSlice.actions

export function deposit(amount, currency){
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

export default accountSlice.reducer