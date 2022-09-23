import { BASE_URL } from "../../constants";
import LikeGroup from "../like/LikeGroup";
import CommentForm from "../form/CommentForm";
import { LIKE_TYPE } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const CommentItem = ({comment, isLiked, user, children, handleAddComment, handleDeleteComment}) => {
    const [toggleReply, setToggleReply] = useState(false)
    const handleToggleReply = () => {
        toggleReply 
            ? setToggleReply(false)
            : setToggleReply(true)
    }
    return (
        <div className="d-flex mt-3">
            <div className="me-3">
                <img className="rounded-circle" height="30" alt="avatar" src={BASE_URL+ "image/" + comment.user.avatar}/>
            </div>
            <div className="flex-fill">
                <div>
                    <p className="fs-6 fw-bold mb-0">{comment.user.name}</p>
                    <p className="mb-1">{comment.content}</p>
                    <LikeGroup isLoggedIn={user ? true : false} object={comment} isLiked={isLiked} type={LIKE_TYPE.comment}/>
                    { children && user && (
                        <button className="btn btn-primary btn-sm ms-2" onClick={handleToggleReply}>
                            <FontAwesomeIcon className="me-2" icon={faReply}/>
                            Reply
                        </button>
                    )}
                    { user && (comment.user_id === user.id) && (
                        <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDeleteComment(comment.id)}>
                            <FontAwesomeIcon icon={faTrash}/>
                        </button>
                    )}
                    { toggleReply && (
                        <CommentForm path={comment.path} handleAddComment={(path, content) => handleAddComment(path, content)}/>
                    )}
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentItem