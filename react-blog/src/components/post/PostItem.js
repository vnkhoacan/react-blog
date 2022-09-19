import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const PostItem = ({post}) => {
    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <Link className='fs-5 fw-bold d-block' to={"/post/"+post.id}>{post.title}</Link>
                    {post.like_count}<FontAwesomeIcon className='mx-1' icon={faThumbsUp}/>
                    {post.comment_count}<FontAwesomeIcon className='ms-1' icon={faComment}/>
                    <p className="mb-0">Created at {post.created_at}</p>
                </div>
            </div>
        </>
    )
}

export default PostItem