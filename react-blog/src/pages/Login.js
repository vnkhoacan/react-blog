import { Link } from "react-router-dom";
import LoginForm from "../components/form/LoginForm";
import { login } from "../actions/AuthActions";
import { clearMessage } from "../actions/MessageActions";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

const Login = ({message, login, clearMessage}) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const submit = (values) => {
        setIsLoading(true)
        login(values).then(() => {
            navigate('/')
        }).catch(() => {
            setIsLoading(false)
        })
    }
    useEffect(() => {
        let user = localStorage.getItem("user")
        if(user) navigate('/')
        return () => {
            clearMessage()
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="container">
                <h2 className="text-center mt-5 mb-5">LOGIN</h2>
                <div className="row justify-content-center">
                    <div className="col-5">
                        <LoginForm onSubmit={submit} isLoading={isLoading} message={message}/>
                        <Link className="d-block" to={'/register'}>Register new account</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        message: state.message.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (user) => dispatch(login(user)),
        clearMessage: () => dispatch(clearMessage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)