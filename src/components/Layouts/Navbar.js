import React, {Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import Fondo from '../../background.jpg';
import Background from '../../public/img/background.jpg'
import AuthService from '../../services/auth.services';
import '../../App.css'
import Logo from '../../public/img/libro_logo.png'
import Login from '../Login/Login';
import Register from '../Login/Register';
import Home from './Home';
import Profile from '../Login/Profile'
import BoardCliente from '../Clientes/BoardClientes';
import UpdateProfile from '../Login/UpdateProfile';
import CrearLibro from '../Libro/CrearLibro';
import ActualizarLibro from '../Libro/ActualizarLibro';
import ActualizarReserva from '../Reserva/ActualizarReserva';
import CrearReserva from '../Reserva/CrearReserva';
import MostrarReserva from "../Reserva/MostrarReserva";
import MostrarLibro from "../Libro/MostrarLibro";
import RecuperarContraseña from '../Login/RecuperarContraseña';
import MostrarLibroUser from '../Libro/mostrarLibroUser';
import Bienvenido from '../Login/welcome';
import MostrarReservaUsuarios from '../Reserva/MostrarReservaUsuarios';
import MostrarCompras from '../Compra/MostrarComprasUsuario';
import MostrarTarjeta from '../Tarjeta/MostrarTarjeta';
import MostrarTarjetaUsuario from '../Tarjeta/MostrarTarjetaUsuario';
import MostrarComprasUsuario from '../Compra/MostrarComprasUsuario';
import CrearCompra from '../Compra/CrearCompra';
import CrearNoticias from '../Noticias/CrearNoticias';
import CrearTarjeta from '../Tarjeta/CrearTarjeta';
import MostrarNoticias from '../Noticias/MostrarNoticias';
import MostrarNoticiasUsuario from '../Noticias/MostrarNoticiasUsuario';

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
            COMPRA DE LIBROS EN LINEA
          </Link>
          <div className="navbar-nav mr-auto">

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/mostrarLibro"} className="nav-link">
                  Libros
                </Link>
            </li>
            )}
            {showClienteBoard && (
              <li className="nav-item">
                <Link to={"/mostrarLibros"} className="nav-link">
                  Libros
                </Link>
            </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/mostrarReserva"} className="nav-link">
                  Reservas
                </Link>
            </li>
            )}
            {showClienteBoard && (
              <li className="nav-item">
                <Link to={"/mostrarCompras"} className="nav-link">
                  Compras
                </Link>
            </li>
            )}
            {showClienteBoard && (
              <li className="nav-item">
                <Link to={"/mostrarTarjetas"} className="nav-link">
                  Tarjetas
                </Link>
            </li>
            )}
            {showClienteBoard && (
              <li className="nav-item">
                <Link to={"/mostrarNoticias"} className="nav-link">
                  Noticias
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/mostrarNoticia"} className="nav-link">
                  Noticias
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
          <Route path="/bienvenido" component={Bienvenido} />
          <Route path="/cliente" component={BoardCliente} />
          <Route path="/actualizarCliente" component={UpdateProfile} />
          <Route path="/actualizarLibro/:id" component={ActualizarLibro} />
          <Route path="/crearLibro" component={CrearLibro} />
          <Route path="/crearReserva" component={CrearReserva} />
          <Route path="/actualizarReserva" component={ActualizarReserva} />
          <Route path="/mostrarReserva" component={MostrarReserva} />
          <Route path="/mostrarReservas" component={MostrarReservaUsuarios} />
          <Route path="/mostrarLibro" component={MostrarLibro} />
          <Route path="/mostrarLibros" component={MostrarLibroUser} />
          <Route path="/mostrarTarjeta" component={MostrarTarjeta} />
          <Route path="/mostrarTarjetas" component={MostrarTarjetaUsuario} />
          <Route path="/mostrarCompra" component={MostrarCompras} />
          <Route path="/mostrarCompras" component={MostrarComprasUsuario} />
          <Route path="/mostrarNoticia" component={MostrarNoticias} />
          <Route path="/mostrarNoticias" component={MostrarNoticiasUsuario} />
          <Route path="/crearCompra" component={CrearCompra} />
          <Route path="/crearNoticias" component={CrearNoticias} />
          <Route path="/crearTarjeta" component={CrearTarjeta} />
          <Route path="/recuperarContraseña" component={RecuperarContraseña} />
        </Switch>
      </div>
    </div>
    );
  }
}
const sectionStyle = {
  width: "100%",
  height: "600px",
  backgroundImage: `url(${Background})`,
};
