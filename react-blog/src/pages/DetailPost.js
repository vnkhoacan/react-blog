import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { connect } from "react-redux"
import { getPost } from "../actions/PostActions"
import moment from 'moment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faUser, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"
import PostService from "../services/post.service"
import { BASE_URL } from "../constants"

const DetailPost = ({ user, getPost }) => {
    let { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [ post, setPost ] = useState({})
    const [ author, setAuthor ] = useState({})
    const [ isLiked, setIsLiked] = useState(false)
    const [ comments, setComments] = useState([])

    const fetchPost = () => {
        setLoading(true)
        PostService.getOne(id).then((data) => {
            let postData = data.data.data
            setPost(postData.post)
            setAuthor(postData.author)
            setComments(postData.comments)
            postData.likes.includes(user.id) && setIsLiked(true)
            setLoading(false)
        })
    }
    useEffect( () => {
        fetchPost()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {
                loading
                ? <p>Loading....</p>
                : (
                    <div className="container">
                        <h1 className="display-1">{post.title}</h1>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <FontAwesomeIcon icon={faUser} className="me-2"/>
                                    <Link to={"/profile" + author.id}>{author.name}</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <FontAwesomeIcon icon={faCalendar} className="me-2"/>
                                    <p className="d-inline">{moment(post.created_at).format('DD/MM/YYYY HH:mm')}</p>
                                </li>
                            </ol>
                        </nav>
                        <hr/>
                        <p>{post.content}</p>
                        <hr/>
                        <div>
                            {post.like_count}
                            <button className={isLiked ? ' btn btn-sm ms-2 btn-primary' : ' btn btn-sm ms-2 btn-outline-primary'}>
                                <FontAwesomeIcon icon={faThumbsUp} className="me-2"/>like
                            </button>
                        </div>
                        <hr/>
                        <div>
                            <h3>COMMENTS</h3>
                            <div>
                                <textarea className="form-control mb-1" rows={2}></textarea>
                                <button className="btn btn-primary">Comment</button>
                            </div>
                            <div className="mt-4">
                                { comments.length > 0
                                    && comments.map((comment) => {
                                        if(!comment.path.includes(".")) {
                                            return (
                                                <div key={comment.id} className="d-flex mb-3">
                                                    <div className="me-3">
                                                        <img className="rounded-circle" height="30" alt="avatar" src={BASE_URL+ "image/" + comment.user.avatar}/>
                                                    </div>
                                                    <div className="flex-fill">
                                                        <div className="mb-3">
                                                            <p className="fs-6 fw-bold mb-0">{comment.user.name}</p>
                                                            <p className="mb-1">{comment.content}</p>
                                                            <button className={comment.likes.includes(user.id) ? "btn btn-sm btn-primary" : "btn btn-sm btn-outline-primary"}>
                                                                <FontAwesomeIcon icon={faThumbsUp} className="me-2"/>like
                                                            </button>
                                                        </div>
                                                        { comments.map((c) => {
                                                            if(c.path.includes(comment.id + ".")) {
                                                                return (
                                                                    <div key={c.id}>
                                                                        <hr/>
                                                                        <div className="d-flex">
                                                                            <div className="me-3">
                                                                                <img className="rounded-circle" height="30" alt="avatar" src={BASE_URL+ "image/" + c.user.avatar}/>
                                                                            </div>
                                                                            <div className="mb-3 flex-fill">
                                                                                <p className="fs-6 fw-bold mb-0">{c.user.name}</p>
                                                                                <p className="mb-1">{c.content}</p>
                                                                                <button className={c.likes.includes(user.id) ? "btn btn-sm btn-primary" : "btn btn-sm btn-outline-primary"}>
                                                                                    <FontAwesomeIcon icon={faThumbsUp} className="me-2"/>like
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            } else {
                                                                return ""
                                                            } 
                                                        })}
                                                        <hr/>
                                                    </div>
                                                </div>
                                            )
                                        } else {
                                            return ""
                                        }
                                    })}
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPost: (id) => dispatch(getPost(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPost)