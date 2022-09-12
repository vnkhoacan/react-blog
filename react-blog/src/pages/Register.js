import { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../actions/AuthActions";

const Register = () => {
    const initRegister = {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    }
    const [register, setRegister] = useState(initRegister)
    const handleChange = e => {
        const { name, value } = e.target;
        setRegister(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = () => {
        console.log('oke')
    }

    return (
        <>
            <div className="container">
                <h2 className="text-center mt-5 mb-5">REGISTER</h2>
                <div className="row justify-content-center">
                    <div className="col-5">
                        <div className="mb-3">
                            <label className="form-label">Name:</label>
                            <input
                                type="text" 
                                className="form-control"
                                value={register.name}
                                onChange={handleChange}
                                name="name"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <input
                                type="email" 
                                className="form-control"
                                value={register.email}
                                onChange={handleChange}
                                name="email"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                value={register.password}
                                onChange={handleChange}
                                name="password"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Comfirm Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                value={register.password_confirmation}
                                onChange={handleChange}
                                name="password_confirmation"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Sign up</button>
                        <Link className="d-block" to={'/login'}>Login now</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        register: (user) => dispatch(register(user))
    }
}

export default connect(null, mapDispatchToProps)(Register)