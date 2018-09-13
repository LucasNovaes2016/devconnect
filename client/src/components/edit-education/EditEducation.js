import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import Spinner from "../common/Spinner";
import {
  addEducation,
  editEducation,
  getEducation
} from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class EditEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      current: false,
      disabled: false,
      checked: false,
      description: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentDidMount() {
    this.props.getEducation(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.education) {
      const education = nextProps.profile.education;

      education.school = !isEmpty(education.school) ? education.school : "";
      education.degree = !isEmpty(education.degree) ? education.degree : "";
      education.fieldofstudy = !isEmpty(education.fieldofstudy)
        ? education.fieldofstudy
        : "";
      education.from = !isEmpty(education.from)
        ? education.from.substring(0, 10)
        : "";
      education.to = !isEmpty(education.to)
        ? education.to.substring(0, 10)
        : "";
      education.current = !isEmpty(education.current) ? education.current : "";
      education.description = !isEmpty(education.description)
        ? education.description
        : "";
      education.school = !isEmpty(education.school) ? education.school : "";

      // Set component fields state
      this.setState({
        school: education.school,
        degree: education.degree,
        fieldofstudy: education.fieldofstudy,
        from: education.from,
        current: education.current,
        disabled: education.current ? true : false,
        checked: education.current ? true : false,
        to: education.to,
        description: education.description
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.editEducation(
      this.props.match.params.id,
      this.props.history,
      eduData
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current,
      checked: !this.state.checked
    });

    if (!this.state.checked) {
      this.setState({
        to: ""
      });
    }
  }

  render() {
    const { errors } = this.state;
    const { loading } = this.props.profile;
    const { education } = this.props.profile;

    let editEducationContent;

    if (education === null || loading) {
      editEducationContent = <Spinner />;
    } else {
      editEducationContent = (
        <div>
          <Link to="/dashboard" className="btn btn-light">
            Voltar
          </Link>
          <h1 className="display-4 text-center">
            Editar experiência educacional
          </h1>
          <p className="lead text-center">
            Adicione alguma escola, faculdade, bootcamp que você tenha
            participado
          </p>
          <small className="d-block pb-3">* = Campos obrigatórios</small>
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="* Instituição"
              name="school"
              value={this.state.school}
              onChange={this.onChange}
              error={errors.school}
            />
            <TextFieldGroup
              placeholder="* Diploma ou certificação"
              name="degree"
              value={this.state.degree}
              onChange={this.onChange}
              error={errors.degree}
            />
            <TextFieldGroup
              placeholder="* Área de estudo"
              name="fieldofstudy"
              value={this.state.fieldofstudy}
              onChange={this.onChange}
              error={errors.fieldofstudy}
            />
            <h6>From Date</h6>
            <TextFieldGroup
              name="from"
              type="date"
              value={this.state.from}
              onChange={this.onChange}
              error={errors.from}
            />
            <h6>To Date</h6>
            <TextFieldGroup
              name="to"
              type="date"
              value={this.state.to}
              onChange={this.onChange}
              error={errors.to}
              disabled={this.state.disabled ? "disabled" : ""}
            />
            <div className="form-check mb-4">
              <input
                type="checkbox"
                className="form-check-input"
                name="current"
                value={this.state.current}
                checked={this.state.checked}
                onChange={this.onCheck}
                id="current"
              />
              <label htmlFor="current" className="form-check-label">
                Experiência atual
              </label>
            </div>
            <TextAreaFieldGroup
              placeholder="Descrição"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
              error={errors.description}
              info="Fale-nos sobre o que você aprendeu"
            />
            <input
              type="submit"
              value="Submit"
              className="btn btn-info btn-block mt-4"
            />
          </form>
        </div>
      );
    }
    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">{editEducationContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

EditEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  editEducation: PropTypes.func.isRequired,
  getEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEducation, editEducation, getEducation }
)(withRouter(EditEducation));
