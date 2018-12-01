import React, {Component} from 'react';
import isEmpty from '../../../validations/isEmpty';

class PortfolioHeader extends Component {
    render() {
        const { portfolio } = this.props;
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-body bg-info text-white mb-3">
                        <div className="row">
                            <div className="col-4 col-md-3 m-auto">
                                <img
                                    className="rounded-circle"
                                    src={portfolio.user.avatar}
                                    alt="Connect to wordpress"
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            <h1 className="display-4 text-center">{portfolio.user.name}</h1>

                            {isEmpty(portfolio.address.city) ? null : <p>{portfolio.address.city}</p>}
                            {isEmpty(portfolio.address.country) ? null : <p>{portfolio.address.country}</p>}
                            <p>
                                {isEmpty(portfolio.website) ? null : (
                                    <a
                                        className="text-white p-2"
                                        href={portfolio.website}
                                        target="_blank"
                                    >
                                        <i className="fas fa-globe fa-2x" />
                                    </a>
                                )}

                                {isEmpty(portfolio.social && portfolio.social.twitter) ? null : (
                                    <a
                                        className="text-white p-2"
                                        href={portfolio.social.twitter}
                                        target="_blank"
                                    >
                                        <i className="fab fa-twitter fa-2x" />
                                    </a>
                                )}

                                {isEmpty(portfolio.social && portfolio.social.facebook) ? null : (
                                    <a
                                        className="text-white p-2"
                                        href={portfolio.social.facebook}
                                        target="_blank"
                                    >
                                        <i className="fab fa-facebook fa-2x" />
                                    </a>
                                )}

                                {isEmpty(portfolio.social && portfolio.social.linkedin) ? null : (
                                    <a
                                        className="text-white p-2"
                                        href={portfolio.social.linkedin}
                                        target="_blank"
                                    >
                                        <i className="fab fa-linkedin fa-2x" />
                                    </a>
                                )}

                                {isEmpty(portfolio.social && portfolio.social.youtube) ? null : (
                                    <a
                                        className="text-white p-2"
                                        href={portfolio.social.youtube}
                                        target="_blank"
                                    >
                                        <i className="fab fa-youtube fa-2x" />
                                    </a>
                                )}

                                {isEmpty(portfolio.social && portfolio.social.instagram) ? null : (
                                    <a
                                        className="text-white p-2"
                                        href={portfolio.social.instagram}
                                        target="_blank"
                                    >
                                        <i className="fab fa-instagram fa-2x" />
                                    </a>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default PortfolioHeader;
