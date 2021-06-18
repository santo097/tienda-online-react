import axios from "axios";
import React, {Component} from "react";
import {Link } from "react-router-dom";
import authHeader from '../../services/auth-header';
import authServices from '../../services/auth.services';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Reserva = props =>(
  <tr>
    <td>{props.reserva.nombre_propietario}</td>
    <td>{props.reserva.numero_tarjeta}</td>
    <td>{props.reserva.fecha_vencimiento}</td>
    <td>{props.reserva.codigo_seguridad}</td>
  </tr>

)

export default class MostrarTarjetaUsuario extends Component{
    constructor(props){
        super(props);

        this.state = {reserva:[]}

    }

    componentDidMount(){
        const usuario = authServices.getCurrentUser();
        const id_usuario = usuario.id;
        const url = 'https://tienda-libros.herokuapp.com/api/tarjeta/'+id_usuario;
        axios.get(url, {headers:authHeader()})
        .then(reserva =>{
          this.setState({reserva:reserva.data});
        })
    }

    Reserva(){
      return this.state.reserva.map((actualReserva, i)=>{
        return <Reserva reserva={actualReserva} key={i} />
      })
    }

    render(){
        return(
        <div className="row">
          <div className="col-md-8">
            <table class="table table-dark">
              <thead>
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Numero tarjeta</th>
                    <th scope="col">Fecha de tarjeta</th>
                    <th scope="col">Codigo de seguridad</th>
                </tr>
              </thead>
              <tbody>
                {this.Reserva()}
              </tbody>
            </table>
            <div><Link to="/crearTarjeta" className="btn btn-success"><FontAwesomeIcon icon={faPlus}/> Agregar tarjeta</Link></div>
          </div>
        </div>

        )
    }
}