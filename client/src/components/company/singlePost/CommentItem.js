// This File is just displaying a single Comment item

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteComment} from '../../../actions/postActions';
import {showProfile} from "../../../actions/profileAcions";
import {addShortlist} from "../../../actions/postActions";
import {Link } from 'react-router-dom';

class CommentItem extends Component {

    onDeleteClick(postId , commentId){

        this.props.deleteComment(postId,commentId);

    };

    onViewProfile(id){
        this.props.showProfile(id);
    }
    onShortlistClicked(id,postId){
        this.props.addShortlist(id,postId);

    }

    render() {

        const {apply , postId} = this.props;
        return (
            <div className="zoom">

                <div className="card  mb-3 mr-3 float-left" style={{width:200}}>
                    <div className="card-body" >

                        <Link to="#!">
                            <img
                                className="rounded-circle ml-4 "
                                style={{width:100,height:100}}
                                src={apply.avatar}
                                alt=""
                            />
                        </Link>
                        <h4 className="card-title text-center">{apply.name}</h4>
                        <p className="text-center">{apply.email}</p>
                        <Link
                            onClick={this.onViewProfile.bind(this,apply.user)}
                            className="btn btn-primary ml-4 mb-2 "
                            to="/show-profile"
                        >
                            View Profile
                        </Link>
                        <Link
                            className="btn btn-primary ml-4 mb-2"
                            to="/send-email"
                        >
                            Send Email
                        </Link>

                        <Link
                            onClick={this.onShortlistClicked.bind(this,apply.user,postId)}
                            className="btn btn-primary ml-4 "
                            to="#!"
                        >
                            Shortlist
                        </Link>

                    </div>
                </div>
            </div>


        );
    }
}


const mapStateToProps =(state) =>({
    authCompany : state.authCompany,
    portfolio : state.portfolio,
    auth:state.auth,
    profile:state.profile,
    post:state.post
});

export default connect(mapStateToProps,{deleteComment,showProfile,addShortlist})(CommentItem);

