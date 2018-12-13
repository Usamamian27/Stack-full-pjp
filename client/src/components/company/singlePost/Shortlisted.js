import React, {Component} from 'react';
import {connect}    from 'react-redux';
import {Link} from 'react-router-dom';
import Spinner from '../../common/Spinner';
import {getpost} from "../../../actions/postActions";
import PostItem from '../posts/PostItems';
import ShortlistedFeed from './ShortlistFeed';

class Shortlisted extends Component {

    componentDidMount(){
        this.props.getpost(this.props.match.params.id);
    }

    render() {
        const {post ,loading} = this.props.post;

        let postContent;
        if(post === null || loading || Object.keys(post).length === 0){
            postContent = <Spinner/>;

        }
        else {
            postContent = (
                <div>
                    <PostItem post={post} showActions ={false} />
                    <h2>ShortListed Candidates</h2>
                    <ShortlistedFeed postId={post._id} shortlist={post.shortlist}/>

                </div>

            );
        }

        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/employer-feed" className="btn btn-light mb-3">
                                Back To Feed
                            </Link>
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

export default connect(mapStateToProps,{getpost})(Shortlisted);
