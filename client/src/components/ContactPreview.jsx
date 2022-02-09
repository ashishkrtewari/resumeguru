import React from "react";

export default ({ resume }) => {
  const contactList = ["email", "address", "phone"];
  return contactList.map((contactType, index) => {
    return resume[contactType] ? (
      <div className={"contact-info" + contactType} key={index}>
        <span className={"title is-6 is-capitalized label-" + contactType}>
          {contactType}
        </span>
        <span>{resume[contactType]}</span>
      </div>
    ) : (
      ""
    );
  });
};
