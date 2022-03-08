import { useNavigate } from "react-router-dom";
export const Landing = () => {

    //buttons to take me to the register and login pages routes
    const navigate = useNavigate();

    // function goRegister() {
    //     navigate("/register");
    // }

    return (
        <>
            <div>Welcome to the landing page</div>
            <button onClick={() => navigate("/register")}>Register</button>
            <button onClick={() => navigate("/login")}>Login</button>

        </>
    );
}