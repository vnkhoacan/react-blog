import React from "react";
import { Field, reduxForm } from "redux-form";

const validate = values => {
    const errors = {}
    if(!values.title) {
        errors.title = 'Required'
    }
    if(!values.content) {
        errors.content = 'Required'
    }
    return errors
}

const renderField = ({ type, label, inputType, input, meta: { touched, error } }) => (
    <div className="mb-3">
        <label className="form-label">{label}</label>
        <br/>
        { inputType === "textarea"
        ? <textarea {...input} rows={5} className={`form-control ${touched && error && ` is-invalid`}`}/>
        : <input {...input} className={`form-control ${touched && error && ` is-invalid`}`} type={type}/>}
        {touched && error &&
        (
            <div className="invalid-feedback">
                {error}
            </div>
        )}
    </div>
)

const PostFormFunc = ({handleSubmit, isLoading, message, post}) => (
    <form onSubmit={handleSubmit}>
        { message &&
            <div className="alert alert-danger" role="alert">
            {message}
            </div> 
        }
        <Field name="title" label="Title" component={renderField} type="text"/>
        <Field name="content" label="Content" component={renderField} inputType="textarea"/>
        <button className="btn btn-primary" type="submit">
            {isLoading ? (
                <button class="btn btn-primary" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...
                </button>
            ) : post ? "Edit" : "Add"}
        </button>
    </form>
)

const PostForm = reduxForm({
    form: 'post',
    validate,
    enableReinitialize: true
})(PostFormFunc)

export default PostForm