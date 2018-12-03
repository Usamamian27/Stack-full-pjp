import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import {deletePost ,addLike} from "../../../actions/postActions";



// This File is just dispalying a single Post item

class PostItem extends Component {

    onDeleteClick(id) {
        this.props.deletePost(id);
    }

    onLikeClick(id) {
        this.props.addLike(id);
    }

    findUserLike(likes) {
        const { authCompany } = this.props;
        if (likes.filter(like => like.user === authCompany.company.id).length > 0) {
            return true;
        } else {
            return false;
        }
    }



    render() {

        const {authCompany, post , showActions,auth} = this.props;

        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <Link to="/portfolio">
                            <img className="rounded-circle d-none d-md-block" src={post.avatar} alt="" />
                        </Link>
                        <br />
                        <p className="text-center">{post.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">{post.text}</p>

                        {/* These buttons only show if show action is true */}
                        {showActions ?
                            (
                                <span className="float-right mr-5">
                                {auth.isAuthenticated ? (

                                    <span>
                                        <button
                                            onClick={this.onLikeClick.bind(this,post._id)}
                                            type="button"
                                            className="btn btn-light mr-1">
                                            <i
                                                className={classnames('fas fa-thumbs-up', {
                                                        'text-primary': this.findUserLike(post.applied)
                                                    }
                                                )
                                                }
                                            />
                                        </button>
                                            <Link to={`/student-post/${post._id}`} className="btn btn-info mr-1">
                                        Comments
                                        </Link>
                                    </span>


                                ):null}


                                    {/*/ if it is logged in company's post show delete & comment  button
                                    // otherwise not
                                    */}
                                    {post.user === authCompany.company.id ? (
                                        <span>
                                            <button
                                                onClick={this.onDeleteClick.bind(this, post._id)}
                                                type="button"
                                                className="btn btn-danger mr-1"
                                            >
                                                <i className="fas fa-times" />
                                            </button>
                                                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                                                    Comments
                                                </Link>
                                        </span>
                                    ) : null}
                                </span>
                            ) : null}

                    </div>
                </div>
            </div>
        );
    }
}

PostItem.defaultProps ={
    showActions : true
};

const mapStateToProps=(state)=>({
    authCompany :state.authCompany,
    auth:state.auth
});

export default connect(mapStateToProps,{deletePost, addLike})(PostItem);
