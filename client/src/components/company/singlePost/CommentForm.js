import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import { addComment } from '../../../actions/postActions';

class CommentForm extends Component {
    state = {
        text: '',
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
        const {postId} = this.props;

        const newComment = {
            text: this.state.text,
            name: company.name,
            avatar: company.avatar
        };

        this.props.addComment(postId,newComment);
        this.setState({ text: '' });
    };

    onChange=(e)=> {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { errors } = this.state;

        return (
            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-header bg-info text-white">Make a Comment</div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <TextAreaFieldGroup
                                    placeholder="Reply to post"
                                    name="text"
                                    value={this.state.text}
                                    onChange={this.onChange}
                                    error={errors.text}
                                />
                            </div>
                            <button type="submit" className="btn btn-dark">
                                Submit
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

export default connect(mapStateToProps, { addComment })(CommentForm);
