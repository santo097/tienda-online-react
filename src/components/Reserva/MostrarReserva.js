import axios from "axios";
import React, {Component} from "react";
import {Link } from "react-router-dom";
import authHeader from '../../services/auth-header';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
const Reserva = props =>(
  <tr>
    <td>{props.reserva.libro}</td>
    <td>{props.reserva.cantidad}</td>
    <td><Link to={"/actualizarReserva/"+props.reserva.id}></Link></td>
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