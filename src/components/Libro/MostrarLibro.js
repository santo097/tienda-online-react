import axios from "axios";
import React, {Component} from "react";
import {Link } from "react-router-dom";
import AuthService from "../../services/auth.services";
import authHeader from '../../services/auth-header';

const Libro = props =>(
  <tr>
    <td>{props.libro.titulo}</td>
    <td>{props.libro.autor}</td>
    <td>{props.libro.año_publicacion}</td>
    <td>{props.libro.genero}</td>
    <td>{props.libro.num_paginas}</td>
    <td>{props.libro.editorial}</td>
    <td>{props.libro.issn}</td>
    <td>{props.libro.cantidad}</td>
    {/* <td><Link to="/actualizarLibro"></Link></td>
    <td><Link to="#"></Link></td> */}
  </tr>

)

export default class MostrarLibro extends Component{
    constructor(props){
        super(props);

        this.state = {libro:[]}

    }

    componentDidMount(){
        axios.get('http://localhost:3000/api/libro', {headers:authHeader()})
        .then(libro =>{
          this.setState({libro:libro.data});
        })
    }

    Libros(){
      return this.state.libro.map((actualLibro, i)=>{
        return <Libro libro={actualLibro} key={i} />
      })
    }

    render(){
        return(
          <div className="row">
                  <table class="table table-dark">

<thead>
<tr>
    <th scope="col">Titulo</th>
    <th scope="col">Autor</th>
    <th scope="col">Año publicacion</th>
    <th scope="col">Genero</th>
    <th scope="col">Num. paginas</th>
    <th scope="col">Editorial</th>
    <th scope="col">Issn</th>
    <th scope="col">Cantidad</th>
  </tr>
</thead>
<tbody>
{this.Libros()}
</tbody>
</table>
          </div>
        )
    }
}