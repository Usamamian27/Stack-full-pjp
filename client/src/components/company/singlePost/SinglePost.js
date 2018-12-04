import React, {Component} from 'react';
import {connect}    from 'react-redux';
import {Link} from 'react-router-dom';
import Spinner from '../../common/Spinner';
import {getpost} from "../../../actions/postActions";
import PostItem from '../posts/PostItems';
import CommentForm from './CommentForm';
import CommentFeed from "./CommentFeed";

class SinglePost extends Component {

    componentDidMount(){
        this.props.getpost(this.props.match.params.id);
    }

    render() {
        const {post ,loading} = this.props.post;
        const {auth,authCompany} = this.props;

        let postContent;

        if(post === null || loading || Object.keys(post).length === 0){
            postContent = <Spinner/>;

        }
        else {
            postContent = (
                <div>
                    <PostItem post={post} showActions ={false} />
                    <CommentForm postId={post._id} />
                    //show applied feed here
                    <CommentFeed postId={post._id} comments={post.comments}/>
                </div>
            );
        }

        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {auth.isAuthenticated ? (
                                <Link to="/feed" className="btn btn-light mb-3">
                                    Back To Feed
                                </Link>
                            ):null}
                            {authCompany.isCompanyAuthenticated ? (
                                <Link to="/employer-feed" className="btn btn-light mb-3">
                                    Back To Feed
                                </Link>
                            ):null}
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps =(state) =>({
    post : state.post,
    auth:state.auth,
    authCompany:state.authCompany
});

export default connect(mapStateToProps,{getpost})(SinglePost);
