import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class EmployerLanding extends Component {

    componentDidMount (){
        if(this.props.authCompany.isCompanyAuthenticated){
            this.props.history.push('/employer-dashboard');
        }
    }

    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">For Employers / Companies
                                </h1>
                                <p className="lead"> Create a portfolio, Find a Candidate
                                </p>
                                <hr/>
                                <Link to="/employer-register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                                <Link to="/employer-login" className="btn btn-lg btn-light">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>({
    authCompany : state.authCompany
});
export default connect(mapStateToProps,null)(EmployerLanding);
