import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/form/PostForm";
import PostService from "../services/post.service";
import { connect } from "react-redux";
const AddPost = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage]= useState('')
    const submit = (values) => {
        setIsLoading(true)
        PostService.create(values).then(() => {
            navigate("/my-posts")
        }).catch((error) => {
            setMessage((
                error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString())
        })
        setIsLoading(false)
    }
    useEffect(() => {
        let user = localStorage.getItem("user")
        if(!user) navigate('/')
        // eslint-disable-next-line
    }, [])
    return (
        <div className="container">
            <h1 className="text-center">New Post</h1>
            <PostForm
                onSubmit={submit}
                isLoading={isLoading}
                message={message}
            />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        message: state.message.message
    }
}

export default connect(mapStateToProps, null)(AddPost)