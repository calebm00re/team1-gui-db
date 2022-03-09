import '../Styles/Login.css';
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const navigate = useNavigate();

    return (
        <>
        <div class="login-container">
            <div>Login bitch</div>
            <button type="button" class="btn btn-outline-dark" onClick={() => navigate("/")}>or go back</button>
        </div>
        </>
    );
}