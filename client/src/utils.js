import DOMPurify from "dompurify";
export const renderDescription = (description = "") => {
  return DOMPurify.sanitize(description.replace(/\n/g, "<br />"));
};
