import React from "react";
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

  const save = async () => {
    const updatedUser = { ...user, resumes: [resume] };

    await client.mutate({
      mutation: updateUserMutation,
      variables: { user: updatedUser },
    });
    handleUserUpdate(updatedUser);
  };

  return (
    <section id="preview-section" className="column is-8">
      <div className="title is-flex is-justify-content-space-between no-print">
        Preview
        <div>
          <button
            type="button"
            className={"button mr-4 is-success"}
            onClick={save}
          >
            Save
          </button>
          <button className="button is-info" onClick={print}>
            Print
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
  );
}
