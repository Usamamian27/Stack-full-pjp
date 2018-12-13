// This File is just displaying a single Comment item

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {showProfile} from "../../../actions/profileAcions";
import {addShortlist} from "../../../actions/postActions";
import {Link } from 'react-router-dom';

class ShortlistedItem extends Component {



    onViewProfile(id){
        this.props.showProfile(id);
    }

    render() {

        const {short} = this.props;
        return (
            <div>

                <div className="card  mb-3 mr-3 float-left" style={{width:200}}>
                    <div className="card-body" >

                        <Link to="#!">
                            <img
                                className="rounded-circle ml-4 "
                                style={{width:100,height:100}}
                                src={short.avatar}
                                alt=""
                            />
                        </Link>
                        <h4 className="card-title text-center">{short.name}</h4>
                        <Link
                            onClick={this.onViewProfile.bind(this,short.user)}
                            className="btn btn-primary ml-4 mb-2 "
                            to="/show-profile"
                        >
                            View Profile
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
    profile:state.profile
});

export default connect(mapStateToProps,{showProfile,addShortlist})(ShortlistedItem);

