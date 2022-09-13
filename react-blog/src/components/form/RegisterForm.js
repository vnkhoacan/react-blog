import React from "react";
import { Field, reduxForm } from "redux-form";

const validate = values => {
    const errors = {}
    if(!values.name) {
        errors.name = 'Required'
    }
    if(!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if(!values.password) {
        errors.password = 'Required'
    } else if(values.password.length < 8) {
        errors.password = 'Must be more than 8 letter'
    }

    if(!values.password_confirmation) {
        errors.password_confirmation = 'Required'
    } else if (values.password !== values.password_confirmation) {
        errors.password_confirmation = 'Must same as password'
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

const RegisterFormFunc = ({ handleSubmit, message }) => (
    <form onSubmit={handleSubmit}>
        { message &&
            <div className="alert alert-success" role="alert">
            {message}
            </div>
        }
        <Field name="name" label="Name" component={renderField} type="text"/>
        <Field name="email" label="Email" component={renderField} type="email"/>
        <Field name="password" label="Password" component={renderField} type="password"/>
        <Field name="password_confirmation" label="Confirm Password" component={renderField} type="password"/>
        <button className="btn btn-primary" type="submit">Register</button>
    </form>
)

const RegisterForm = reduxForm({
    form: 'register',
    validate
})(RegisterFormFunc)

export default RegisterForm