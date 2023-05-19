import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
    };

    const AuthVerify = (props) => {
    let location = useLocation();

    useEffect(() => {
        const accessToken = JSON.parse(localStorage.getItem("access_token"));

        if (accessToken) {
            const decodedJwt = parseJwt(accessToken);

            if (decodedJwt.exp * 1000 < Date.now()) {
                props.logOut();
            }
        }
    }, [location, props]);

    return ;
};

export default AuthVerify;