import React from "react";

export default function PreviewSection(props) {
  const contactList = ["email", "address", "phone"];
  const renderContactInfo = () => (
    contactList.map((item, index) => {
      return props[item] ? (
        <div className={"contact-info" + item} key={index}>
          <span className={"title is-6 is-capitalized label-" + item}>{item}</span>
          <span>{props[item]}</span>
        </div>
      ) : '';
    })
  )

  const renderSection = (type, template) => props[type] ? template : "";

  return (
    <section id="preview-section" className="column is-8">
      <div className="title">
        Preview
      </div>
      <div className="box">
        <div className="contact-section">
          <div className="name-block has-text-left">
            <div className="title is-2 name">{props.name}</div>
          </div>
          <div className="contact-info-wrapper">
            {renderContactInfo()}
          </div>
        </div>
        {
          renderSection("objective",
            (
              <div className="objective-section has-text-left">
                <h2 className="tag is-primary is-large title is-2">Objective</h2>
                <div className="field column is-8">
                  <p>{props.objective}</p>
                </div>
              </div>
            )
          )
        }
        <div className="experience-section has-text-left">
          <h2 className="tag is-primary is-large title is-2">Experience</h2>
          {props.experience.map((item, index) => (
            <div className="experience-wrapper is-flex" key={index}>
              <div className="field column is-4">
                <h3 className="title is-4 position">{item.position}</h3>
                <h4 className="title is-5  m-b-10">{item.name}</h4>
                <p>{item.location}</p>
                <p className="is-italic">{item.start} - {item.end}</p>
              </div>
              <div className="field column is-8">
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}