import React, {Component} from 'react';
import {connect}    from 'react-redux';
import {Link} from 'react-router-dom';
import Spinner from '../../common/Spinner';
import {getpost} from "../../../actions/postActions";
import PostItem from '../posts/PostItems';
import CommentFeed from "./CommentFeed";


class SinglePost extends Component {

    componentDidMount(){
        this.props.getpost(this.props.match.params.id);
    }

    render() {
        const {post ,loading} = this.props.post;
        const {auth,authCompany} = this.props;

        let postContent;
        const shortLinks = (
            <div className="btn-group mb-4" role="group">
                <Link to="#!" className="btn btn-light">
                    <i className="fas fa-user-circle text-info mr-1"></i>
                    All Applicants
                </Link>
                <Link to={`/shortlisted/${post._id}`} className="btn btn-light">
                    <i className="fas fa-user-circle text-info mr-1"></i>
                    Shortlisted Applicants
                </Link>
            </div>
        );

        if(post === null || loading || Object.keys(post).length === 0){
            postContent = <Spinner/>;

        }
        else {
            postContent = (
                <div>
                    <PostItem post={post} showActions ={false} />
                    {shortLinks}
                    <CommentFeed postId={post._id} applied={post.applied}/>
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
