import React from "react";

export default ({ resume, handleResumeUpdate }) => {
  const handleExperienceUpdate = (type, index, event) => {
    const value = event.target.value;
    const resumeCopy = { ...resume };
    resumeCopy.experience = [...resume.experience].map((item, i) => {
      if (index === i) {
        item[type] = value;
      }
      return item;
    });
    handleResumeUpdate(resumeCopy);
  };

  const removeExperience = (index) => {
    const resumeCopy = { ...resume };
    resumeCopy.experience = [...resumeCopy.experience].filter(
      (item, i) => i !== index
    );
    handleResumeUpdate(resumeCopy);
  };

  return (
    <div className="experience m-b-30 p-20">
      {resume.experience.map((item, index) => (
        <div
          className="field is-grouped is-grouped-multiline columns m-b-50 p-15"
          key={index}
        >
          <button
            className="button is-danger"
            onClick={() => removeExperience(index)}
          >
            &#10006;
          </button>
          <div className="field column is-12">
            <label className="label">Company Name</label>
            <div className="control">
              <input
                className="input"
                value={item.name}
                onChange={(event) =>
                  handleExperienceUpdate("name", index, event)
                }
                type="text"
                placeholder="e.g. CompanyXYZ"
              />
            </div>
          </div>
          <div className="field column is-12">
            <label className="label">Location</label>
            <div className="control">
              <input
                className="input"
                value={item.location}
                onChange={(event) =>
                  handleExperienceUpdate("location", index, event)
                }
                type="text"
                placeholder="e.g. New York, USA"
              />
            </div>
          </div>
          <div className="field column is-12">
            <label className="label">Title/Position</label>
            <div className="control">
              <input
                className="input"
                value={item.position}
                onChange={(event) =>
                  handleExperienceUpdate("position", index, event)
                }
                type="text"
                placeholder="e.g. Developer"
              />
            </div>
          </div>
          <div className="field column is-6">
            <label className="label">Start Date</label>
            <div className="control">
              <input
                className="input"
                value={item.start}
                onChange={(event) =>
                  handleExperienceUpdate("start", index, event)
                }
                type="text"
                placeholder="e.g. Sept, 2016"
              />
            </div>
          </div>
          <div className="field column is-6">
            <label className="label">End Date</label>
            <div className="control">
              <input
                className="input"
                value={item.end}
                onChange={(event) =>
                  handleExperienceUpdate("end", index, event)
                }
                type="text"
                placeholder="e.g. March, 2019"
              />
            </div>
          </div>
          <div className="field column is-12">
            <label className="label">Description (Supports HTML)</label>
            <div className="control">
              <textarea
                rows="5"
                className="textarea"
                value={item.description}
                onChange={(event) =>
                  handleExperienceUpdate("description", index, event)
                }
                type="text"
                placeholder="e.g. Organize and host VIP events and am responsible for handling ‘exclusive’ clients -Handled stock intakes and helped to redesign the shop’s layout -Give one-to-one mentoring to a team of 8 shop assistants"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
