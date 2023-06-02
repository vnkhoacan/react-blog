import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../actions/PostActions";
import { connect } from "react-redux";
import { Avatar, Box, Button, Container, Input, Typography } from "@mui/material";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";
import { URL_MEDIA } from "../config";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';

const DetailPost = ({post, getPost}) => {
    let { postId } = useParams();

    useEffect(() => {
        getPost(postId);
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Container
            maxWidth={"md"}
            >
                {Object.keys(post).length == 0
                ? (
                    <Box>

                    </Box>
                )
                : (
                    <Box
                    sx={{
                        width: "100%"
                    }}
                    >
                        <Typography
                            variant="h3"
                            children={post.title}
                            sx={{
                                marginBottom: 3
                            }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}
                            >
                                <Avatar
                                    src={URL_MEDIA + post.author.avatar}
                                />
                                <Typography
                                    variant="label"
                                    children={post.author.name}
                                    sx={{
                                        marginLeft: 1,
                                    }}
                                />
                            </Box>
                            <Box>
                                <MoreVertIcon/>
                            </Box>
                        </Box>
                        <Box
                        sx={{
                            fontSize: 22,
                            "& img": {
                                maxWidth: "100%"
                            }
                        }}
                        >
                            <ReactMarkdown
                                children={post.content}
                                rehypePlugins={[rehypeRaw]}
                            />
                            <Box
                            >
                                <Button size="small" variant={post.isLike ? "contained" : "outlined"}>like</Button>
                            </Box>
                            <Box
                            sx={{
                                marginTop: 2,
                                marginBottom: 2,
                            }}
                            >
                                <Input
                                placeholder="Hãy để lại ý kiến"
                                fullWidth
                                sx={{
                                    marginBottom: 2,
                                }}
                                />
                                <Button
                                variant="contained"
                                size="small"
                                >Gửi</Button>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Container>
            <Box
            sx={{
                position: "fixed",
                left: "calc((100% - 650px) / 2 - 14vw)",
                top: "20%",
                width: "6rem",
                flexDirection: "column",
                alignItems: "center",
                zIndex: 99,
            }}
            >
                <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "0.6rem",
                }}
                >
                    <ChangeHistoryIcon
                        sx={{
                            marginBottom: 2,
                        }}
                    />
                    <Typography
                        sx={{
                            marginBottom: 2,
                        }}
                    >
                    {post.like_count}
                    </Typography>
                    <Avatar
                        src=""
                        sx={{
                            marginBottom: 2,
                        }}
                    />
                </Box>
                <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "0.6rem",
                }}
                >
                    <BookmarkBorderOutlinedIcon
                        sx={{
                            marginBottom: 2,
                        }}
                    />
                    <ChatBubbleOutlineOutlinedIcon
                        sx={{
                            marginBottom: 2,
                        }}
                    />
                </Box>
            </Box>
        </>
    )
}

const mapStateToProps = state => {
    return {
        post: state.post.post,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPost: (postId) => dispatch(getPost(postId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPost);