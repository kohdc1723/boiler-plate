import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { useNavigate } from 'react-router-dom';

const Auth = function(SpecifiedComponent, option, adminRoute = null) {
    function AuthenticationCheck() {
        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response);

                if (!response.payload.isAuth) {
                    if (option) {
                        navigate("/login");
                        console.log("need to login");
                    }
                } else {
                    if (adminRoute && !response.payload.isAdmin) {
                        navigate("/");
                        console.log("you are not admin");
                    } else {
                        if (!option) {
                            navigate("/");
                            console.log("login user cannot access");
                        }
                    }
                }
            });
        }, [])

        return <SpecifiedComponent />;
    }

    return AuthenticationCheck;
}

export default Auth;