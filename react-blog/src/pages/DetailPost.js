import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import PostService from "../services/post.service";
import CommentService from "../services/comment.service";
import CommonSprinner from "../components/sprinners/CommonSprinner";
import PostBreadcrumb from "../components/breadcrumb/PostBreadcrumb";
import LikeGroup from "../components/like/LikeGroup";
import CommentList from "../components/comment/CommentList";
import CommentItem from "../components/comment/CommentItem";
import { LIKE_TYPE } from "../constants";
import CommentForm from "../components/form/CommentForm";

const DetailPost = ({ user }) => {
    let { id } = useParams()
    const isLoggedIn = user ? true : false
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
            user && postData.likes.includes(user.id) && setIsLiked(true)
            setLoading(false)
        })
    }
    const handleAddComment = (path, content) => {
        CommentService.create({
            path: path,
            post_id: post.id,
            content: content
        }).then((data) => {
            setComments([
                data.data.data,
                ...comments,
            ])
        }).catch((error) => {
            console.log(error)
        })
    }
    const handleDeleteComment = (id) => {
        CommentService.destroy(id).then(() => {
            let updateComments = comments
            let deletedComment = updateComments.find(x => x.id === id)
            updateComments = updateComments.filter(
                (comment) => !(comment.id === id || comment.path.includes(deletedComment.path + ".")))
            setComments([
                ...updateComments
            ])
        }) 
    }
    useEffect(() => {
        fetchPost()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="container">
        {loading
        ? <CommonSprinner/>
        : ( <div>
                <h1 className="text-break ">{post.title}</h1>
                <PostBreadcrumb author={author} post={post}/>
                <hr/>
                <div dangerouslySetInnerHTML={{__html: post.content}}></div>
                <hr/>
                <LikeGroup object={post} isLiked={isLiked} isLoggedIn={isLoggedIn} type={LIKE_TYPE.post}/>
                <hr/>
                <h3>COMMENTS</h3>
                { isLoggedIn && <CommentForm path="" handleAddComment={handleAddComment}/>}
                <CommentList>
                { comments.length > 0
                && comments.map((comment) => {
                    if(!comment.path.includes(".")) {
                        return (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                isLiked={user && comment.likes.includes(user.id)}
                                user={user}
                                handleAddComment={handleAddComment}
                                handleDeleteComment={handleDeleteComment}
                            >
                            { comments.map((c) => {
                                if(c.path.includes(comment.path + ".")) {
                                    return (
                                        <CommentItem
                                            key={c.id}
                                            comment={c}
                                            isLiked={user && c.likes.includes(user.id)}
                                            user={user}
                                            handleDeleteComment={handleDeleteComment}
                                        />
                                    )
                                } else {
                                    return ""
                                } 
                            })}
                            </CommentItem>
                        )
                    } else {
                        return ""
                    }
                })}
                </CommentList>
            </div>
        )}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, null)(DetailPost)