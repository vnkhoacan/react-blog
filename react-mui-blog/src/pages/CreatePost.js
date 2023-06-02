import { Box, Button, Chip, Container, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { getAllCategory } from "../actions/CategoryActions";
import { connect } from "react-redux";
import { useEffect } from "react";
import PostService from "../services/post.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreatePost = ({categories, getAllCategory}) => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
            categories: [],
        },
        validationSchema: Yup.object().shape({
            title: Yup.string()
                .required('Title is required'),
            content: Yup.string()
                .required('Content is required'),
        }),
        onSubmit: values => {
            PostService.create(values).then((response) => {
                toast.success('Tạo bài biết thành công')
                navigate('/')
            }).catch((error) => {
                toast.error(error)
            })
        }
    })

    useEffect(() => {
        getAllCategory();
        // eslint-disable-next-line
    }, [])

    return (
        <Container>
            <Box sx={{marginTop: 5}}>
                <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        placeholder="Tiêu đề bài viết..."
                        sx={{fontSize: "25px", marginBottom: 5}}
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        helperText={formik.touched.title && formik.errors.title}
                        error={formik.touched.title && formik.errors.title ? true : false}
                        name="title"
                    />
                    <CKEditor
                        config={{
                            ckfinder: {
                                // Upload the images to the server using the CKFinder QuickUpload command.
                                uploadUrl: 'https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json',
                            },
                            placeholder: "Nội dung bài viết",
                        }}
                        editor={ ClassicEditor }
                        placeholder="Type the content here!"
                        data={formik.values.content}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            formik.setFieldValue("content", data);
                        }}
                        name="content"
                    />
                    <Box sx={{marginTop: 5, marginBottom: 5 }}>
                        <FormControl sx={{width: 300 }}>
                            <InputLabel id="demo-multiple-chip-label">Danh mục</InputLabel>
                            <Select
                                placeholder="Chon danh muc"
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={formik.values.categories}
                                onChange={formik.handleChange}
                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value.id} label={value.name} />
                                    ))}
                                    </Box>
                                )}
                                name="categories"
                                >
                                {categories.map((category) => (
                                    <MenuItem
                                    key={category.id}
                                    value={category}
                                    >
                                    {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <Button
                            type="submit"
                            size="large"
                            variant="contained"
                        >Tạo</Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        categories: state.category.categories
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllCategory: () => dispatch(getAllCategory()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);