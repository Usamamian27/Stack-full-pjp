// This File is just displaying a single Comment item

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteComment} from '../../../actions/postActions';
import {showProfile} from "../../../actions/profileAcions";
import {Link } from 'react-router-dom';

class CommentItem extends Component {

    onDeleteClick(postId , commentId){

        this.props.deleteComment(postId,commentId);

    };

    onViewProfile(id){
        this.props.showProfile(id);
    }

    render() {

        const {apply , postId , authCompany,auth} = this.props;
        return (
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
                        <Link
                            onClick={this.onViewProfile.bind(this,apply.user)}
                            className="btn btn-primary ml-4 "
                            to="/show-profile"
                        >
                            View Profile
                        </Link>

                    {/*<div className="col-md-10">*/}
                        {/*/!*<p className="lead">{applicants.text}</p>*!/*/}
                        {/*/!*{comment.user === authCompany.company.id ? (*!/*/}
                            {/*/!*<button*!/*/}
                                {/*/!*onClick={this.onDeleteClick.bind(this, postId, comment._id)}*!/*/}
                                {/*/!*type="button"*!/*/}
                                {/*/!*className="btn btn-danger mr-1"*!/*/}
                            {/*/!*>*!/*/}
                                {/*/!*<i className="fas fa-times" />*!/*/}
                            {/*/!*</button>*!/*/}

                        {/*/!*) :*!/*/}
                            {/*/!*null*!/*/}
                        {/*/!*}*!/*/}




                        {/*/!*{comment.user === auth.user.id ? (*!/*/}
                            {/*/!*<span>*!/*/}
                                {/*/!*<button*!/*/}
                                    {/*/!*onClick={this.onDeleteClick.bind(this, postId, comment._id)}*!/*/}
                                    {/*/!*type="button"*!/*/}
                                    {/*/!*className="btn btn-danger mr-1"*!/*/}
                                {/*/!*>*!/*/}
                                    {/*/!*<i className="fas fa-times" />*!/*/}
                                {/*/!*</button>*!/*/}


                            {/*/!*</span>*!/*/}


                        {/*/!*) :*!/*/}
                            {/*/!*null*!/*/}
                        {/*/!*}*!/*/}




                    {/*</div>*/}
                </div>
            </div>

        );
    }
}


const mapStateToProps =(state) =>({
    authCompany : state.authCompany,
    portfolio : state.portfolio,
    auth:state.auth,
    profile:state.profile
});

export default connect(mapStateToProps,{deleteComment,showProfile})(CommentItem);

