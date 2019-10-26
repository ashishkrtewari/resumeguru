import React from "react";
import { errors } from "../lists";
import { userLoginMutation } from "../queries";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "ashishtewaripro@gmail.com",
      password: "",
      login: true,
      error: false,
      submitted: false,
      isLoading: false
    }
  }
  async handleFormSubmit(event) {
    event.preventDefault();
    this.setState({isLoading: true});
    this.setState({submitted: true});
    let error = false;
    let login = true;
    if (!this.state.email) {
      error = true;
    } else {
      error = false;
    }
    if (!this.state.password) {
      error = true;
    } else {
      error = false;
    }
    if(login && !error) {
      let response = await this.props.client.mutate({
        mutation: userLoginMutation,
        variables: { email: this.state.email, password: this.state.password }
      })
      let data = response.data.userLogin;
      if (data.user) {         
        let user = data.user;
        this.setState({login});
        this.setState({error});
        this.props.handleStateUpdate('user', user)
        localStorage.setItem("token", data.token);
       } else {
        this.setState({login: false});
        this.setState({error: true});
       }
    }
    this.setState({isLoading: false});
  }
  renderErrorMsg(type) {
    return this.state.submitted && !this.state[type] ? (<p className="help is-danger">{errors[type + 'Error']}</p>): ""
  }

  render() {
    return (
      <div className="login-wrapper columns is-centered is-vcentered">
      <div className="column is-2 login-desc-box">
          <h2> Welcome Resume Guru</h2>
          <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
      </div>
        <div className="login-container box column is-3">         
          <form onSubmit={(event) => this.handleFormSubmit(event)}>
            <div className="field">
              <label className={"label has-text-left"}>Email</label>
              <div className="control">
                <input className={"input " + (this.renderErrorMsg('email') ? 'is-danger' : '')} value={this.state.email} onChange={(event) => { this.setState({ email: event.target.value }) }} type="email" placeholder="e.g johndoe" />
              </div>
              {this.renderErrorMsg('email')}
            </div>
            <div className="field">
              <label className="label has-text-left">Password</label>
              <div className="control">
                <input className={"input " + (this.renderErrorMsg('password') ? 'is-danger' : '')} onChange={(event) => { this.setState({ password: event.target.value }) }} type="password" placeholder="e.g *****" />
              </div>
              {this.renderErrorMsg('password')}
            </div>
            {this.renderErrorMsg('login')}
            <button className={"button is-primary m-t-10 " + (this.state.isLoading ? 'is-loading' : '')} type="submit">Login</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login;