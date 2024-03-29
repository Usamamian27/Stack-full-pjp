import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {emailCandidate} from "../../../actions/postActions";
import InputGroup from '../../common/InputGroup';
import TextArea from '../../common/TextAreaFieldGroup';

class EmailForm extends Component {

    state={
        name:'',
        email:'',
        sender:'',
        msg:'',
        password: ''
    };

    onChange = (e)=>{
        this.setState({[e.target.name ] : e.target.value});
    };

    onSubmit =(e)=> {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            sender:this.state.sender,
            msg: this.state.msg,
            password:this.state.password

        };

        this.props.emailCandidate(newUser,this.props.history);
        this.setState({
            name:'',
            email:'',
            sender:'',
            msg:'',
            password: ''
        });
        alert('Email Sending Successful');
        this.props.history.push('employer-feed');
    };

    render() {

        const {company} = this.props.authCompany;
        return (
            <div className="container">
                <h1 className="brand "><span>Acme</span> Compose to send an email</h1>
                <div className="wrapper animated bounceInLeft">
                    <div className="company-info">
                        <h3>{company.name}</h3>
                        <ul>
                            <li><i className="fa fa-envelope"></i> {company.email}</li>
                        </ul>
                    </div>
                    <div className="contact">
                        <form onSubmit={this.onSubmit}>
                            <p>
                                <label>Company's Name</label>
                                <InputGroup onChange={this.onChange}
                                       type="text"
                                       name="name"
                                       value={this.state.name}
                                />
                            </p>

                            <p>
                                <label>Receiver's Email Address</label>
                                <InputGroup onChange={this.onChange} type="email" name="email" value={this.state.email}/>
                            </p>
                            <p>
                                <label>Sender's Email</label>
                                <InputGroup onChange={this.onChange} type="email" name="sender" value={this.state.sender}/>
                            </p>
                            <p>
                                <label>Password</label>
                                <InputGroup onChange={this.onChange} type="password" name="password" value={this.state.password}/>
                            </p>
                            <p className="full">
                                <label>Message</label>
                                <TextArea onChange={this.onChange} name="msg" rows="5" value={this.state.msg}></TextArea>
                            </p>
                            <p className="full">
                                <button type="submit">Submit</button>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps =(state) =>({
    authCompany : state.authCompany,
    post:state.post
});


export default connect(mapStateToProps,{emailCandidate})(withRouter(EmailForm));
