import CreateCustomer from "./features/customers/CreateCustomer.jsx";
import Customer from "./features/customers/Customer.jsx";
import AccountOperations from "./features/accounts/AccountOperations.jsx";
import BalanceDisplay from "./features/accounts/BalanceDisplay.jsx";
import {useSelector} from "react-redux";

function App() {
    const customerFullName = useSelector(store => store.customer.fullName)

    return (
        <div>
            <h1>🏦 The React-Redux Bank ⚛️</h1>
            {customerFullName &&
                <>
                    <Customer />
                    <AccountOperations />
                    <BalanceDisplay />
                </>
            }

            {!customerFullName && <CreateCustomer />}
        </div>
    );
}

export default App;