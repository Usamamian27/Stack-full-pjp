import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginStudent} from "../../actions/authActions";

// Bring in text field component
import TextFieldGroup from '../common/TextFieldGroup';



class Login extends Component {

    state ={
        email:'',
        password:'',
        verify:'',
        errors:{}
    };

    onChange = (e)=>{
        this.setState({[e.target.name ] : e.target.value});
    };

    onSubmit =(e) =>{
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password,
        };
        this.props.loginStudent(userData);
    };

    componentDidMount (){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps){

        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }

        if(nextProps.errors){
            this.setState({errors : nextProps.errors});
        }
    }

    render() {

        const {errors} = this.state;

        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">
                               Student Log In
                            </h1>
                            <p className="lead text-center">
                                Sign in to your Student account
                            </p>

                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="Email Address"
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    error={errors.email}
                                    error_verify={errors.verify}
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

    auth : state.auth,
    errors: state.errors

});

export default connect(mapStateToProps,{loginStudent})(Login);
