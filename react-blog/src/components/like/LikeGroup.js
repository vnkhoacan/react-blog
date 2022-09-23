import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import LikeService from "../../services/like.service";
import { useState } from "react";
const LikeGroup = ({isLiked, isLoggedIn, type, object}) => {
    const [liked, setLiked] = useState(isLiked)
    const [likeCount, setLikeCount] = useState(object.like_count)
    const handleLikePost = () => {
        LikeService.like({
            object_id: object.id,
            object_type: type
        }).then((data) => {
            setLiked(data.data.data.is_liked)
            setLikeCount(data.data.data.like_count)
        })
    }
    return (
        <div className="d-inline">
            {likeCount}
            <button 
                onClick={handleLikePost}
                className={`btn btn-sm ms-2 ${liked ? ` btn-primary` : ` btn-outline-primary`}`}
                disabled={!isLoggedIn}
            >
                <FontAwesomeIcon icon={faThumbsUp} className="me-2"/>like
            </button>
        </div>
    )
}

export default LikeGroup