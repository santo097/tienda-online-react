import axios from "axios";
import React, {Component} from "react";
import {Link } from "react-router-dom";
import authHeader from '../../services/auth-header';
import authServices from '../../services/auth.services';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
const Reserva = props =>(
  <tr>
    <td>{props.reserva.libro}</td>
    <td>{props.reserva.cantidad}</td>
    <td><Link to={"/actualizarReserva/"+props.reserva.id}></Link></td>
  </tr>

)

export default class MostrarReservaUsuarios extends Component{
    constructor(props){
        super(props);

        this.state = {reserva:[]}

    }

    componentDidMount(){
        const usuario = authServices.getCurrentUser();
        const id_usuario = usuario.id;
        const url = 'https://tienda-libros.herokuapp.com/api/reservas/'+id_usuario;
        axios.get(url, {headers:authHeader()})
        .then(reserva =>{
          console.log(reserva.data);
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
                    <th scope="col">Titulo</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {this.Reserva()}
              </tbody>
            </table>
            <div><Link to="/crearReserva" className="btn btn-success"><FontAwesomeIcon icon={faPlus}/> Crear reserva</Link></div>
          </div>
        </div>

        )
    }
}