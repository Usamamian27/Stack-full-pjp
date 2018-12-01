import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import TextFieldGroup from '../../common/TextFieldGroup';
import InputGroup from '../../common/InputGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import {createPortfolio} from "../../../actions/portfolioActions";



class CreatePortfolio extends Component {
    state = {
        displaySocialInputs: false,
        handle: '',
        phone:'',
        website: '',
        city:'',
        country:'',
        description: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
        errors: {}
    };

    componentWillReceiveProps (nextProps) {
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }

    onSubmit = (e)=>{
        e.preventDefault();

        const portfolioData = {
            handle: this.state.handle,
            phone: this.state.phone,
            website: this.state.website,
            description: this.state.description,
            city: this.state.city,
            country: this.state.country,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        };

        this.props.createPortfolio(portfolioData,this.props.history);

    };

    onChange =(e) =>{
        this.setState({ [e.target.name] : e.target.value})
    };

    render() {


        const {errors , displaySocialInputs} = this.state;

        let socialInputs;
        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />
                    <InputGroup
                        placeholder="Facebook Page URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />
                    <InputGroup
                        placeholder="Linkedin Profile URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />
                    <InputGroup
                        placeholder="YouTube Channel URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />
                    <InputGroup
                        placeholder="Instagram Page URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />
                </div>
            );
        }
        return (
            <div className="create-portfolio">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">
                                Create Your Company's Portfolio
                            </h1>
                            <p className="lead text-center">
                                Let's get some information to make your Portfolio stand out
                            </p>
                            <small className="d-block pb-3">* = required fields</small>

                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Profile Handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="A unique handle for your portfolio URL. Your company name, nickname etc"
                                />
                                <TextFieldGroup
                                    placeholder="Website"
                                    name="website"
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    error={errors.website}
                                    info="Could be your own website or a company one"
                                />
                                <TextFieldGroup
                                    placeholder="* Phone #"
                                    name="phone"
                                    type="number"
                                    value={this.state.phone}
                                    onChange={this.onChange}
                                    error={errors.phone}
                                    info="Give your primary phone number"
                                />

                                <TextFieldGroup
                                    placeholder="City"
                                    name="city"
                                    value={this.state.city}
                                    onChange={this.onChange}
                                    error={errors.city}
                                    info="City or city & state suggested (eg. Boston, MA)"
                                />
                                <TextFieldGroup
                                    placeholder="Country"
                                    name="country"
                                    value={this.state.country}
                                    onChange={this.onChange}
                                    error={errors.country}
                                    info="Country / state suggested (eg. Pakistan/USA)"
                                />

                                <TextAreaFieldGroup
                                    placeholder="Short Description about your company"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                    info="Tell us a little about your company"
                                />

                                <div className="mb-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            this.setState(prevState => ({
                                                displaySocialInputs: !prevState.displaySocialInputs
                                            }));
                                        }}
                                        className="btn btn-light"
                                    >
                                        Add Social Network Links
                                    </button>
                                    <span className="text-muted">Optional</span>
                                </div>

                                {socialInputs}
                                <input type="submit" value="submit" className="btn btn-info btn-block mt-4" />

                            </form>


                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) =>({
    portfolio : state.portfolio,
    errors: state.errors

});

export default connect(mapStateToProps,{createPortfolio})(withRouter(CreatePortfolio));
