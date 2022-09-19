import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { BASE_URL } from '../constants';
const MyProfile = ({ user }) => {
    const navigate = useNavigate()
    useEffect(() => {
        if(!user) navigate('/') 
        // eslint-disable-next-line
    }, [])
    return (
        <section style={{backgroundColor: "#eee", height: "90vh"}}>
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card mb-4">
                            <div className="card-body text-center">
                                <img src={BASE_URL + "image/" + user.avatar} alt="avatar"
                                className="rounded-circle img-fluid"style={{width: "150px"}}/>
                                <h5 className="my-3">{user.name}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Name</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{user.name}</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Email</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{user.email}</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Phone</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{user.phone}</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Address</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{user.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps,null)(MyProfile)