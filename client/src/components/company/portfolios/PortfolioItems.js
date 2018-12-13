import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import isEmpty from '../../../validations/isEmpty';

class ProfileItem extends Component {
    render() {

        const {portfolio} = this.props;

        return (

            <div className="zoom card  bg-light mb-3 ml-3 float-left" style={{width:200,height:300}}>
                <div className="card-body">

                        <Link to={portfolio.user.avatar}>
                            <img className="rounded-circle ml-4"
                                 src={portfolio.user.avatar}
                                 style={{width:100,height:100}}
                                 alt=""/>
                        </Link>


                    <div className="text-center">
                        <h3>{portfolio.user.name}</h3>

                        <p>
                            {isEmpty(portfolio.address.country) ? null
                                : (
                                    <span>{portfolio.address.country}</span>
                                )}
                        </p>

                    </div>

                    <div className="col-md-4 d-none d-md-block mt-5">
                        <Link to={`/portfolio/${portfolio.handle}`} className="btn btn-info">
                            View Portfolio
                        </Link>
                    </div>

                </div>
            </div>
        );
    }
}

export default ProfileItem;
