import React from "react";

export default ({ resume, handleInput }) => {
  return (
    <div className="contact field is-grouped is-grouped-multiline columns m-b-50 p-15">
      <div className="field column is-6 is-12-mobile">
        <label className="label">Name</label>
        <div className="control">
          <input
            className="input"
            value={resume.name}
            onChange={(event) => handleInput("name", event)}
            type="text"
            placeholder="e.g Alex Smith"
          />
        </div>
      </div>
      <div className="field column is-6 is-12-mobile">
        <label className="label">Email</label>
        <div className="control">
          <input
            className="input"
            value={resume.email}
            onChange={(event) => handleInput("email", event)}
            type="email"
            placeholder="e.g. alexsmith@gmail.com"
          />
        </div>
      </div>
      <div className="field column is-6 is-12-mobile">
        <label className="label">Address</label>
        <div className="control">
          <input
            className="input"
            value={resume.address}
            onChange={(event) => handleInput("address", event)}
            type="address"
            placeholder="e.g. Road, City, State, Country"
          />
        </div>
      </div>
      <div className="field column is-6 is-12-mobile">
        <label className="label">Phone</label>
        <div className="control">
          <input
            className="input"
            value={resume.phone}
            onChange={(event) => handleInput("phone", event)}
            type="phone"
            placeholder="e.g. 0000000000"
          />
        </div>
      </div>
      <div className="field column is-6 is-12-mobile">
        <label className="label">About</label>
        <div className="control">
          <textarea
            rows="5"
            className="textarea"
            value={resume.about}
            onChange={(event) => handleInput("about", event)}
            type="text"
            placeholder="e.g Web development professional with 3 years of experience"
          />
        </div>
      </div>
    </div>
  );
};
