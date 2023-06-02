import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import AuthService from '../services/auth.service';
import { toast } from 'react-toastify';

const Regist = () => {
    const navigate = useNavigate();
    
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .required('Name is required'),
            email: Yup.string()
                .required('Email is required')
                .email('Wrong email format'),
            password: Yup.string()
                .required('Password is required')
                .min(8, 'Password as least 8 label'),
            password_confirmation: Yup.string()
                .required('Password confirmation is required')
                .oneOf([Yup.ref('password'), null], 'Password confirmation must match with password'),
        }),
        onSubmit: values => {
            AuthService.register(values).then((response) => {
                toast.success(response.data.message)
                navigate('/login')
            }).catch(({response}) => {
                if (response.status === 422) {
                    formik.setErrors(response.data.errors)
                } else {
                    toast.error(response.data.message)
                }
            })
        },
    });

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    name="name"
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    helperText={formik.touched.name && formik.errors.name}
                                    error={formik.touched.name && formik.errors.name ? true : false}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    helperText={formik.touched.email && formik.errors.email}
                                    error={formik.touched.email && formik.errors.email ? true : false}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    helperText={formik.touched.password && formik.errors.password}
                                    error={formik.touched.password && formik.errors.password ? true : false}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password_confirmation"
                                    label="Password Confirmation"
                                    type="password"
                                    id="passwordConfirmation"
                                    autoComplete="new-password"
                                    value={formik.values.password_confirmation}
                                    onChange={formik.handleChange}
                                    helperText={formik.touched.password_confirmation && formik.errors.password_confirmation}
                                    error={formik.touched.password_confirmation && formik.errors.password_confirmation ? true : false}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                        Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to={'/login'} variant="body2">
                                Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default Regist