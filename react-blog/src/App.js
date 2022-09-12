import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import MyPosts from './pages/MyPosts';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div>
      <BrowserRouter>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to={'/'}>BLOG</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to={'/'}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/my-posts'}>My Posts</Link>
              </li>
            </ul>
          </div>
          <div className='d-flex'>
            <Link className='btn btn-primary' to={'/login'}>Login</Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/my-posts'} element={<MyPosts/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/register'} element={<Register/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
