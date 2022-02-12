import React from "react";
import { useState } from "react";
import FormSection from "./FormSection";
import Loader from "./Loader";
import PreviewSection from "./PreviewSection";

const ResumeBuilder = (props) => {
  const [resume, setResume] = useState(() => {
    if (props.user.resumes?.length) {
      return props.user.resumes[0];
    }
    return null;
  });

  if (!props.user) {
    return <Loader />;
  }
  return (
    <React.Fragment>
      <section className="container is-fluid p-0">
        <FormSection
          {...props}
          resume={resume}
          handleResumeUpdate={(resume) => setResume(resume)}
        />
        <PreviewSection {...props} resume={resume} />
      </section>
    </React.Fragment>
  );
};

export default ResumeBuilder;
