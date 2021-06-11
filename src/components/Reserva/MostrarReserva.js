import axios from "axios";
import React, {Component} from "react";
import {Link } from "react-router-dom";
import AuthService from "../../services/auth.services";
import authHeader from '../../services/auth-header';

const Reserva = props =>(
  <tr>
    <td>{props.reserva.libro}</td>
    <td>{props.reserva.cantidad}</td>
    {/* <td><Link to="/actualizarLibro"></Link></td>
    <td><Link to="#"></Link></td> */}
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