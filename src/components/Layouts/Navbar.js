import React, {Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import Fondo from '../../background.jpg';
import AuthService from '../../services/auth.services';
import '../../App.css'
import Logo from '../../public/img/libro_logo.png'
import Login from '../Login/Login';
import Register from '../Login/Register';
import Home from './Home';
import Profile from '../Login/Profile'
import BoardAdmin from '../Admin/BoardAdmin';
import BoardCliente from '../Clientes/BoardClientes';
import UpdateProfile from '../Login/UpdateProfile';
import CrearLibro from '../Libro/CrearLibro';
import ActualizarLibro from '../Libro/ActualizarLibro';
import ActualizarReserva from '../Reserva/ActualizarReserva';
import CrearReserva from '../Reserva/CrearReserva';
import MostrarReserva from "../Reserva/MostrarReserva";
import MostrarLibro from "../Libro/MostrarLibro";

export default class Navbar extends Component {
    constructor(props){
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showClienteBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        }
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
          this.setState({
            currentUser: user,
            showClienteBoard: user.roles.includes("ROLE_CLIENTE"),
            showAdminBoard: user.roles.includes("ROLE_ADMIN"),
          });
        }
      }

      logOut() {
        AuthService.logout();
      }


  render() {
    const { currentUser, showClienteBoard, showAdminBoard } = this.state;

    return (

      <div  style={ sectionStyle } >

        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            COMPRA DE LIBROS ONLINE
          </Link>
          <div className="navbar-nav mr-auto">

            {currentUser && (
              <li className="nav-item">
                <Link to={"/mostrarLibro"} className="nav-link">
                  Libros
                </Link>
            </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/mostrarReserva"} className="nav-link">
                  Reservas
                </Link>
            </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  Usuario
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Cerrar sesion
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Iniciar sesion
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Registrarse
                </Link>
              </li>
            </div>
          )}
        </nav>
        
        
        <div className="container mt-3">
        <Switch >
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/admin" component={BoardAdmin} />
          <Route path="/cliente" component={BoardCliente} />
          <Route path="/actualizarCliente" component={UpdateProfile} />
          <Route path="/actualizarLibro/:id" component={ActualizarLibro} />
          <Route path="/crearLibro" component={CrearLibro} />
          <Route path="/crearReserva" component={CrearReserva} />
          <Route path="/actualizarReserva" component={ActualizarReserva} />
          <Route path="/mostrarReserva" component={MostrarReserva} />
          <Route path="/mostrarLibro" component={MostrarLibro} />
        </Switch>
      </div>
    </div>
    );
  }
}
const sectionStyle = {
  width: "100%",
  height: "600px",
  backgroundImage: `url(${Fondo})`,
};

const logoStyle = {backgroundImage:`url(${Logo})`}
