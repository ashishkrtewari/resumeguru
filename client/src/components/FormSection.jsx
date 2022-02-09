import React, { useState } from "react";
import ContactForm from "./ContactForm";
import ExperienceForm from "./ExperienceForm";
import FormNav from "./FormNav";

const FormSection = ({ resume, handleResumeUpdate }) => {
  const [activeForm, setActiveForm] = useState("contact");
  const handleInput = (type, event) => {
    const resumeCopy = { ...resume };
    resumeCopy[type] = event.target.value;
    handleResumeUpdate(resumeCopy);
  };

  const experienceType = {
    position: "",
    name: "",
    location: "",
    start: "",
    end: "",
    description: "",
  };

  const addExperience = () => {
    const resumeCopy = { ...resume };
    resumeCopy.experience = [...resumeCopy.experience, { ...experienceType }];
    handleResumeUpdate(resumeCopy);
  };

  const renderForm = (activeForm) => {
    switch (activeForm) {
      case "contact":
        return (
          <ContactForm
            resume={resume}
            handleInput={(type, event) => handleInput(type, event)}
          />
        );
      case "experience":
        return (
          <ExperienceForm
            resume={resume}
            handleResumeUpdate={(resumeCopy) => handleResumeUpdate(resumeCopy)}
          />
        );
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <section id="form-section" className="no-print column is-4 p-l-50 p-r-50">
      <div className="title is-4 form-title">{activeForm}</div>
      {
        <FormNav
          activeForm={activeForm}
          setActiveForm={(type) => setActiveForm(type)}
        />
      }
      <div className="save-section columns is-centered mb-4">
        {activeForm === "experience" ? (
          <button
            type="button"
            className="button is-primary m-20"
            onClick={addExperience}
          >
            Add Experience
          </button>
        ) : (
          ""
        )}
      </div>
      {renderForm(activeForm)}
    </section>
  );
};

export default FormSection;
