import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileContent from '../components/profile/ProfileContent';
const MyProfile = ({ user }) => {
    const navigate = useNavigate()
    useEffect(() => {
        if(!user) navigate('/') 
        // eslint-disable-next-line
    }, [])
    return (
        <div style={{backgroundColor: "#eee", height: "90vh"}}>
            <div className='container'>
                <ProfileContent user={user}/>
                <button className='btn btn-primary float-end'>
                    <FontAwesomeIcon icon={faPenToSquare} className="me-2"/>
                    Edit
                </button>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps,null)(MyProfile)