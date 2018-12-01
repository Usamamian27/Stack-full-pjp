import React from 'react';
import {Route , Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const PrivateRouteCompany = ({component:Component ,authCompany,...rest})=>

    (
        <Route
            {...rest}
            render = {props =>
                authCompany.isCompanyAuthenticated === true ? (
                    <Component {...props}/>
                ) : (
                    <Redirect to="/employer-login" />
                )

            }
        />
    );


const mapStateToProps = (state) =>({
    authCompany : state.authCompany
});


export default connect(mapStateToProps)(PrivateRouteCompany);
