import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import FaceIcon from '@mui/icons-material/Face';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, logout } from "../actions/AuthActions";
import { connect } from "react-redux";
import { useEffect, useState } from 'react';
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import * as React from 'react';

const Header = ({ user, getUser, logout }) => {
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            getUser();
        }
        // eslint-disable-next-line
    }, [])

    return (
        <AppBar position="static" color="transparent">
            <Container>
                <Toolbar disableGutters>
                    <FaceIcon sx={{ mr: 1 }} color='primary'/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                    BLOG
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex'}}}>
                        <Button
                            key='Home'
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Home
                        </Button>
                        <Button
                            key='About'
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            About
                        </Button>
                        <Button
                            component={ Link }
                            to='/posts'
                            key='Posts'
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Posts
                        </Button>
                    </Box>
                    {
                        user
                        ? (
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem key={'profile'}>
                                        <Typography textAlign="center">Profile</Typography>
                                    </MenuItem>
                                    <MenuItem key={'logout'} onClick={handleLogout}>
                                        <Typography textAlign="center">Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        )
                        : (
                            <Box sx={{ flexGrow: 0 }}>
                                <Button
                                    component={ Link }
                                    to='/regist'
                                    color="primary"
                                    size="medium"
                                >sign up
                                </Button>
                                <Button
                                    component={ Link }
                                    to='/login'
                                    color="primary"
                                    size="medium"
                                    variant="contained"
                                >Sign in
                                </Button>
                            </Box>
                        )
                    }
                </Toolbar>
            </Container>
        </AppBar>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);