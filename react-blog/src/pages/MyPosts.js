import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faEye, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../services/post.service";
import { Link } from "react-router-dom";
import moment from 'moment';
const MyPosts = ({ user }) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const handleDelete = (id) => {
        PostService.destroy(id).then(() => {
            setPosts(
                posts.filter((post) => post.id !== id)
            )
        })
    }
    useEffect(() => {
        if( user ) {
            setIsLoading(true)
            PostService.getMy().then((data) => {
                setPosts(data.data.data)
                setIsLoading(false)
            })
        } else {
            navigate("/")
        }
        // eslint-disable-next-line
    }, [])
    return (
        <div className="container">
            <h1 className="text-center">My Posts</h1>
            <Link className="btn btn-primary mb-3" to={'/post/add'}>
                <FontAwesomeIcon icon={faSquarePlus} className="me-2"/>
                New post
            </Link>
            <table className="table table-striped table-hover table-bordered align-middle">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Content</th>
                        <th scope="col">Created at</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    { isLoading 
                    ?   <tr><td colSpan={5}>
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </td></tr>
                    : !posts
                        ? <tr><td colSpan={5}>Empty</td></tr>
                        : posts.map((post) => (
                            <tr key={post.id}>
                                <th scope="row">{post.id}</th>
                                <td>{post.title}</td>
                                <td className="text-truncate" style={{maxWidth:"250px"}}>{post.content}</td>
                                <td>{moment(post.created_at).format('DD/MM/YYYY HH:mm')}</td>
                                <td>
                                    <Link className="btn btn-success me-2" to={"/post/"+post.id}>
                                        <FontAwesomeIcon icon={faEye}/>
                                    </Link>
                                    <Link className="btn btn-primary me-2" to={"/post/edit/"+post.id}>
                                        <FontAwesomeIcon icon={faPenToSquare}/>
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => handleDelete(post.id)}><FontAwesomeIcon icon={faTrash}/></button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, null)(MyPosts)