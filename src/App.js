import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import './App.css'
import AuthService from "./services/auth.services";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Home from "./components/Layouts/Home";
import Profile from "./components/Login/Profile";
import BoardAdmin from "./components/Admin/BoardAdmin";
import BoardCliente from "./components/Clientes/BoardClientes";
import UpdateProfile from './components/Login/UpdateProfile';
import CrearLibro from './components/Libro/CrearLibro';
import ActualizarLibro from './components/Libro/ActualizarLibro';
import ActualizarReserva from './components/Reserva/ActualizarReserva';
import CrearReserva from './components/Reserva/CrearReserva';
import MostrarReserva from "./components/Reserva/MostrarReserva";
import MostrarLibro from "./components/Libro/MostrarLibro";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showClienteBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
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
      <div>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous"></link>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            COMPRA DE LIBROS ONLINE
          </Link>
          <div className="navbar-nav mr-auto">
            {showClienteBoard && (
              <li className="nav-item">
                <Link to={"/cliente"} className="nav-link">
                  Clientes
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/actualizarCliente"} className="nav-link">
                  Actualizar 
                </Link>
              </li>
            )}

            {/* <li className="nav-item">
                <Link to={"/actualizarLibro"} className="nav-link">
                  Actualizar Libro
                </Link>
            </li> */}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/mostrarLibro"} className="nav-link">
                  Mostrar libro
                </Link>
            </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/mostrarReserva"} className="nav-link">
                  Mostrar reserva
                </Link>
            </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/crearReserva"} className="nav-link">
                  Crear reserva
                </Link>
            </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/crearLibro"} className="nav-link">
                  Crear libro
                </Link>
            </li>
            )}


{/* 
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )} */}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  User
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
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/admin" component={BoardAdmin} />
          <Route path="/cliente" component={BoardCliente} />
          <Route path="/actualizarCliente" component={UpdateProfile} />
          <Route path="/actualizarLibro" component={ActualizarLibro} />
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

export default App;
