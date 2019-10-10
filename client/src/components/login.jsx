import React from "react";
import { errors } from "../lists";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
const getUserQuery = gql`
{
  users {
    name
    email
    password
  }
}`

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "ashishtewaripro@gmail.com",
      password: "",
      error: false,
      submitted: false
    }
  }
  isLoading = false;
  async handleFormSubmit(event) {
    event.preventDefault();
    this.isLoading = true;
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
    if (!error) {
      var data = this.props.data;
      var matchedUser = []
      if (data && data.users) {
        matchedUser = data.users.filter((item) => item.email === this.state.email && item.password === this.state.password);
      }
      if (
        matchedUser.length
      ) {
        error = false
        login = true;
        var user = await this.props.client
        .query({
          query: gql`
          query userByEmail($email: String){
            userByEmail(email: $email) {
              name
              email
              resumes {
                name
                email
                address
                phone
                objective
                experience {
                  position
                  name
                  location
                  start
                  end
                  description
                }
              }
            }
          }`,
          variables: {
            email: this.state.email
          }
        });
        console.log(user);
        this.props.handleStateUpdate('user', user.data.userByEmail)
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
              <label className={"label has-text-left"}>email</label>
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
            <button className={"button is-primary m-t-10 " + (this.isLoading ? 'is-loading' : '')} type="submit">Login</button>
          </form>
        </div>
      </div>
    )
  }
}

export default graphql(getUserQuery)(Login);