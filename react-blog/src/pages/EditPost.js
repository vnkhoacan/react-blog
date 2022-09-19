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
        console.log(values)
        setIsLoading(false)
    }
    useEffect(() => {
        let user = localStorage.getItem("user")
        if(!user) navigate('/')
        PostService.getOne(id).then((data) => {
            setPost(data.data.data.post)
        })
    }, [])
    return (
        <div className="container">
            <h1>Edit Post</h1>
            <PostForm onSubmit={submit} initialValues={{title: post.title, content: post.content}}/>
        </div>
    )
}

export default EditPost