import axios from "axios";
import React, {Component} from "react";
import {Link } from "react-router-dom";
import authHeader from '../../services/auth-header';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Reservar from '../../services/reserva.services';
const Reserva = props =>(
  <tr>
    <td>{props.reserva.libro}</td>
    <td>{props.reserva.cantidad}</td>
    <td><Link className="btn btn-danger"  href="/mostrarReserva" onClick={() =>{Reservar.Eliminar(props.reserva.id) }}><FontAwesomeIcon icon={faTrashAlt}/></Link></td>
  </tr>

)

export default class MostrarLibro extends Component{
    constructor(props){
        super(props);

        this.state = {reserva:[]}

    }

    componentDidMount(){
        axios.get('https://tienda-libros.herokuapp.com/api/reserva', {headers:authHeader()})
        .then(reserva =>{
          this.setState({reserva:reserva.data});
        })
    }

    Eliminar(){
      Reservar.Eliminar(this.props.reserva.id);
      this.props.history.push("/mostrarReserva");
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
          </div>
        </div>

        )
    }
}