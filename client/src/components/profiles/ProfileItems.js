import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import isEmpty from '../../validations/isEmpty';

class ProfileItem extends Component {
    render() {

        const {profile} = this.props;

        return (
            <div className="card  mb-3 mr-3 float-left" style={{width:200,height:300}}>
                <div className="card-body">
                    <Link
                        to={profile.user.avatar}>
                        <img
                            className="rounded-circle ml-4"
                            style={{width:100,height:100}}
                             src={profile.user.avatar}
                             alt=""/>
                    </Link>
                    <div className="text-center">
                        <h3>{profile.user.name}</h3>

                            {profile.status}
                            {isEmpty(profile.company) ? null
                                : (
                                    <span> at {profile.company}</span>
                                )}

                        <p>
                            {isEmpty(profile.location) ? null
                                : (
                                    <span>{profile.location}</span>
                                )}
                        </p>
                        <Link to={`/profile/${profile.handle}`} className="btn btn-info mb-3">
                            View Profile
                        </Link>
                    </div>
            </div>

            </div>
            // <div className="card card-body bg-light mb-3">
            //     <div className="row">
            //         <div className="col-2">
            //             <Link to={profile.user.avatar}>
            //                 <img className="rounded-circle"
            //                      src={profile.user.avatar}
            //                      alt=""/>
            //             </Link>
            //         </div>
            //
            //         <div className="col-lg-6 col-md-4 col-8">
            //             <h3>{profile.user.name}</h3>
            //             <p>
            //                 {profile.status}
            //                 {isEmpty(profile.company) ? null
            //                     : (
            //                         <span> at {profile.company}</span>
            //                     )}
            //             </p>
            //             <p>
            //                 {isEmpty(profile.location) ? null
            //                     : (
            //                         <span>{profile.location}</span>
            //                     )}
            //             </p>
            //             <Link to={`/profile/${profile.handle}`} className="btn btn-info">
            //                 View Profile
            //             </Link>
            //         </div>
            //
            //         {/*<div className="col-md-4 d-none d-md-block">*/}
            //             {/*<h4>Skill Set</h4>*/}
            //             {/*<ul className="list-group">*/}
            //                 {/*{*/}
            //                     {/*profile.skills.slice(0,4)*/}
            //                         {/*.map((skill,index)=>(*/}
            //
            //                             {/*<li key={index} className="list-group-item">*/}
            //                                 {/*<i className="fa fa-check pr-1"/>*/}
            //                                 {/*{skill}*/}
            //                             {/*</li>*/}
            //                         {/*))}*/}
            //             {/*</ul>*/}
            //         {/*</div>*/}
            //
            //     </div>
            // </div>
        );
    }
}

export default ProfileItem;
