import React from "react";
import { formList } from "../lists";

export default class FormSection extends React.Component {


  handleInput(type, event) {
    let value = event.target.value;
    this.props.handleStateUpdate(type, value);
  }
  handleResumeUpdate(type, event) {
    const user = {...this.props.user};
    user.resumes[this.props.selectedResume][type] = event.target.value;
    this.props.handleStateUpdate('user', user);
  }
  handleExperienceUpdate(type, index, event) {
    let value = event.target.value;
    this.props.handleExperienceUpdate(type, index, value);
  }
  removeExperience(index) {
    this.props.removeExperience(index);
  }
  renderForm(activeForm) {
    switch(this.props.activeForm){
      case "contact":
        return (
          <div className="contact m-b-30 p-20">
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input className="input" value={this.props.user.resumes[this.props.selectedResume].name} onChange={this.handleResumeUpdate.bind(this, 'name')} type="text" placeholder="e.g Alex Smith" />
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input className="input" value={this.props.user.resumes[this.props.selectedResume].email} onChange={this.handleResumeUpdate.bind(this, 'email')} type="email" placeholder="e.g. alexsmith@gmail.com" />
              </div>
            </div>
            <div className="field">
              <label className="label">Address</label>
              <div className="control">
                <input className="input" value={this.props.user.resumes[this.props.selectedResume].address} onChange={this.handleResumeUpdate.bind(this, 'address')} type="address" placeholder="e.g. Road, City, State, Country" />
              </div>
            </div>
            <div className="field">
              <label className="label">Phone</label>
              <div className="control">
                <input className="input" value={this.props.user.resumes[this.props.selectedResume].phone} onChange={this.handleResumeUpdate.bind(this, 'phone')} type="phone" placeholder="e.g. 0000000000" />
              </div>
            </div>
          </div>
        );
      case "objective":
        return (
          <div className="objective m-b-30 p-20">
            <div className="field">
              <label className="label">Objective</label>
              <div className="control">
                <input className="input" value={this.props.user.resumes[this.props.selectedResume].objective} onChange={this.handleResumeUpdate.bind(this, 'objective')} type="text" placeholder="e.g Web development professional with 3 years of experience" />
              </div>
            </div>
          </div>
        )
      case "experience":
        return (
          <div className="experience m-b-30 p-20">
            {this.props.user.resumes[this.props.selectedResume].experience.map((item, index) => (
              <div className="field is-grouped is-grouped-multiline columns m-b-50 p-15" key={index}>
                <button className="button is-danger" onClick={this.removeExperience.bind(this, index)}>&#10006;</button>
                <div className="field column is-12">
                  <label className="label">Title/Position</label>
                  <div className="control">
                    <input className="input" value={item.position} onChange={this.handleExperienceUpdate.bind(this, 'position', index)} type="text" placeholder="e.g. Developer" />
                  </div>
                </div>
                <div className="field column is-12">
                  <label className="label">Company Name</label>
                  <div className="control">
                    <input className="input" value={item.name} onChange={this.handleExperienceUpdate.bind(this, 'name', index)} type="text" placeholder="e.g. CompanyXYZ" />
                  </div>
                </div>
                <div className="field column is-12">
                  <label className="label">Location</label>
                  <div className="control">
                    <input className="input" value={item.location} onChange={this.handleExperienceUpdate.bind(this, 'location', index)} type="text" placeholder="e.g. New York, USA" />
                  </div>
                </div>
                <div className="field column is-6">
                  <label className="label">Start Date</label>
                  <div className="control">
                    <input className="input" value={item.start} onChange={this.handleExperienceUpdate.bind(this, 'start', index)} type="text" placeholder="e.g. Sept, 2016" />
                  </div>
                </div>
                <div className="field column is-6">
                  <label className="label">End Date</label>
                  <div className="control">
                    <input className="input" value={item.end} onChange={this.handleExperienceUpdate.bind(this, 'end', index)} type="text" placeholder="e.g. March, 2019" />
                  </div>
                </div>
                <div className="field column is-12">
                  <label className="label">Description</label>
                  <div className="control">
                    <textarea rows="5" className="textarea" value={item.description} onChange={this.handleExperienceUpdate.bind(this, 'description', index)} type="text" placeholder="e.g. Organize and host VIP events and am responsible for handling ‘exclusive’ clients -Handled stock intakes and helped to redesign the shop’s layout -Give one-to-one mentoring to a team of 8 shop assistants" />
                  </div>
                </div>
              </div>
            ))}
            <button type="button" className="button is-primary m-20" onClick={this.props.addExperience}>Add Experience</button>
          </div>
        );
      default: 
      return (<div>Loading...</div>)
      }
  }
  renderNav(activeForm) {
    const index = formList.indexOf(activeForm);
    let prev = false;
    let next = false;
    if(index > 0) {
      prev = formList[index - 1];
    }
    if(index < formList.length) {
      next = formList[index + 1];
    }
    return (
      <div className="display-flex">
        { prev ? <button type="button" className="nav-button navbar-start button is-info" onClick={this.props.switchForm.bind(null, prev)}>{ prev } &#8678;</button> : ''}
        { next ? <button type="button" className="nav-button navbar-end button is-info" onClick={this.props.switchForm.bind(null, next)}>{ next } &#8680;</button> : ''}
      </div>
    );
  }
  render() {
    return (
      <section id="form-section" className="no-print column is-4 p-l-50 p-r-50">
        <div className="title is-4 form-title">
          {this.props.activeForm}
        </div>
        {this.renderForm(this.props.activeForm)}
        {this.renderNav(this.props.activeForm)}        
      </section>
    )
  }
}