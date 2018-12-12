import React from 'react';
import {Route , Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const PrivateRouteAdmin = ({component:Component ,authAdmin,...rest})=>

    (
        <Route
            {...rest}
            render = {props =>
                authAdmin.isAdminAuthenticated === true ? (
                    <Component {...props}/>
                ) : (
                    <Redirect to="/login" />
                )

            }
        />
    );


const mapStateToProps = (state) =>({
    authAdmin : state.authAdmin
});


export default connect(mapStateToProps)(PrivateRouteAdmin);
