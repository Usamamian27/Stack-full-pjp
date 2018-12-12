import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getApprovals} from "../../../actions/profileAcions";
import {Link} from "react-router-dom";
import Spinner from "../../common/Spinner";
import ApprovalItem from './ApprovalItem';

class Approvals extends Component {

    componentDidMount(){
        this.props.getApprovals();
    }


    render() {

        const {approvals , loading} = this.props.authAdmin;
        let approvalItem;

        if(approvals === null || loading){
            approvalItem = <Spinner/>;
        }
        else {
            if(approvals.length > 0){
                approvalItem = approvals.map(approval => (
                    <ApprovalItem key={approval._id} approval={approval}/>
                ));
            }
            else {
                approvalItem = <h4>No Pending requests Found...</h4>;
            }
        }
        return (
            <div className="profiles">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 connect-center">
                                Pending Requests
                            </h1>

                            {approvalItem}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>({
    authAdmin:state.authAdmin
});

export default connect(mapStateToProps,{getApprovals})(Approvals);
