import {useSelector} from "react-redux";

export default function Customer() {
    const customerFullName = useSelector(store=> store.customer.fullName)

    return <h2>👋 Welcome, {customerFullName ? customerFullName : "The Unknown One"}</h2>;
}