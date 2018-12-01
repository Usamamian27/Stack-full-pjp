import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PortfolioHeader from './PortfolioHeader';
import PortfolioAbout from './PortfolioAbout';
import Spinner from '../../common/Spinner';
import { getPortfolioByHandle } from '../../../actions/portfolioActions';

class SinglePortfolio extends Component {
    componentDidMount() {
        if (this.props.match.params.handle) {
            this.props.getPortfolioByHandle(this.props.match.params.handle);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.portfolio.portfolio === null && this.props.portfolio.loading) {
            this.props.history.push('/employer-dashboard');
        }
    }

    render() {
        const { portfolio, loading } = this.props.portfolio;
        let portfolioContent;

        if (portfolio === null || loading) {
            portfolioContent = <Spinner />;
        } else {
            portfolioContent = (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/portfolios" className="btn btn-light mb-3 float-left">
                                Back To portfolios
                            </Link>
                        </div>
                        <div className="col-md-6" />
                    </div>
                    <PortfolioHeader portfolio={portfolio} />
                    <PortfolioAbout portfolio={portfolio} />

                </div>
            );
        }

        return (
            <div className="portfolio">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">{portfolioContent}</div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    portfolio: state.portfolio
});

export default connect(mapStateToProps, { getPortfolioByHandle })(SinglePortfolio);
