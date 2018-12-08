// This file is just extracting the comments from comment array
// and sending it to CommentItem to display

import React, {Component} from 'react';
import ShortlistedItem from './ShortlistedItem';

class ShortlistFeed extends Component {
    render() {

        const {shortlist , postId} = this.props;

        return shortlist.map(short =>(
            <ShortlistedItem key={short._id} short={short} postId={postId} />
        ));
    }
}

export default ShortlistFeed;
