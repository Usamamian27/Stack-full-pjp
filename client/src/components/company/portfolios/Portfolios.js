import React, {Component} from 'react';
import {connect} from 'react-redux';
import Spinner from '../../common/Spinner';
import {getPortfolios} from "../../../actions/portfolioActions";
import PortfolioItems from '../../company/portfolios/PortfolioItems';

class Portfolios extends Component {

    componentDidMount(){
        this.props.getPortfolios();
    }

    render() {

        const {portfolios , loading} = this.props.portfolio;

        let portfolioItems;

        if(portfolios === null || loading){
            portfolioItems = <Spinner/>;
        }
        else {
            if(portfolios.length > 0){
                portfolioItems = portfolios.map(portfolio => (
                    <PortfolioItems key={portfolio._id} portfolio={portfolio}/>
                ));
            }
            else {
                portfolioItems = <h4>No Profiles Found...</h4>;
            }
        }

        return (
            <div className="portfolios">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 connect-center">
                                Company Portfolios
                            </h1>
                            <p className="lead text-center">
                                Browse and connect to Companies
                            </p>
                            {portfolioItems}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>({
    portfolio : state.portfolio
});


export default connect(mapStateToProps,{getPortfolios})(Portfolios);
