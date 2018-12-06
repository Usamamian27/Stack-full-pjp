import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginAdmin} from "../../actions/authActions";

// Bring in text field component
import TextFieldGroup from '../common/TextFieldGroup';



class Login extends Component {

    state ={
        email:'',
        password:'',
        errors:{}
    };

    onChange = (e)=>{
        this.setState({[e.target.name ] : e.target.value});
    };

    onSubmit =(e) =>{
        e.preventDefault();

        const adminData = {
            email: this.state.email,
            password: this.state.password,
        };
        this.props.loginAdmin(adminData);
    };

    componentDidMount (){
        if(this.props.authAdmin.isAdminAuthenticated){
            this.props.history.push('/admin-dashboard');
        }
    }

    componentWillReceiveProps(nextProps){

        if(nextProps.authAdmin.isAdminAuthenticated){
            this.props.history.push('/admin-dashboard');
        }

        if(nextProps.errors){
            this.setState({errors : nextProps.errors});
        }
    }

    render() {

        const {errors} = this.state;

        return (
            <div className="admin-login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">
                                Log In
                            </h1>
                            <p className="lead text-center">
                                Sign in to your admin account
                            </p>

                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="Email Address"
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    error={errors.email}
                                />

                                <TextFieldGroup
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    error={errors.password}
                                />

                                <input type="submit"
                                       className="btn btn-info btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// get our required data from redux states

const mapStateToProps = (state) =>({

    authAdmin : state.authAdmin,
    errors: state.errors

});

export default connect(mapStateToProps,{loginAdmin})(Login);
