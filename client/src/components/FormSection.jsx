import React from "react";
import ContactForm from "./ContactForm";
import ExperienceForm from "./ExperienceForm";

const FormSection = ({ resume, handleResumeUpdate }) => {
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

  return (
    <section
      id="form-section"
      className="no-print column is-12-mobile is-8-desktop is-offset-2-desktop p-l-50 p-r-50"
    >
      <h1 className="title is-3 form-title m-b-50">Complete Your Details</h1>
      <ContactForm
        resume={resume}
        handleInput={(type, event) => handleInput(type, event)}
      />
      <ExperienceForm
        resume={resume}
        handleResumeUpdate={(resumeCopy) => handleResumeUpdate(resumeCopy)}
      />
      <button
        type="button"
        className="button is-primary m-20 mt-0"
        onClick={addExperience}
      >
        <span className="is-size-3 mr-2">&#x2b;</span>
        Add Experience
      </button>
    </section>
  );
};

export default FormSection;
