import React, { useRef } from "react";
import { renderDescription } from "../utils";

export default function PreviewSection(props) {
  const contactList = ["email", "address", "phone"];
  const resumeRef = useRef();
  const print = () => window.print();
  const renderContactInfo = () =>
    contactList.map((item, index) => {
      return props[item] ? (
        <div className={"contact-info" + item} key={index}>
          <span className={"title is-6 is-capitalized label-" + item}>
            {item}
          </span>
          <span>{props[item]}</span>
        </div>
      ) : (
        ""
      );
    });

  return (
    <section id="preview-section" className="column is-8">
      <div className="title is-flex is-justify-content-space-between no-print">
        Preview
        <button className="button is-primary" onClick={print}>
          Print
        </button>
      </div>
      <div className="box" ref={resumeRef}>
        <div className="contact-section">
          <div className="name-block has-text-left">
            <div className="title is-2 name">{props.name}</div>
            <p>{props.about}</p>
          </div>
          <div className="contact-info-wrapper">{renderContactInfo()}</div>
        </div>
        <div className="experience-section has-text-left">
          <h2 className="tag is-primary is-large title is-2">Experience</h2>
          {props.experience.map((item, index) => (
            <div className="experience-wrapper" key={index}>
              <div className="field row">
                <div className="is-flex flex-wrap">
                  <h3 className="title is-5 mr-1">{item.name},</h3>
                  <p>
                    <strong>{item.position}</strong> - {item.location}
                  </p>
                </div>
                <p className="is-italic">
                  {item.start} - {item.end}
                </p>
              </div>
              <div className="field row">
                <p
                  dangerouslySetInnerHTML={{
                    __html: renderDescription(item.description),
                  }}
                ></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
