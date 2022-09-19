import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MyPosts from './pages/MyPosts';
import Login from './pages/Login';
import Register from './pages/Register';
import MyProfile from './pages/MyProfile';
import Navbar from './layouts/Navbar';
import DetailPost from './pages/DetailPost';
import AddPost from './pages/AddPost';
import EditPost from './pages/EditPost';

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/my-posts'} element={<MyPosts/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/register'} element={<Register/>}/>
        <Route path={'/my-profile'} element={<MyProfile/>}/>
        <Route path={'/post/add'} element={<AddPost/>}/>
        <Route path={'/post/edit/:id'} element={<EditPost/>}/>
        <Route path={'/post/:id'} element={<DetailPost/>}/>
      </Routes>
    </div>
  );
}

export default App;
