import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import isEmpty from '../../../validations/isEmpty';

class ProfileItem extends Component {
    render() {

        const {portfolio} = this.props;

        return (
            <div className="card card-body bg-light mb-3">
                <div className="row">
                    <div className="col-2">
                        <Link to={portfolio.user.avatar}>
                            <img className="rounded-circle"
                                 src={portfolio.user.avatar}
                                 alt=""/>
                        </Link>
                    </div>

                    <div className="col-lg-6 col-md-4 col-8">
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
