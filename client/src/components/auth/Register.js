import React, {Component} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {withRouter} from 'react-router-dom';
import {registerStudent} from "../../actions/authActions";

class Register extends Component {
    state ={
        name:'',
        email:'',
        password:'',
        password2:'',
        errors:{}
    };

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors : nextProps.errors});
        }
    }

    onChange = (e)=>{
        this.setState({[e.target.name ] : e.target.value});
    };

    onSubmit =(e)=> {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.registerStudent(newUser,this.props.history);
    };

    render() {
        const {errors} = this.state;
        return (
                <div className="account-popup-area signup-popup-box">
                    <div  className="account-popup">
                        <span className="close-popup">
                            <i className="la la-close"></i>
                        </span>
                        <h3>Sign Up</h3>
                        <div className="select-user">
                            <span>Candidate</span>
                            <span>Employer</span>
                        </div>
                        <form onSubmit={this.onSubmit}>
                            <div className="cfield">
                                <input
                                    id="signup-username"
                                    type="text"
                                    placeholder="Username"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                    //error={errors.name}
                                    className={classnames('form-control form-control-lg',{
                                        'is-invalid' : errors.name
                                    })}

                                />
                                <i className="la la-user"></i>
                                {errors.name && (<div className="invalid-feedback">
                                    {errors.name}
                                </div>)}
                            </div>

                            <div className="cfield">
                                <input
                                    id="signup-email"
                                    type="text"
                                       placeholder="Email"
                                       name="email"
                                       value={this.state.email}
                                       onChange={this.onChange}
                                    className={classnames('form-control form-control-lg',{
                                        'is-invalid' : errors.email
                                    })}

                                />
                                <i className="la la-envelope-o"></i>
                                {errors.email && (<div className="invalid-feedback">
                                    {errors.email}
                                </div>)}
                            </div>
                            <div className="cfield">
                                <input
                                    id="signup-password"
                                    type="password"
                                       placeholder="Password"
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
                            <div className="cfield">
                                <input
                                    id="signup-password2"
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="password2"
                                       value={this.state.password2}
                                       onChange={this.onChange}
                                    className={classnames('form-control form-control-lg',{
                                        'is-invalid' : errors.password2
                                    })}
                                />
                                <i className="la la-key"></i>
                                {errors.password2 && (<div className="invalid-feedback">
                                    {errors.password2}
                                </div>)}
                            </div>

                            <button className="aclose-popup"
                           type="submit">SignUp</button>
                        </form>
                    </div>
                </div>
        );
    }
}

const mapStateToProps = (state)=>({
    auth:state.auth,
    errors :state.errors
});

export default connect(mapStateToProps,{registerStudent})(withRouter(Register));
