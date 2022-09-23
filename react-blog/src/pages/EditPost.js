import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/form/PostForm";
import PostService from "../services/post.service";
const EditPost = () => {
    let { id } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage]= useState('')
    const submit = (values) => {
        setIsLoading(true)
        PostService.update(values, id).then(() => {
            navigate('/my-posts')
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
        PostService.getOne(id).then((data) => {
            setPost(data.data.data.post)
        })
        // eslint-disable-next-line
    }, [])
    return (
        <div className="container">
            <h1>Edit Post</h1>
            <PostForm 
                onSubmit={submit}
                initialValues={{title: post.title, content: post.content}}
                isLoading={isLoading}
                message={message}
                isEdit={true}
            />
        </div>
    )
}

export default EditPost