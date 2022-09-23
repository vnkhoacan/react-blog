import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MyPosts from './pages/MyPosts';
import Login from './pages/Login';
import Register from './pages/Register';
import MyProfile from './pages/MyProfile';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import DetailPost from './pages/DetailPost';
import AddPost from './pages/AddPost';
import EditPost from './pages/EditPost';
import Profile from './pages/Profile';

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/my-posts'} element={<MyPosts/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/register'} element={<Register/>}/>
        <Route path={'/my-profile'} element={<MyProfile/>}/>
        <Route path={'/profile/:id'} element={<Profile/>}/>
        <Route path={'/post/add'} element={<AddPost/>}/>
        <Route path={'/post/edit/:id'} element={<EditPost/>}/>
        <Route path={'/post/:id'} element={<DetailPost/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
