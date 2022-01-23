export const Sections = [
  "Experience",
  "Education",
  "Skills",
  "Languages",
  "Projects",
  "Achievements",
  "Certificates & Courses",
  "Honours & Awards",
  "Publications",
  "References",
  "Custom",
];
export const errors = {
  loginError: "Email or Password is Incorrect",
  isValidEmailError: "Please enter a valid Email",
  passwordError: "Please enter a Password",
};

export const formList = ["contact", "experience"];

export const UserInput = {
  name: "",
  email: "",
  resumes: [
    {
      name: "",
      email: "",
      address: "",
      phone: "",
      about: "",
      experience: [
        {
          position: "",
          name: "",
          location: "",
          start: "",
          end: "",
          description: "",
        },
      ],
    },
  ],
};
