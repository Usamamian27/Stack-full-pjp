import React, {Component} from 'react';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {deleteProject} from '../../actions/profileAcions';

class Project extends Component {

    onDeleteClick = (id)=>{
        this.props.deleteProject(id);
    };


    render() {

        const project = this.props.projects.map(proj =>(
            <tr key={proj._id}>

                <td>{proj.title}</td>
                <td>{proj.description}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{proj.from}</Moment> -
                    {proj.to === null ? (
                        ' Now'
                    ) : (
                        <Moment format="YYYY/MM/DD">{proj.to}</Moment>
                    )}
                </td>
                <td><button onClick={this.onDeleteClick.bind(proj._id)} className="btn btn-danger">Delete</button></td>
            </tr>

        ));

        return (
            <div>
                <h4 className="mb-4">Projects Description</h4>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Years</th>
                        <th></th>
                    </tr>
                    {project}
                    </thead>
                </table>

            </div>
        );
    }
}

export default connect(null,{deleteProject})(Project);
