import React from "react";
import { renderDescription } from "../utils";

export default ({ experience, index }) => {
  return (
    <div className="experience-wrapper" key={index}>
      <div className="field row">
        <div className="is-flex flex-wrap">
          <h3 className="title is-5 mr-1">{experience.name},</h3>
          <p>
            <strong>{experience.position}</strong> - {experience.location}
          </p>
        </div>
        <p className="is-italic">
          {experience.start} - {experience.end}
        </p>
      </div>
      <div className="field row">
        <p
          dangerouslySetInnerHTML={{
            __html: renderDescription(experience.description),
          }}
        ></p>
      </div>
    </div>
  );
};
