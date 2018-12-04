import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import TextFieldGroup from '../../common/TextFieldGroup';
import SelectListGroup from '../../common/SelectListGroup';
import { addpost } from '../../../actions/postActions';

class PostForm extends Component {
    state = {
        text: '',
        title:'',
        type:'',
        experience:'',
        skills:'',
        errors: {}
    };


    componentWillReceiveProps(newProps) {
        if (newProps.errors) {
            this.setState({ errors: newProps.errors });
        }
    }

    onSubmit=(e)=> {
        e.preventDefault();

        const { company } = this.props.authCompany;

        const newPost = {
            text: this.state.text,
            name: company.name,
            avatar: company.avatar,
            title: this.state.title,
            experience: this.state.experience,
            skills:this.state.skills,
            type: this.state.type
        };

        this.props.addpost(newPost);
        this.setState({ text: '' });
    };

    onChange=(e)=> {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { errors } = this.state;

        const options = [
            { label: '* Select Professional Status', value: 0 },
            { label: 'Developer', value: 'Developer' },
            { label: 'Junior Developer', value: 'Junior Developer' },
            { label: 'Senior Developer', value: 'Senior Developer' },
            { label: 'Manager', value: 'Manager' },
            { label: 'Student or Learning', value: 'Student or Learning' },
            { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
            { label: 'Intern', value: 'Intern' },
            { label: 'Other', value: 'Other' }
        ];
        return (
            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-header bg-info text-white">Post a Job / Project...</div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">

                                <TextFieldGroup
                                    placeholder="Create a job title"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChange}
                                    error={errors.title}
                                />
                                <SelectListGroup
                                    placeholder="job type"
                                    name="type"
                                    value={this.state.type}
                                    onChange={this.onChange}
                                    options={options}
                                    error={errors.type}
                                    info="Select the type of job u want to post"
                                />
                                <TextFieldGroup
                                    placeholder="* Skills"
                                    name="skills"
                                    value={this.state.skills}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                                />
                                <TextFieldGroup
                                    placeholder="List the experience wanted"
                                    name="experience"
                                    value={this.state.experience}
                                    onChange={this.onChange}
                                    error={errors.experience}
                                />
                                <TextAreaFieldGroup
                                    placeholder="Create a job description"
                                    name="text"
                                    value={this.state.text}
                                    onChange={this.onChange}
                                    error={errors.text}
                                />
                            </div>
                            <button type="submit" className="btn btn-dark">
                                Post
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

// we pull out auth bcz we want the user from it

const mapStateToProps = state => ({
    authCompany: state.authCompany,
    errors: state.errors
});

export default connect(mapStateToProps, { addpost })(PostForm);
