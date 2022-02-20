import React, { useEffect, useState } from "react";
import { updateUserMutation } from "../queries";
import ContactPreview from "./ContactPreview";
import ExperiencePreview from "./ExperiencePreview";

export default function PreviewSection({
  client,
  user,
  resume,
  handleUserUpdate,
}) {
  const print = () => window.print();
  const [showPreview, setShowPreview] = useState(false);

  const save = async () => {
    const updatedUser = { ...user, resumes: [resume] };
    if (updatedUser.email) {
      await client.mutate({
        mutation: updateUserMutation,
        variables: { user: updatedUser },
      });
    }
    handleUserUpdate(updatedUser);
  };
  useEffect(() => {
    const formSection = document.getElementById("form-section");
    if (formSection) {
      if (showPreview) {
        formSection.classList.add("hide");
      } else {
        formSection.classList.remove("hide");
      }
    }
  }, [showPreview]);
  return (
    <React.Fragment>
      {showPreview ? (
        ""
      ) : (
        <div className="action-buttons is-flex is-flex-wrap-wrap is-flex-direction-column">
          <button className="button is-success" onClick={save}>
            Save
          </button>
          <button
            className="button is-dark"
            onClick={() => {
              setShowPreview(!showPreview);
              window.scrollTo({
                top: 0,
              });
            }}
          >
            Preview
          </button>
        </div>
      )}

      {showPreview ? <div className="overlay"></div> : ""}

      <section
        id="preview-section"
        className={`column is-12-mobile is-12-tablet is-8-desktop is-offset-2-desktop" ${
          showPreview ? "show" : ""
        }`}
      >
        <div className="title is-flex is-justify-content-space-between no-print p-r-50 p-l-50">
          Preview
          <div>
            <button className="button mr-4 is-link" onClick={print}>
              Print
            </button>
            <button
              type="button"
              className="button is-danger"
              onClick={() => {
                setShowPreview(!showPreview);
              }}
            >
              <span className="is-hidden-mobile m-r-10">Close Preview</span>
              <span>✖</span>
            </button>
          </div>
        </div>
        <div className="box">
          <div className="contact-section">
            <div className="name-block has-text-left">
              <div className="title is-2 name">{resume.name}</div>
              <p>{resume.about}</p>
            </div>
            <div className="contact-info-wrapper">
              <ContactPreview resume={resume} />
            </div>
          </div>
          <div className="experience-section has-text-left">
            <h2 className="is-large title is-3">Experience</h2>
            {resume.experience.map((experience, index) => (
              <ExperiencePreview
                experience={experience}
                index={index}
                key={index}
              />
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
