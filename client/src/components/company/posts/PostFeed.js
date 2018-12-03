import React, {Component} from 'react';
import PostItem from './PostItems';



// This file is just extracting the posts from post array
// and sending it to postItem to display

class PostFeed extends Component {


    render() {

        const {posts} = this.props;

        return  posts.map(post => <PostItem key={post._id} post={post}/>)
    }
}

export default PostFeed;
