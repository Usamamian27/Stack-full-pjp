import React, {Component} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {loginStudent} from '../../actions/authActions';


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

        const userData = {
            email: this.state.email,
            password: this.state.password,
        };
        this.props.loginStudent(userData);
    };
    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            // this.props.history.replace('/dashboard');
        }

        if(nextProps.errors){
            this.setState({errors : nextProps.errors});
        }
    }



    render() {

        const {errors} = this.state;

        return (
            <div className="account-popup-area signin-popup-box">
                <div className="account-popup">
                    <span className="close-popup"><i className="la la-close"></i></span>
                    <h3>User Login</h3>
                    <span>Click To Login With Demo User</span>
                    <div className="select-user">
                        <span>Candidate</span>
                        <span>Employer</span>
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <div className="cfield">
                            <input
                                id="login-email"
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange}
                                className={classnames('form-control form-control-lg',{
                                    'is-invalid' : errors.email
                                })}
                            />
                            <i className="la la-user"></i>
                            {errors.email && (<div className="invalid-feedback">
                                {errors.email}
                            </div>)}
                        </div>
                        <div className="cfield">
                            <input
                                id="login-password"
                                type="password"
                                placeholder="********"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
                                className={classnames('form-control form-control-lg',{
                                    'is-invalid' : errors.password
                                })}
                            />
                            <i className="la la-key"></i>
                            {errors.password && (<div className="invalid-feedback">
                                {errors.password}
                            </div>)}
                        </div>
                        <button className="signin-close-popup" type="submit">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth : state.auth,
    errors:state.errors
});

export default connect(mapStateToProps,{loginStudent})(Login);
