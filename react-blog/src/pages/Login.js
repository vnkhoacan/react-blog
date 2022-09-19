import { Link } from "react-router-dom";
import LoginForm from "../components/form/LoginForm";
import { login } from "../actions/AuthActions";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

const Login = ({message, login}) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const submit = (values) => {
        setLoading(true)
        login(values).then(() => {
            navigate('/')
        }).catch(() => {
            setLoading(false)
        })
    }
    useEffect(() => {
        let user = localStorage.getItem("user")
        if(user) navigate('/')
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="container">
                <h2 className="text-center mt-5 mb-5">LOGIN</h2>
                <div className="row justify-content-center">
                    <div className="col-5">
                        <LoginForm onSubmit={submit} loading={loading} message={message}/>
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
        login: (user) => dispatch(login(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)