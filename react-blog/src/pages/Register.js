import RegisterForm from "../components/form/RegisterForm";
import { connect } from "react-redux";
import { register } from "../actions/AuthActions";
import { clearMessage } from "../actions/MessageActions";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Register = ({message, register, clearMessage}) => {
    const [successful, setSuccessful] = useState(false)
    const [loading, setLoading] = useState(false)
    const submit = (values) => {
        setLoading(true)
        register(values).then(() => {
            setSuccessful(true)
        }).catch(() => {
            setSuccessful(false)
        })
        setLoading(false)
    }
    useEffect(() => {
        return () => {
            clearMessage()
        }
    })

    return (
        <div className="container">
            <h1 className="text-center">REGISTER</h1>
            <div className="row justify-content-center">
                <div className="col-5">
                    <RegisterForm onSubmit={submit} message={message} successful={successful} loading={loading}/>
                    <Link to={'/login'}>Login now!</Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        message: state.message.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        register: (user) => dispatch(register(user)),
        clearMessage: () => dispatch(clearMessage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)