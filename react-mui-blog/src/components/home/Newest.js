import { useEffect } from "react";
import { getAllPosts } from "../../actions/PostActions";
import { connect } from "react-redux";
import { Avatar, Box, Skeleton, Typography } from "@mui/material";
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from "react-router-dom";

const Newest = ({posts, isFetching, getAllPosts}) => {
    let navigate = useNavigate();

    const handleRedirectDetail = (id) => {
        navigate('post/' + id)
    }

    useEffect(() => {
        getAllPosts();
        // eslint-disable-next-line
    }, [])

    return (
        <Box sx={{width: "100%"}}>
            {isFetching
                ? (
                    <Box>
                        <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                        <Skeleton variant="rectangular" height={60} />
                    </Box>
                )
                : (
                    posts && posts.length > 0 && posts.map(post => {
                        return (
                            <Box key={post.id}>
                                <Grid container spacing={3}>
                                    <Grid xs={4} sx={{height: 150}}>
                                        <Box
                                        sx={{
                                            height: "100%",
                                            width: "100%",
                                            border: 1,
                                            borderRadius: 1,
                                            cursor: "pointer"
                                        }}
                                        onClick={() => handleRedirectDetail(post.id)}
                                        >
                                            <img
                                            style={{ height: "100%", width: "100%", objectFit: "cover"}}
                                            alt={post.title}
                                            src="http://127.0.0.1:8000/images/test.jpg"
                                            loading="lazy"
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid xs={8}>
                                        <Typography
                                            variant="h6"
                                            fontWeight={700}
                                            onClick={() => handleRedirectDetail(post.id)}
                                            sx={{
                                                cursor: "pointer"
                                            }}
                                        >{post.title}</Typography>
                                        <Typography variant="body2" noWrap gutterBottom>
                                        </Typography>
                                        <Box sx={{display: "flex"}} justifyContent={"space-between"} flexDirection={"row"}>
                                            <Box alignItems={"center"} sx={{display: "flex"}} >
                                                <Avatar alt="author" src="" sx={{marginRight: 1}}/>
                                                <Typography variant="label" fontWeight={700}>
                                                    {post.author.name}
                                                </Typography>
                                            </Box>
                                            <Box sx={{display: "flex"}} alignItems={"center"}>
                                                <ChangeHistoryIcon fontSize="small" color="disabled" sx={{marginRight: "2px"}}/>
                                                <Typography fontSize="small" sx={{marginRight: 1}}>{post.like_count}</Typography>
                                                <MessageOutlinedIcon fontSize="small" color="disabled" sx={{marginRight: "2px"}}/>
                                                <Typography fontSize="small">{post.comment_count}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        )
                    })
                )
            }
        </Box>
    )
}

const mapStateToProps = state => {
    return {
        posts: state.post.posts,
        isFetching: state.post.isFetching,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllPosts: () => dispatch(getAllPosts()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Newest);