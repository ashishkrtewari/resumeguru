import DOMPurify from "dompurify";
export const renderDescription = (description = "") => {
  return DOMPurify.sanitize(description.replace(/\n/g, "<br />"));
};

export const validateEmail = (value) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailRegex.test(value.toLowerCase());
};
