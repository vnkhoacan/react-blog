import React, { useEffect } from 'react';
import { getAllPosts } from '../actions/PostActions';
import PostItem from '../components/post/PostItem';
import PostList from '../components/post/PostList';
import { connect } from "react-redux";

const Home = ({ posts, isFetchingPosts, getAllPosts }) => {
    const isEmpty = posts.length === 0

    useEffect(() => {
        getAllPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <>
            <PostList>
                { isEmpty
                ? (isFetchingPosts ? <p>Loading...</p> : <p>Empty</p>)
                : posts.map(post => 
                    <PostItem key={post.id} post={post}/>
                )}
            </PostList>
        </>
    )
}

const mapStateToProps = state => {
    return {
        posts: state.PostReducer.posts,
        isFetchingPosts: state.PostReducer.isFetchingPosts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllPosts: () => dispatch(getAllPosts()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)