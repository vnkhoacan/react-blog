import React, { useEffect } from 'react';
import { getAllPosts } from '../actions/PostActions';
import PostItem from '../components/post/PostItem';
import PostList from '../components/post/PostList';
import { connect } from "react-redux";
import CommonSprinner from '../components/sprinners/CommonSprinner';

const Home = ({ posts, isFetchingPosts, getAllPosts }) => {
    const isEmpty = posts.length === 0

    useEffect(() => {
        getAllPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <>
            <h1 className='text-center'>LIST POSTS</h1>
            <PostList>
                { isEmpty
                ? (isFetchingPosts
                    ? <CommonSprinner/>
                    : <p className="mb-0 text-center fw-bold">Empty</p> )
                : posts.map(post => 
                    <PostItem key={post.id} post={post}/>
                )}
            </PostList>
        </>
    )
}

const mapStateToProps = state => {
    return {
        posts: state.post.posts,
        isFetchingPosts: state.post.isFetchingPosts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllPosts: () => dispatch(getAllPosts()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)