import React, { Component } from 'react';
import isEmpty from '../../../validations/isEmpty';

class PortfolioAbout extends Component {
    render() {
        const { portfolio } = this.props;

        // Get first name
        const firstName = portfolio.user.name.trim().split(' ')[0];

        // // Skill List
        // const skills = profile.skills.map((skill, index) => (
        //     <div key={index} className="p-3">
        //         <i className="fa fa-check" /> {skill}
        //     </div>
        // ));

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-body bg-light mb-3">
                        <h3 className="text-center text-info">{firstName}'s Description</h3>
                        <p className="lead">
                            {isEmpty(portfolio.description) ? (
                                <span>{firstName} does not have any description</span>
                            ) : (
                                <span>{portfolio.description}</span>
                            )}
                        </p>
                        <hr />
                        <h3 className="text-center text-info">
                            Skill Set
                        </h3>
                        <div className="row">
                            <div className="d-flex flex-wrap justify-content-center align-items-center">
                                {/*{skills}*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PortfolioAbout;
