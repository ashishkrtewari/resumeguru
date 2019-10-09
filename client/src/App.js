import React from "react";
import "./styles/App.css";
import Header from "./components/Header";
import Login from "./components/login";
import SectionWrapper from "./components/SectionsWrapper";
import FormSection from "./components/FormSection";
import PreviewSection from "./components/PreviewSection";
import { Sections } from "./lists";
import "./styles/App.scss";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sections: Sections.map(section => ({ title: section, switch: false })),
      name: "Ashish Tewari",
      email: "ashishtewaripro@gmail.com",
      address: "MD 53 sector D L.D.A. colony Kanpur road Lucknow, Uttar Pradesh: 226012 India",
      phone: "9953075422",
      objective: "",
      experience: [this.experienceType],
      activeForm: "contact",
      user: {
        name: ""
      },
      mockData: {
        username: "ashish",
        password: "cap"
      }
    };
  }
  experienceType = {
    position: "Developer",
    name: "Wipro",
    location: "Pune",
    start: "Sept, 2019",
    end: "Sept 2020",
    description: "Lead offshore development team for a Backbone JS to Vue JS migration project for a major medical insurance services client in the USA.    My responsibilities :    Connect with the major stakeholders on the client side to gather requirements and have discussions to plan each sprint, ensuring timely delivery and high code quality.     Mentoring Junior developers and so code reviews.    Have technical discussions with the client-side technical team to create development strategies and suggest improvements."
  }
  handleStateUpdate(prop, payload) {
    this.setState({ [prop]: payload });
  }
  handleExperienceUpdate(type, index, payload) {
    const experience = this.state.experience.map((item, i) => {
      if (index === i) {
        item[type] = payload;
      }
      return item;
    });
    this.setState({ experience });
  }
  addExperience() {
    const experience = [...this.state.experience, {...this.experienceType}];
    this.setState({experience});
  }
  removeExperience(index) {
    const experience = [...this.state.experience].filter((item, i) => i !== index);
    this.setState({experience});
  }
  switchForm(activeForm) {
    this.setState({activeForm});
  }
  render() {
    if(!this.state.user.name) {
      return (
        <div className="App">
          <Header {...this.state}/>
          <Login {...this.state} handleStateUpdate={this.handleStateUpdate.bind(this)}/>
        </div>
      );
    }
    return (
      <div className="App">
        <Header {...this.state} handleStateUpdate={this.handleStateUpdate.bind(this)}/>
        <section className="columns">
          {false ? (
            <SectionWrapper sections={this.state.sections} />
          ) : (
            <FormSection
              {...this.state}
              addExperience={this.addExperience.bind(this)}
              handleExperienceUpdate={this.handleExperienceUpdate.bind(this)}
              handleStateUpdate={this.handleStateUpdate.bind(this)}
              removeExperience={this.removeExperience.bind(this)}
              switchForm={this.switchForm.bind(this)}
            />
          )}
          <PreviewSection {...this.state} />
        </section>
      </div>
    );
  }
}

export default App;
