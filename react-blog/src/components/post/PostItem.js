import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import moment from 'moment';

const PostItem = ({post}) => {
    return (
        <>
            <div className="card text-bg-light border-secondary mb-2">
                <div className="card-header">
                    <Link
                        className='display-1 fs-4 fw-bold d-block'
                        to={"/post/"+post.id}
                        style={{
                            color: "black",
                            textDecoration: "none"
                        }}
                    >
                        {post.title}
                    </Link>
                </div>
                <div className="card-body">
                    {post.like_count}<FontAwesomeIcon className='mx-1' icon={faThumbsUp}/>
                    {post.comment_count}<FontAwesomeIcon className='ms-1' icon={faComment}/>
                    <p className="mb-0">Created at {moment(post.created_at).format('HH:mm DD/MM/YYYY')}</p>
                </div>
            </div>
        </>
    )
}

export default PostItem