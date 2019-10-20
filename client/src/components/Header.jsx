import React from "react";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.title = this.props.title;
  }
  handleLoginLogout() {
    if (this.props.user) {
      this.props.handleStateUpdate("user", '');
      localStorage.clear();
    }
  }

  render() {
    return (
      <header className="no-print">
        <nav className="navbar p-l-20 p-r-20 p-t-10 p-b-10" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <div className="navbar-item">
              <h1 className="title"><span>Resume</span>{this.title || " Guru"}</h1>
            </div>

            <div role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </div>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item">
                  Dashboard
              </div>
              <div className="navbar-item">
                Resumes
              </div>
              <div className="navbar-item">
                <div className="buttons">
                  <div className="button is-primary">
                    <strong>Sign up</strong>
                  </div>
                  <div className="button is-light" onClick={this.handleLoginLogout.bind(this)}>
                    {this.props.user ? "Log out" : "Log in"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}