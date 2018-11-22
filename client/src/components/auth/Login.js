import React, {Component} from 'react';

class Login extends Component {
    render() {
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
                    <form>
                        <div className="cfield">
                            <input type="text" placeholder="Username"/>
                            <i className="la la-user"></i>
                        </div>
                        <div className="cfield">
                            <input type="password" placeholder="********"/>
                            <i className="la la-key"></i>
                        </div>
                        <p className="remember-label">
                            <input type="checkbox" name="cb" id="cb1"/><label htmlFor="cb1">Remember me</label>
                        </p>
                        <a href="#" title="">Forgot Password?</a>
                        <button type="submit">Login</button>
                    </form>
                    <div className="extra-login">
                        <span>Or</span>
                        <div className="login-social">
                            <a className="fb-login" href="#" title=""><i className="fa fa-facebook"></i></a>
                            <a className="tw-login" href="#" title=""><i className="fa fa-twitter"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
