import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = "";

class Reserva{
    Guardar = (id_usuario,libro,cantidad) =>{
        return axios.post('http://localhost:3000/api/reserva/guardar',
        {
            id_usuario,
            libro,
            cantidad
        },{headers:authHeader()})
    }

    Mostrar = () =>{
        return axios.get('http://localhost:3000/api/reserva',{headers:authHeader()} )
    }

    BuscarPorId = (id) =>{
        return axios.get('http://localhost:3000/api/reserva/'+ id,{headers:authHeader()} )
    }
}

export default new Reserva();