export class User {
  name = "";
  email = "";
  resumes = [
    {
      name: "",
      email: "",
      address: "",
      phone: "",
      about: "",
      experience: [],
    },
  ];
  constructor() {
    this.resumes = [
      {
        name: "Sample User",
        email: "sample@mail.com",
        address: "",
        phone: "",
        about: "",
        experience: [],
      },
    ];
  }
}
