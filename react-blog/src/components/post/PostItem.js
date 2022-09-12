import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons'

const PostItem = ({post}) => {
    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <h5>{post.title}</h5>
                    {post.like_count}<FontAwesomeIcon className='mx-1' icon={faThumbsUp}/>
                    {post.comment_count}<FontAwesomeIcon className='ms-1' icon={faComment}/>
                    <p className="mb-0">Created at {post.created_at}</p>
                </div>
            </div>
        </>
    )
}

export default PostItem