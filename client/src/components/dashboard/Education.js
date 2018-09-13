import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profileActions";
import { Link } from "react-router-dom";

class Education extends Component {
  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }

  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment add={{ days: 1 }} format="DD/MM/YYYY">
            {edu.from}
          </Moment>{" "}
          -{" "}
          {edu.to === null ? (
            "Now"
          ) : (
            <Moment add={{ days: 1 }} format="DD/MM/YYYY">
              {edu.to}
            </Moment>
          )}
        </td>
        <td>
          <Link to={`/edit-education/${edu._id}`} className="btn btn-info mr-2">
            Editar
          </Link>
          <button
            onClick={this.onDeleteClick.bind(this, edu._id)}
            className="btn btn-danger"
          >
            Excluir
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Credenciais Educacionais</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Instituição</th>
              <th>Diploma</th>
              <th>Anos</th>
              <th />
            </tr>
            {education}
          </thead>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
