import React from "react";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { connect } from 'react-redux';
import SubmitButton from "../button/SubmitButton";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
        ?   <CKEditor
                config={{ckfinder: {
                    // Upload the images to the server using the CKFinder QuickUpload command.
                    uploadUrl: 'https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json',
                }}}
                className={`form-control ${touched && error && ` is-invalid`}`}
                data={input.value}
                editor={ ClassicEditor }
                onChange={(event, editor) => {
                        return input.onChange(editor.getData())
                    }
                }
            />
        : <input {...input} className={`form-control ${touched && error && ` is-invalid`}`} type={type}/>}
        {touched && error &&
        (
            <div className="invalid-feedback">
                {error}
            </div>
        )}
    </div>
)

const PostFormFunc = ({title, content, handleSubmit, isLoading, message, isEdit}) => (
    <form onSubmit={handleSubmit}>
        { message &&
            <div className="alert alert-danger" role="alert">
            {message}
            </div> 
        }
        <Field name="title" label="Title" component={renderField} type="text"/>
        <Field name="content" label="Content" component={renderField} inputType="textarea"/>
        <SubmitButton isLoading={isLoading} disabled={title && content ? false : true}>
            {isEdit ? "Edit" : "Add"}
        </SubmitButton>
    </form>
)

let PostForm = reduxForm({
    form: 'post',
    validate,
    enableReinitialize: true
})(PostFormFunc)

const selector = formValueSelector('post')
PostForm = connect(
    state => {
        const title = selector(state, 'title')
        const content = selector(state, 'content')
        return {
            title,
            content
        }
    }
)(PostForm)

export default PostForm