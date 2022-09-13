import RegisterForm from "../components/form/RegisterForm";
import { connect } from "react-redux";
import { register } from "../actions/AuthActions";
import { Link } from "react-router-dom";

const Register = ({message, register}) => {

    const submit = (values) => {
        register(values)
    }

    return (
        <div className="container">
            <h1 className="text-center">REGISTER</h1>
            <div className="row justify-content-center">
                <div className="col-5">
                    <RegisterForm onSubmit={submit} message={message}/>
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
        register: (user) => dispatch(register(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)