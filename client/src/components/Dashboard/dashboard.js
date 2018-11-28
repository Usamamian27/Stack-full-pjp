import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getCurrentProfile} from "../../actions/profileAcions";
import Spinner from '../common/Spinner';
import ProfileActions from "./profileActions";
import Experience from "./Experience";
import Education from "./Education";
import Project from "./Project";

class Dashboard extends Component {

    componentDidMount(){
        this.props.getCurrentProfile();
    }


    render() {

        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <Spinner />;
        } else {

            if(Object.keys(profile).length > 0 ){
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">
                            Welcome
                            <Link to={`/profile/${profile.handle}`}>
                                {" " + user.name}
                            </Link>
                        </p>

                        {/* Buttons for Add EXP EDU  */}
                        <ProfileActions />


                        {/* Show Experience Data / Component */}

                        <Experience experience={profile.experience}/>


                        {/* Show Education Data / Component */}

                        <Education education={profile.education}/>

                        {/* Show Project Data / Component */}

                        <Project projects={profile.projects}/>

                    </div>
                );
            }
            else {
                console.log('From Else case');
                // User is logged in but has no profile
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome  {" " + user.name}</p>
                        <p>You have not yet setup a profile, please add some info</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info">
                            Create Profile

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
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>({
    profile:state.profile,
    auth:state.auth
});

export default connect(mapStateToProps,{getCurrentProfile})(Dashboard);
