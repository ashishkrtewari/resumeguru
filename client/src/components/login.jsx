import React from "react";
import { errors } from "../lists";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: false,
      submitted: false
    }
  }
  isLoading = false;
  handleFormSubmit(event) {
    event.preventDefault();
    this.isLoading = true;
    this.setState({submitted: true});
    let error = false;
    let login = true;
    if (!this.state.username) {
      error = true;
    } else {
      error = false;
    }
    if (!this.state.password) {
      error = true;
    } else {
      error = false;
    }
    if (!error) {
      if (
        this.state.username === this.props.mockData.username &&
        this.state.password === this.props.mockData.password
      ) {
        error = false
        login = true;        
        this.props.handleStateUpdate('user', {name: this.state.username});
      } else {
        error = true;
        login = false;
      }
    }
    this.setState({login});
    this.setState({error});
    this.isLoading = false;
  }
  renderErrorMsg(type) {
    return this.state.submitted && !this.state[type] ? (<p className="help is-danger">{errors[type + 'Error']}</p>): ""
  }

  render() {
    return (
      <div className="login-wrapper columns is-centered is-vcentered">
        <div className="login-container box column is-4">
          <h2 className="title is-3">Welcome</h2>
          <form onSubmit={(event) => this.handleFormSubmit(event)}>
            <div className="field">
              <label className={"label has-text-left"}>Username</label>
              <div className="control">
                <input className={"input " + (this.renderErrorMsg('username') ? 'is-danger' : '')} value={this.state.username} onChange={(event) => { this.setState({ username: event.target.value }) }} type="text" placeholder="e.g johndoe" />
              </div>
              {this.renderErrorMsg('username')}
            </div>
            <div className="field">
              <label className="label has-text-left">Password</label>
              <div className="control">
                <input className={"input " + (this.renderErrorMsg('password') ? 'is-danger' : '')} onChange={(event) => { this.setState({ password: event.target.value }) }} type="password" placeholder="e.g *****" />
              </div>
              {this.renderErrorMsg('password')}
            </div>
            {this.renderErrorMsg('login')}
            <button className={"button is-primary m-t-10 " + (this.isLoading ? 'is-loading' : '')} type="submit">Login</button>
          </form>
        </div>
      </div>
    )
  }
}