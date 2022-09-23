import { Link, useNavigate } from "react-router-dom"
import { connect } from "react-redux"
import { useEffect } from "react"
import { getUser, logout } from "../actions/AuthActions"
import { BASE_URL } from "../constants"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faHouseUser} from "@fortawesome/free-solid-svg-icons";
const Header = ({ user, getUser, logout }) => {
    const navigate = useNavigate()
    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    useEffect(() => {
        getUser()
        // eslint-disable-next-line
    }, [])
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
            <Link className="navbar-brand" to={'/'}>BLOG</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to={'/'} title="Home">
                        <FontAwesomeIcon icon={faHouse} size="xl"/>
                    </Link>
                </li>
                { user
                && (
                    <li className="nav-item">
                        <Link className="nav-link" to={'/my-posts'} title="My Posts">
                            <FontAwesomeIcon icon={faHouseUser} size="xl"/>
                        </Link>
                    </li>
                )
                }
                </ul>
            </div>
            <div className='d-flex'>
                {
                    user 
                    ? (
                        <div className="nav-item dropdown">
                            <button className="btn btn-light dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown" aria-expanded="false">
                                <img className="rounded-circle" height="22" alt="avatar" src={BASE_URL+ "image/" + user.avatar}/>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><p className="dropdown-item-text fw-bold fs-6">{user.name}</p></li>
                                <li><Link className="dropdown-item" to={'/my-profile'}>Profile</Link></li>
                                <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                            </ul>
                        </div>
                        
                    )
                    : (<Link className='btn btn-primary' to={'/login'}>Login</Link>)
                }  
            </div>
            </div>
        </nav>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUser: () => dispatch(getUser()),
        logout: () => dispatch(logout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header)