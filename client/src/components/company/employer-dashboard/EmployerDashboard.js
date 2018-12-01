import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getCurrentPortfolio} from "../../../actions/portfolioActions";
import Spinner from '../../common/Spinner';
//import ProfileActions from "./profileActions";

class EmployerDashboard extends Component {

    componentDidMount(){
        this.props.getCurrentPortfolio();
    }

    render() {

        const { company } = this.props.authCompany;
        const { portfolio, loading } = this.props.portfolio;

        let dashboardContent;

        if (portfolio === null || loading) {
            dashboardContent = <Spinner />;
        } else {

            if(Object.keys(portfolio).length > 0 ){
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">
                            Welcome
                            <Link to={`/portfolio/${portfolio.handle}`}>
                                {" " + company.name}
                            </Link>
                        </p>

                        {/*/!* Buttons for Add EXP EDU  *!/*/}
                        {/*<ProfileActions />*/}
                        <div className="btn-group mb-4" role="group">
                            <Link to="/edit-portfolio" className="btn btn-light">
                                <i className="fas fa-user-circle text-info mr-1"></i>
                                Edit Profile
                            </Link>
                        </div>

                    </div>

                );
            }
            else {
                console.log('From Else case');
                // User is logged in but has no profile
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome  {" " + company.name}</p>
                        <p>You have not yet setup a portfolio, please add some info</p>
                        <Link to="/create-portfolio" className="btn btn-lg btn-info">
                            Create Portfolio
                        </Link>
                    </div>
                );
            }

        }
        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Company's Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>({
    portfolio:state.portfolio,
    authCompany:state.authCompany
});

export default connect(mapStateToProps,{getCurrentPortfolio})(EmployerDashboard);
