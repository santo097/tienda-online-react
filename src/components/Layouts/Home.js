import React, { Component } from "react";

import UserService from "../../services/user.services";

import { Link } from "react-router-dom";
export default class Home extends Component {
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
            <h1 class="display-3">COMPRA DE LIBROS EN LINEA</h1>
            <p><Link class="btn btn-primary btn-lg" to={"/register"} role="button">Registrate</Link></p>
          </div>
        </div>
        </main>
    );
  }
}