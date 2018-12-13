import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';





class Landing extends Component {

    componentDidMount (){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
        else if(this.props.authCompany.isCompanyAuthenticated){
            this.props.history.push('/employer-dashboard');
        }
        else if(this.props.authAdmin.isAdminAuthenticated){
            this.props.history.push('/admin-dashboard');
        }
    }

    render() {
        return (

            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row mt-5">
                            <div className="col-md-12 text-center ">
                                <h1 className="display-3 mb-4">PUCIT JOB PORTAL
                                </h1>
                                <p className="lead"> Create a profile/portfolio, Find a Candidate / Company
                                </p>
                                <hr/>
                                <Link to="/register" className="btn-lg btn btn-outline-info mr-2">Sign Up</Link>
                                <Link to="/login" className="btn btn-lg btn-outline-light">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>({
    auth : state.auth,
    authCompany:state.authCompany,
    authAdmin:state.authAdmin
});
export default connect(mapStateToProps)(Landing);
