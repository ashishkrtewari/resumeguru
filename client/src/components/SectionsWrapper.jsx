import React from "react";
import SectionSelector from "./SectionSelector";

export default class SectionsWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.sections = this.props.sections;
  }

  render() {
    const mappedSections = this.props.sections.map((section, index) => <SectionSelector key={index} title={section.title} switch={section.switch}/>);
    return (
      <section className="column is-4">
        <div className="title">
          Sections
        </div>
        { mappedSections }
      </section>
    )
  }
}