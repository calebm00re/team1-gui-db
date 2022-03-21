import '../Styles/Landing.css';
import { useNavigate } from "react-router-dom";
import landLogo from "../Assets/landLogo.png";

export const Landing = () => {

    const navigate = useNavigate();

    return (
        <>
            <div class="landing-container">
                {/* <div class="landing-center">
                    <h1>Babysitting Done Right</h1>
                </div> */}
                <div class="landing-center">
                    <img class="landing-img" alt="Landing img" src={landLogo}></img>
                </div>
                {/* <div class="landing-center">
                    <h2>add nonsense about why you should use our app</h2>
                    <h2>screen shots of usefull features etc then scroll to buttons</h2>
                </div> */}
                <div class="landing-menu">
                    <button type="button" class="btn btn-block btn-outline-dark" onClick={() => navigate("/register")}>Register </button>
                    <button type="button" class="btn btn-block btn-outline-dark" onClick={() => navigate("/login")}>Login </button>
                </div>
            </div>
        </>
    );
}