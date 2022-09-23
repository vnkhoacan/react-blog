import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faUser } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';
const PostBreadcrumb = ({author, post}) => {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <FontAwesomeIcon icon={faUser} className="me-2"/>
                    <Link to={"/profile/" + author.id}>{author.name}</Link>
                </li>
                <li className="breadcrumb-item">
                    <FontAwesomeIcon icon={faCalendar} className="me-2"/>
                    <p className="d-inline">{moment(post.created_at).format('DD/MM/YYYY HH:mm')}</p>
                </li>
            </ol>
        </nav>
    )
}

export default PostBreadcrumb