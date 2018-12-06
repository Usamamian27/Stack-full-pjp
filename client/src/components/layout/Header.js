import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logOutUser} from "../../actions/authActions";
import {clearCurrentProfile} from "../../actions/profileAcions";
import {logOutCompany} from "../../actions/authActions";
import {logOutAdmin} from "../../actions/authActions";


class Header extends Component {


    onLogoutClick = (e) =>{
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logOutUser();
    };

    onCompanyLogoutClick = (e) =>{
        e.preventDefault();
        this.props.logOutCompany();
    };
    onAdminLogoutClick = (e) =>{
        e.preventDefault();
        this.props.logOutAdmin();
    };



    render() {

        const {isAuthenticated , user} = this.props.auth;
        const {isCompanyAuthenticated , company} = this.props.authCompany;
        const {isAdminAuthenticated ,admin} =this.props.authAdmin;
        const authLinks = (
            <ul className="navbar-nav ml-auto">

                <li className="nav-item">
                    <Link className="nav-link" to="/feed">
                        News Feed
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                        Dashboard
                    </Link>
                </li>


                <li className="nav-item">
                    <a href="#!"
                       className="nav-link"
                       onClick={this.onLogoutClick}>

                        <img className="rounded-circle"
                             src={user.avatar} alt={user.name}
                             style={{width:'25px' , marginRight:'5px'}}
                             // title="you must have a gravatar connected to your email"
                        />
                        {' '}
                        <Link to="/login">
                            Logout
                        </Link>
                    </a>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                {/*<li className="nav-item">*/}
                    {/*<Link className="nav-link" to="/register">*/}
                        {/*Sign Up*/}
                    {/*</Link>*/}
                {/*</li>*/}
                {/*<li className="nav-item">*/}
                    {/*<Link className="nav-link" to="/login">*/}
                        {/*Login*/}
                    {/*</Link>*/}
                {/*</li>*/}
                <li className="nav-item">
                    <Link  className="nav-link" to="/employer-landing">
                        Employer
                    </Link>
                </li>
            </ul>
        );

        const authCompanyLinks = (
            <ul className="navbar-nav ml-auto">

                <li className="nav-item">
                    <Link className="nav-link" to="/employer-feed">
                        News Feed
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/employer-dashboard">
                        Dashboard
                    </Link>
                </li>


                <li className="nav-item">
                    <a href="#!"
                       className="nav-link"
                       onClick={this.onCompanyLogoutClick}>

                        <img className="rounded-circle"
                             src={company.avatar} alt={company.name}
                             style={{width:'25px' , marginRight:'5px'}}
                            // title="you must have a gravatar connected to your email"
                        />
                        {' '}
                        <Link to="/employer-login">
                            Logout
                        </Link>
                    </a>
                </li>
            </ul>
        );

        const authAdminLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/employer-dashboard">
                        Dashboard
                    </Link>
                </li>


                <li className="nav-item">
                    <a href="#!"
                       className="nav-link"
                       onClick={this.onAdminLogoutClick}>

                        <img className="rounded-circle"
                             src={admin.avatar} alt={admin.name}
                             style={{width:'25px' , marginRight:'5px'}}
                            // title="you must have a gravatar connected to your email"
                        />
                        {' '}
                        <Link to="/admin-login">
                            Logout
                        </Link>
                    </a>
                </li>
            </ul>
        );



        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        PUCIT JOB PORTAL
                    </Link>
                    <button className="navbar-toggler" type="button"
                            data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/profiles">
                                    Developers
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/portfolios">
                                    Companies
                                </Link>
                            </li>
                        </ul>

                        {isAuthenticated ? authLinks : (isCompanyAuthenticated ? authCompanyLinks : (isAdminAuthenticated ? authAdminLinks : null))}
                        {guestLinks}
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) =>({
    auth: state.auth,
    authCompany : state.authCompany,
    authAdmin:state.authAdmin
});

export default connect(mapStateToProps,{logOutUser,clearCurrentProfile,logOutCompany,logOutAdmin})(Header);
