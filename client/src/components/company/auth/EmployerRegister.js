import React, {Component} from 'react';
import {connect} from 'react-redux';
import {registerCompany} from "../../../actions/authActions";
import {withRouter} from 'react-router-dom';
import TextFieldGroup from '../../common/TextFieldGroup';

class EmployerRegister extends Component {

    state ={
        name:'',
        email:'',
        password:'',
        password2:'',
        errors:{}
    };

    componentDidMount (){
        if(this.props.authCompany.isCompanyAuthenticated){
            this.props.history.push('/employer-dashboard');
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors : nextProps.errors});
        }
    }

    onChange = (e)=>{
        this.setState({[e.target.name ] : e.target.value});
    };

    onSubmit =(e) =>{
        e.preventDefault();

        const newCompany = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };


        this.props.registerCompany(newCompany,this.props.history);
    };


    render() {

        const { errors } = this.state;
        return (
            <div className="employer-register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">
                               Company Sign Up
                            </h1>
                            <p className="lead text-center">
                                Register a new Company
                            </p>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                    error={errors.name}

                                />


                                <TextFieldGroup
                                    type="email"
                                    placeholder="Email Address"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    error={errors.email}
                                    info="This site uses gravatar so if u want a profile img use gravatar profile"


                                />

                                <TextFieldGroup
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    error={errors.password}
                                />

                                <TextFieldGroup
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="password2"
                                    value={this.state.password2}
                                    onChange={this.onChange}
                                    error={errors.password2}
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

const mapStateToProps = (state) =>({
    authCompany : state.authCompany,
    errors:state.errors
});

export default connect(mapStateToProps,{registerCompany})(withRouter(EmployerRegister));
