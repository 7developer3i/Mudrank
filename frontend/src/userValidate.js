import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export function UserValidate({ children }) {
    const Varify_Number_token = Cookies.get("varify_number_token");
    if (!Varify_Number_token) {
        return <Navigate to='/loginpage' replace={true}></Navigate>
    }
    return children
}