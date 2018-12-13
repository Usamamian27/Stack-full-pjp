import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import Spinner from "../../common/Spinner";


class AdminDashboard extends Component {
    render() {

        let dashboardContent;

        if (this.props.authAdmin.approvals === null) {
            dashboardContent = <Spinner/>;
        } else {

            dashboardContent = (

                <div>
                    <Link to="/approvals" className="btn btn-light">
                        <i className="fas fa-user-circle text-info mr-1"></i>
                        Pending Approvals
                    </Link>
                </div>

            );
        }


            return (
                <div className="dashboard">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="display-4">Admin Dashboard</h1>
                            </div>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            );
        }
    }

const mapStateToProps = (state) =>({
    authAdmin:state.authAdmin
});


export default connect(mapStateToProps)(AdminDashboard);
