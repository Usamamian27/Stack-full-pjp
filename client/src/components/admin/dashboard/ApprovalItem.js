import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {approveRequest} from "../../../actions/profileAcions";

class ApprovalItem extends Component {

    onApproveClick=(id)=>{
        this.props.approveRequest(id);
    }

    render() {
        const {approval} = this.props;
        return (
            <div>
                <div className="card  mb-3 mr-3 float-left" style={{width: 200, height: 300}}>
                    <div className="card-body">
                        <Link
                            to={approval.avatar}>
                            <img
                                className="rounded-circle ml-4"
                                style={{width: 100, height: 100}}
                                src={approval.avatar}
                                alt=""/>
                        </Link>
                        <div className="text-center">
                            <h3>{approval.name}</h3>
                        </div>
                        <div className="text-center">
                                <small>{approval.email}</small>
                        </div>
                        <div className="text-center">
                            <Link
                                onClick={this.onApproveClick.bind(approval._id)}
                                className="btn btn-danger"
                                to="#!"
                            >
                                Approve
                            </Link>
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}



export default connect(null,{approveRequest})(ApprovalItem);
