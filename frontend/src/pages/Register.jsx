import '../Styles/Register.css';
import { useNavigate } from "react-router-dom";

export const Register = () => {

    const navigate = useNavigate();

    return (
        <>
        <div class="register-container">
            <div>register bitch</div>
            <button type="button" class="btn btn-outline-dark" onClick={() => navigate("/")}>or go back</button>
        </div>
        </>
    );
}