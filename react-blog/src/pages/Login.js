import { useState } from "react"
import { Link } from "react-router-dom";

const Login = () => {
    const initLogin = {
        email: '',
        password: '',
    }
    const [login, setLogin] = useState(initLogin)
    const handleChange = e => {
        const { name, value } = e.target;
        setLogin(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    return (
        <>
            <div className="container">
                <h2 className="text-center mt-5 mb-5">LOGIN</h2>
                <div className="row justify-content-center">
                    <div className="col-5">
                        <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <input
                                type="email" 
                                className="form-control"
                                value={login.email}
                                onChange={handleChange}
                                name="email"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                value={login.password}
                                onChange={handleChange}
                                name="password"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                        <Link className="d-block" to={'/register'}>Register new account</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login