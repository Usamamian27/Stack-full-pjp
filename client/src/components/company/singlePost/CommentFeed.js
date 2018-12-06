// This file is just extracting the comments from comment array
// and sending it to CommentItem to display

import React, {Component} from 'react';
import CommentItem from './CommentItem';

class CommentFeed extends Component {
    render() {

        const {applied , postId} = this.props;

        return applied.map(apply =>(
            <CommentItem key={apply._id} apply={apply} postId={postId} />
        ));
    }
}

export default CommentFeed;
