import React from "react";
import "./styles/App.scss";
import Header from "./components/Header";
import Login from "./components/login";
import FormSection from "./components/FormSection";
import PreviewSection from "./components/PreviewSection";
import { Sections } from "./lists";
import { updateUserMutation } from "./queries";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sections: Sections.map(section => ({ title: section, switch: false })),
      activeForm: "contact",
      user: null,
      selectedResume: 0,
      saving: false
    };
  }
  experienceType = {
    position: "",
    name: "",
    location: "",
    start: "",
    end: "",
    description: ""
  };
  handleStateUpdate(prop, payload) {
    this.setState({ [prop]: payload });
  }
  handleExperienceUpdate(type, index, payload) {
    let user = {...this.state.user};
    user.resumes[this.state.selectedResume].experience = [...this.state.user.resumes[
      this.state.selectedResume
    ].experience].map((item, i) => {
      if (index === i) {
        item[type] = payload;
      }
      return item;
    });
    this.setState({ user });
  }
  addExperience() {
    let user = {...this.state.user};
    user.resumes[this.state.selectedResume].experience = [
      ...this.state.user.resumes[this.state.selectedResume].experience,
      { ...this.experienceType }
    ];
    this.setState({ user });
  }
  async save() {
    let user = {...this.state.user};
    this.setState({saving: true});
    user = (await this.props.client.mutate({
      mutation: updateUserMutation,
      variables: { user }
    }))['data']['updateUser'];
    this.setState({saving: false});
    this.setState({ user });
  }
  removeExperience(index) {
    let user = {...this.state.user};
    user.resumes[this.state.selectedResume].experience = [
      ...this.state.user.resumes[this.state.selectedResume].experience
    ].filter((item, i) => i !== index);
    this.setState({ user });
  }
  switchForm(activeForm) {
    this.setState({ activeForm });
  }
  render() {
    if (!this.state.user) {
      return (
        <div className="App">
          <Header {...this.state} />
          <Login
            {...this.props}
            handleStateUpdate={this.handleStateUpdate.bind(this)}
          />
        </div>
      );
    }
    return (
      <div className="App">
        <Header
          {...this.state}
          handleStateUpdate={this.handleStateUpdate.bind(this)}
        />
        <section className="columns">
          <FormSection
            {...this.state}
            addExperience={this.addExperience.bind(this)}
            handleExperienceUpdate={this.handleExperienceUpdate.bind(this)}
            handleStateUpdate={this.handleStateUpdate.bind(this)}
            removeExperience={this.removeExperience.bind(this)}
            switchForm={this.switchForm.bind(this)}
            save={this.save.bind(this)}
          />
          <PreviewSection {...this.state.user.resumes[this.state.selectedResume]} />
        </section>
      </div>
    );
  }
}

export default App;
