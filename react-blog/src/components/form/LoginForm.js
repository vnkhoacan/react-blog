import React from "react";
import { Field, reduxForm } from "redux-form";

const validate = values => {
    const errors = {}
    if(!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if(!values.password) {
        errors.password = 'Required'
    }
    return errors
}

const renderField = ({ type, label, input, meta: { touched, error } }) => (
    <div className="mb-3">
        <label className="form-label">{label}</label>
        <br/>
        <input {...input} className="form-control" type={type}/>
        {touched && error &&
        (
            <div className="alert alert-danger p-1 mb-0" role="alert">
            {error}
            </div>
        )}
    </div>
)

const LoginFormFunc = ({handleSubmit, loading, message}) => (
    <form onSubmit={handleSubmit}>
        { message &&
            <div className="alert alert-danger" role="alert">
            {message}
            </div>
        }
        <Field name="email" label="Email" component={renderField} type="email"/>
        <Field name="password" label="Password" component={renderField} type="password"/>
        <button className="btn btn-primary" type="submit">{loading ? "Loading..." : "Login"}</button>
    </form>
)

const LoginForm = reduxForm({
    form:'login',
    validate
})(LoginFormFunc)

export default LoginForm