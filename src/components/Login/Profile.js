import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import AuthService from "../../services/auth.services";
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'
export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/profile" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      
      <div className="container">
        {(this.state.userReady) ?
        <div className="row d-flex justify-content-center">
          <div className="col-md-10 mt-5 pt-5">
            <div className="row z-depth-3">
            
              <div className="col-sm-4 bg-info rounded-left">
                <div className="card-block text-center text-white">
                  <i className="fas fa-user-tie fa-7x mt-5"></i>
                  <h2 className="font-weight-bold mt-4">{currentUser.nombre_usuario}</h2>
                  <p>{currentUser.correo}</p>
                  <i className="far fa-edit fa-1x mb-4"></i>
                </div>
              </div>
              <div className="col-sm-8 bg-white rounded-right">
                <h3 className="mt-3 text-center">Informacion</h3>
                <hr className="bg-primary" />
                <div className="row">
                  <div className="col-sm-6">
                    <p className="font-weight-bold">Correo:</p>
                    <h6 className="text-muted">{currentUser.correo}</h6>
                  </div>
                  {/* <div className="col-sm-6">
                    <p className="font-weight-bold">Nombre de usuario</p>
                    <h6 className="text-muted">{currentUser.username}</h6>
                  </div> */}
                </div>
                <hr className="bg-primary" />
                <div><Link to="/actualizarCliente" className="btn btn-primary"><FontAwesomeIcon icon={faEdit}/> Actualizar perfil</Link></div>
              </div>
            </div>
          </div>
        </div>
      : null}
      </div>
    
    );
  }
}