import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { login } from "../actions/AuthActions";
import { connect } from "react-redux";
import { useEffect } from "react";

const Login = ({login}) => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            remember_me: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .required('Email is required'),
            password: Yup.string()
                .required('Password is required'),
        }),
        onSubmit: values => {
            login(values).then(() => {
                navigate('/')
            }).catch(() => {

            })
        }
    })

    useEffect(() => {
        let accessToken = localStorage.getItem("access_token")
        if (accessToken)
            navigate('/')
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Container component={"main"} maxWidth="xs">
                <CssBaseline/>
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={formik.handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            helperText={formik.touched.email && formik.errors.email}
                            error={formik.touched.email && formik.errors.email ? true : false}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            helperText={formik.touched.password && formik.errors.password}
                            error={formik.touched.password && formik.errors.password ? true : false}
                        />
                        <FormControlLabel
                            control={<Checkbox name="remember_me" value={formik.values.remember_me} onChange={formik.handleChange} color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to={'/regist'} variant="body2">
                                {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

const mapStateToProps = state => {
    return {
        message: state.message.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (user) => dispatch(login(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);