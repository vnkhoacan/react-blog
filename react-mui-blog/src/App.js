import { Routes, Route } from 'react-router-dom';
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import Home from './pages/Home';
import Login from './pages/Login';
import ListPost from './pages/crud/ListPost';
import Regist from './pages/Regist';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthVerify from "./common/AuthVerify";
import { logout } from './actions/AuthActions';
import { connect } from "react-redux";

function App({logout}) {

  return (
    <div className="App">
      <Header/>
        <Routes>
          <Route path={'/'} element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='regist' element={<Regist/>}/>
          <Route path='posts' element={<ListPost/>}/>
        </Routes>
      <Footer/>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      <AuthVerify logOut={logout}/>

    </div>
  );
}

const mapStateToProps = state => {
  return state;
}

const mapDispatchToProps = dispatch => {
  return {
      logout: () => dispatch(logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
