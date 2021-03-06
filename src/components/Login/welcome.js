import React, { Component } from "react";

import UserService from "../../services/user.services";
export default class Bienvenido extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data.message
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <main role="main">
        <div class="jumbotron">
          <div class="container">
            <h1 class="display-3">Bienvenido</h1>
          </div>
        </div>
        </main>
    );
  }
}