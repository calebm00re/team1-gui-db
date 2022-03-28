// import '../Styles/Landing.css';
import { useNavigate } from "react-router-dom";
import landLogo from "../Assets/images/logo.png";

export const Landing = () => {

    const navigate = useNavigate();

    return (
        <>
            <div>
                {/* <div class="landing-center">
                    <h1>Babysitting Done Right</h1>
                </div> */}
                <div>
                    <img alt="Landing img" src={landLogo}></img>
                </div>
                {/* <div class="landing-center">
                    <h2>add nonsense about why you should use our app</h2>
                    <h2>screen shots of usefull features etc then scroll to buttons</h2>
                </div> */}
                <div class="landing-menu">
                    <button type="button" className="btn btn-block btn-outline-dark" onClick={() => navigate("/register")}>Register </button>
                    <button type="button" className="btn btn-block btn-outline-dark" onClick={() => navigate("/login")}>Login </button>
                </div>
            </div>
        </>
    );
}