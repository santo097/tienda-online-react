import axios from "axios";
import React, {Component} from "react";

import authHeader from '../../services/auth-header';


const Reserva = props =>(
  <tr>
    <td>{props.reserva.libro}</td>
    <td>{props.reserva.cantidad}</td>
  </tr>

)

export default class MostrarCompras extends Component{
    constructor(props){
        super(props);

        this.state = {reserva:[]}

    }

    componentDidMount(){
        const url = 'https://tienda-libros.herokuapp.com/api/compra';
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